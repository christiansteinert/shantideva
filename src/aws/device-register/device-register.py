import boto3
import json
import os

from datetime import datetime 

# name of the dynabodb table where subscriptions for push notifications are stored
DBTABLE_PUSH_SUBSCRIPTIONS = os.environ.get('DYNAMODB_PUSH_SUBSCRIPTIONS_TABLE','shantideva.PushSubscriptions-prd')


def register(event, context):
    event_body = json.loads(event['body'])
    device_token = event_body['devicetoken']
    db_item = {
        'push_devicetoken':{'S': device_token},
        'push_platform':{'S': 'apns'}, 
        'subscribe_timestamp':{'S': datetime.utcnow().isoformat()},
        'is_disabled':{'N': '0'},
        'disable_reason':{'S': ''},
        'disable_timestamp':{'S': datetime(1, 1, 1).isoformat()},
        
        #number of minutes that the device is currently offset from GMT
        'timezone_offset':{'N': event_body['timezone_offset']}, 
        
        #day (based on GMT time) when the last push message was sent to this device, e.g. 2020-12-31
        'last_push_date':{'S': datetime(1, 1, 1).isoformat()},  
        
        #desired notification time expressed in minutes since midnight based on GMT time; the value is expected to always be positive
        'notification_time':{'N': event_body['notification_time']}, 
        
        #desired language for the verse of the day
        'language':{'S': event_body['language'].lower()}, 

        #UI language within the app (currently not used)
        'ui_language':{'S': event_body['ui_language'].lower()},
        
        # By default devices are not part of the APNS Sandbox environment.
        # If an individual device has a development version of the app installed directly 
        # through XCode then the respective setting must be changed manually in dynamoDB.
        'is_sandbox':{'N': '0'}
    }

    print(f"registering device with push token {device_token}")
    
    dynamodb = boto3.client('dynamodb')
    dynamodb.put_item(TableName=DBTABLE_PUSH_SUBSCRIPTIONS, Item=db_item )

    return {
        'statusCode': 200,
        'body': json.dumps("done")
    }



# For tests outside of AWS
if __name__ == "__main__":
    register_event = {
        'devicetoken': '100000000000000000000000000000000000000000000000000000000000000A',
        'timezone_offset' : '120',
        'notification_time' : '600',
        'language': 'de',
        'ui_language': 'zh-cn'
    }
    register({'body':json.dumps(register_event)}, [])

