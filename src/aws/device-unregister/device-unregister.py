import boto3
import json
import os

from datetime import datetime 

# name of the dynabodb table where subscriptions for push notifications are stored
DBTABLE_PUSH_SUBSCRIPTIONS = os.environ.get('DYNAMODB_PUSH_SUBSCRIPTIONS_TABLE','shantideva.PushSubscriptions-prd')


def unregister(event, context):
    event_body = json.loads(event['body'])
    device_token = event_body['devicetoken']

    print(f"deregistering device with push token {device_token}")

    key = {'push_platform':{'S': 'apns'}, 'push_devicetoken':{'S':event_body['devicetoken']}}
    dynamodb = boto3.client('dynamodb')
    db_item = dynamodb.get_item(TableName=DBTABLE_PUSH_SUBSCRIPTIONS, Key=key)

    dynamodb.update_item(
        TableName=DBTABLE_PUSH_SUBSCRIPTIONS,
        Key=key,
        UpdateExpression="set is_disabled=:a, disable_reason=:b, disable_timestamp=:c",
        ExpressionAttributeValues={
            ':a': {'N': '1'},
            ':b': {'S': 'DisabledByUser'},
            ':c': {'S': datetime.utcnow().isoformat()}
        },
        ReturnValues="NONE"
    )

    return {
        'statusCode': 200,
        'body': json.dumps("done")
    }



# For tests outside of AWS
if __name__ == "__main__":
    unregister_event = {
        'devicetoken': '100000000000000000000000000000000000000000000000000000000000000A'
    }
    unregister({'body':json.dumps(unregister_event)}, [])



