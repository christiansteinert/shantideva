import boto3
import json
import os

from datetime import datetime 

# name of the dynabodb table where subscriptions for push notifications are stored
DYNAMODB_FAVORITE_VERSES_TABLE = os.environ.get('DYNAMODB_DYNAMODB_FAVORITE_VERSES_TABLE','shantideva.FavoriteVerses-prd')


def save_favorite_verses(event, context):
    event_body = json.loads(event['body'])
    json.loads(event_body['favorite_verses']) # make sure that the list of verses is valid JSON

    db_item = {
        'device_id':{'S': event_body['device_id']}, 
        'platform':{'S': event_body['platform']}, 
        'last_update_date':{'S': datetime.utcnow().isoformat()},
        'favorite_verses':{'S': event_body['favorite_verses']},
    }
    
    dynamodb = boto3.client('dynamodb')
    print(f"updating favorite verses for device {device_id}, platform {platform}")
    dynamodb.put_item(TableName=DYNAMODB_FAVORITE_VERSES_TABLE, Item=db_item )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps("done"),
    }




# For tests outside of AWS
if __name__ == "__main__":
    register_event = {
        'device_id': '95ca5d60-9397-4252-a2ba-1b99802f8b0a',
        'favorite_verses' : '{ "1":{"5":"1", "7":"1" }, "2":{}, "3":{}, "4":{}, "5":{}, "6":{}, "7":{}, "8":{}, "9":{}, "10":{} }',
    }
    save_favorite_verses({"body":json.dumps(register_event)}, [])

