import boto3
import json
import os
import sys
import re
import collections
import math

from datetime import datetime 
from datetime import timedelta


# name of the dynabodb table where subscriptions for push notifications are stored
FUNCTION_ROOT = os.environ.get('LAMBDA_TASK_ROOT','.') + '/send-messages'
DBTABLE_PUSH_SUBSCRIPTIONS = os.environ.get('DYNAMODB_PUSH_SUBSCRIPTIONS_TABLE','shantideva.PushSubscriptions-prd')
APNS_CERT_FOLDER = FUNCTION_ROOT + '/_internal'
TEXT_FILES_FOLDER = FUNCTION_ROOT + '/content'

# use pyapns2 library for sending apple push messages. 
#  See: https://github.com/Pr0Ger/PyAPNs2
#  Installatiom: easy_install apns2

# add the folder to the search path if it is not there yet
LIB_FOLDER=FUNCTION_ROOT + '/lib'
sys.path.append(LIB_FOLDER)

try:
    sys.path.index(LIB_FOLDER)
except ValueError:
    sys.path.append(LIB_FOLDER) 

# import apns2 library
from apns2.client import APNsClient
from apns2.payload import Payload



parsed_languages={}

def read_pending_notifications(is_sandbox_environment):
    now = datetime.utcnow()
    minutes_since_midnight = now.hour * 60 + now.minute + 1
    today = now.replace(hour=0, minute=0, second=0, microsecond=0) # start of current day
    
    # get all push subscriptions for which we need to send a notification now.
    # These are all subcriptions for which the following conditions are met:
    # - notifications are enabled for the respective device
    # - today no notification was sent yet to the respective device
    # - the time of day when we should send the notification has been reached for the respective device
    dynamodb = boto3.client('dynamodb')
    paginator = dynamodb.get_paginator('scan')

    if is_sandbox_environment:
        sandbox = 1
    else:
        sandbox = 0
    
    operation_parameters = {
        'TableName': DBTABLE_PUSH_SUBSCRIPTIONS,
        'FilterExpression': 'is_disabled = :a AND last_push_date < :b AND notification_time <= :c AND push_platform = :d AND is_sandbox = :e',
        'IndexName': 'pendingNotifications', 
        'ExpressionAttributeValues': {
            ':a': {'N': '0'},
            ':b': {'S': today.isoformat()},
            ':c': {'N': str(minutes_since_midnight)},
            ':d': {'S': 'apns'},
            ':e': {'N': str(sandbox)}
        }
    }

    # Iterate over the results while doing pagination (dynamodb does not return more than 1MB at once)
    # While doing the iteration we put the results into a dictionary for which items are grouped 
    # by language and the current day.
    # For each of these groups we need to send a separate notification message because
    # - for each language we need to send the verse of the day in the correct language
    # - the date right now is different in different time zones and therefore the "current day" 
    #   in relation to which the verse of the day is determined can also differs for different users
    #   by +/- 1 day compared to the current UTC date
    result={}
    iterator = paginator.paginate(**operation_parameters)
    for page in iterator:
        for item in page['Items']:            
            user_time = now + timedelta(minutes=int(item['timezone_offset']['N'])) # find out date and time in the user's time zone
            user_day_of_month = user_time.day
            user_lang = item['language']['S']
            
            if not (user_day_of_month,user_lang) in result:
                result[(user_day_of_month,user_lang)] = [item]
            else:
                result[(user_day_of_month,user_lang)].append(item) 
                
    return result

def is_dummy_verse(verse_text):
    if verse_text.find('[[') >= 0 or len(verse_text) < 15:
        return True
    else:
        return False

def get_random_int_with_seed(seed, max_value):
    random_number = float('0.' + str(math.sin(seed))[7:])
    return int((max_value+1)*random_number)

def read_all_verses(lang):
    if lang in parsed_languages:
        return parsed_languages[lang] # This language was already parsed. Just return it
    
    chapters=[]
    curr_chapter=0
    file_name = f'{TEXT_FILES_FOLDER}/text_{lang}.txt'
    
    curr_verse = ''
    with open(file_name) as f:
        for line in f:    
            line = line.strip()
            line = line.replace('•','\u200b') # replace hyphenation point for Sanskrit with zero-width space to allow for line breaking
            line = line.replace('་','་\u200b') #  after Tibetan tseg insert zero-width space to allow for line breaking
            
            if line.find('***') == 0: # lines that start with *** contain a chapter title and start the next chapter
                # chapterName = line.replace('***','')
                
                if len(chapters) > 0:
                    curr_chapter += 1
                
                chapters.append([])
                
            elif line == '':  # empty lines are used to separate verses from each other
                if len(curr_verse) > 0:
                    chapters[curr_chapter].append( curr_verse )
                    curr_verse = ''
                    
            else: # this is a normal line which must be part of a verse. Append it to the current verse
                if curr_verse == '':
                    curr_verse = line
                else:
                    curr_verse = curr_verse + '\n' + line
                    
        if curr_verse != '': # add the last verse at the end of the file to the chapter as well
            chapters[curr_chapter].append( curr_verse )
            
    parsed_languages[lang] = chapters
    return chapters

def adjust_verse_text(chapter_num, verse_num_in_chapter, verse_text):
    # remove old verse number which is contained in brackets at the beginning of the first line
    verse_text = re.sub('^\([0-9]+\) *(.*)', '\\1', verse_text)

    # remove old verse number for Arabic:
    verse_text = re.sub('^\([١٢٣٤٥٦٧٨٩٠]+\) *(.*)', '\\1', verse_text)

    # remove old verse number for Tibetan:
    verse_text = re.sub('^[༡༢༣༤༥༦༧༨༩༠]+༽ *(.*)', '\\1', verse_text)
    
    # remove old verse number for Devanagari:
    verse_text = re.sub('^\([१२३४५६७८९०]+\) *(.*)', '\\1', verse_text)

    #add a chapter and verse number at the end of the last line
    verse_text += f' [{chapter_num}.{verse_num_in_chapter}]'

    return verse_text


def do_get_verse_of_the_day(day, lang):
    chapters = read_all_verses(lang)

    # count the number of verses
    total_verse_count=0
    for chapter in chapters:
        total_verse_count += len(chapter)
    
    # determine the verse of the day
    rand_seed_for_the_day = day.year*400 + (day.month-1)*31 + day.day
    verse_of_the_day = get_random_int_with_seed(rand_seed_for_the_day, total_verse_count - 1)
    

    # find the verse inside the text and return the text for that verse 
    chapter_num=0
    verse_count=0
    for chapter in chapters:
        chapter_num += 1
        
        if verse_of_the_day < verse_count + len(chapter): # is the desired verse contained in the current chapter?
            verse_num_in_chapter = verse_of_the_day - verse_count + 1
            return adjust_verse_text(chapter_num, verse_num_in_chapter, chapter[verse_num_in_chapter - 1])
        
        verse_count += len(chapter)
        
    return ''

def get_verse_of_the_day(user_day, lang):
    day = user_day
    
    while True:
        verse_content = do_get_verse_of_the_day(day, lang)
        
        if is_dummy_verse(verse_content):
            # This verse does not exist in the  given language. Jump back one year to see if we have a reasonable verse there.
            day = now.replace(year = now.year - 1)
        
        else:
            # We found a verse that exists. Return it.
            return verse_content
    

# To send identical apple push notifications to a batch of recipients
def send_apns_message(text, subscriptions, is_sandbox_environment):
    topic = 'de.christiansteinert.shantidevaverses'
    payload = Payload(alert=text)

    # prepare the list of recipients 
    notifications = []
    Notification = collections.namedtuple('Notification', ['token', 'payload'])
    for item in subscriptions:
        notifications.append(Notification(payload=payload, token=item['push_devicetoken']['S']))

    # send the push messages
    message_expiration = int(datetime.utcnow().timestamp()) + (24 * 60 *60) # message is valid 24 for hours

    apns_client = APNsClient(credentials = f'{APNS_CERT_FOLDER}/private_key_plus_cert.pem', 
                             use_sandbox = is_sandbox_environment, 
                             use_alternative_port=False)
    return apns_client.send_notification_batch(notifications=notifications, 
                                               topic=topic, 
                                               expiration = message_expiration, 
                                               collapse_id = 'VerseOfTheDay' )


# Flatten a dynamodb object from stuff like 
#   { 'foo': { 'S': 'val1' }, 'bar': { 'N': '5' } }
# to
#   { 'foo': 'val1', 'bar': 5 } 
# This is needed for batch_writer which somehow cannot handle the more explicitly typed value format
def flatten_dynamodb_object(obj):
    result = {}
    for field_name in obj:
        for datatype_name in obj[field_name]:
            if datatype_name == 'N': # convert numbers to int
                result[field_name] = int( obj[field_name][datatype_name] )
            else:
                result[field_name] = obj[field_name][datatype_name]
    
    return result
                                

# send the verse of the day to set of subscribed users in the same language and with the same date in their time zone
def send_notfication_to_lang_group(subscriptions, is_sandbox_environment):
    now = datetime.utcnow()
    now_str = now.isoformat()
    
    # get the verse of the day which is the same for all users
    user_day = now + timedelta(minutes=int(subscriptions[0]['timezone_offset']['N'])) # find out date and time in the user's time zone
    user_lang = subscriptions[0]['language']['S'] # get the desired language
    verse_of_the_day = get_verse_of_the_day(user_day, user_lang)

    # send this  verse to all users
    results = send_apns_message(verse_of_the_day, subscriptions, is_sandbox_environment)

    # update the status for each recipient in dynamodb. Do this in a batched way so that we avoid needless DB roundtrips
    dynamodb = boto3.resource('dynamodb')
    with dynamodb.Table(DBTABLE_PUSH_SUBSCRIPTIONS).batch_writer() as dynamo_batch:
        
        for item in subscriptions:
            # get the APNS return code for sending this push recipient
            token = item['push_devicetoken']['S']
            result = results[token]
            
            # update subscription info 
            # - for successful send: write the date of the message
            # - for bad tokens: stop the subscription
            if result == 'Success':
                item['last_push_date'] = {'S': now_str }
                dynamo_batch.put_item( Item = flatten_dynamodb_object( item ) )
            elif result == 'BadDeviceToken':
                item['is_disabled'] = {'N': '1'}
                item['disable_reason'] = {'S': result}
                item['disable_timestamp'] = {'S': now_str}                
                dynamo_batch.put_item( Item = flatten_dynamodb_object( item ) )


# Send all messages either within APNS sandbbox or within regular notification environment
def send_msgs_within_environment(is_sandbox_environment):
    
    # find out which groups devices should be notified now
    notification_groups = read_pending_notifications(is_sandbox_environment)
    
    print( f'Sending to { len(notification_groups) } recepient groups. Sandbox: {is_sandbox_environment}')
        
    # send a notification to each device group
    for subscription_id in notification_groups:
        subscriptions = notification_groups[subscription_id]
        send_notfication_to_lang_group(subscriptions, is_sandbox_environment)


# main lambda handler function
def send_msgs(event, context):
    # Send to sandbox
    send_msgs_within_environment( is_sandbox_environment = True )

    # Send regular stuff
    send_msgs_within_environment( is_sandbox_environment = False )

    return {
        'statusCode': 200,
        'body': json.dumps("done")
    }



# For tests outside of AWS
if __name__ == "__main__":
    print(get_verse_of_the_day( datetime.utcnow(), 'en')) 
    send_msgs({},{})
