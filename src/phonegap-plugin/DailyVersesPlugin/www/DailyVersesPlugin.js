
var exec = cordova.require('cordova/exec');

if ( cordova.platformId == 'ios' ) {
    // Plugin code for iOS
    // On iOS we do not call into platform code; instead, the javascript file 
    // just serves as an abstraction that contains most of the platform-specific code
    
    exports.testNotification = function(success, error) {
        // do nothing 
    };

    exports.setAlarm = function(settings, success, error) {
        // find out how we are already registered with the cloud-based push service
        var cloudMessageEnabled = localStorage.getItem("cloudMessageEnabled")||false; // get last message status that was already shared with the server
        var cloudDevicePushToken = localStorage.getItem("cloudDevicePushToken")|| ''; // get last push notification token for this device was already shared with the server        
        var cloudMessageTime = localStorage.getItem("cloudDeviceMessageTime")|| ''; // get last push notification token for this device was already shared with the server        
        var appMessageEnabled = settings.messageEnabled;
        var appMessageTime = String(settings.messageHour) + ':' + String(settings.messageMinute) ;

        if( !cloudMessageEnabled && !settings.messageEnabled ) {
            // Push message is turned off and the cloud knows that.
            // We can abort here without having to request a push message token because we don't care whether the token has changed
            return;
        }
        
        // use the phonegup-plugin-push plugin to activate the push functionality of ios and request a push token for this device
        var push = PushNotification.init({
            ios: {
                alert: "true",
                badge: "false",
                sound: "false"
            }
        });

        push.on('registration', function(data) {
            if( cloudMessageEnabled === appMessageEnabled
                && cloudMessageTime === appMessageTime
                && cloudDevicePushToken === data.registrationId 
                ) {
                // -> the current push settings are already known to the cloud. We do not need to send a subscrption / unsubsription request
                return;
            }
            
            
            // -> the message enablement setting or the device token has changed. Notify the cloud about this
            var callSuccessful = false;
            var url;
            var payload;

            if(settings.messageEnabled) {
                // messages are enabled. Subscribe this device to our service.                    
                url = 'https://c66rsfu5b1.execute-api.eu-central-1.amazonaws.com/prd/v1/device/register';
                var timezoneOffset = - (new Date).getTimezoneOffset();
                var notificationTimeGmt = settings.messageHour * 60 + settings.messageMinute + timezoneOffset;

                payload = {
                    "devicetoken":data.registrationId,
                    "timezone_offset" : String(timezoneOffset),
                    "notification_time" : String(notificationTimeGmt),
                    "language": language,
                    "ui_language": ui_language
                };
                
            } else {
                // messages are disabled. Unsubscribe this device from our service
                url = 'https://c66rsfu5b1.execute-api.eu-central-1.amazonaws.com/prd/v1/device/unregister';
                payload = {
                    "devicetoken": data.registrationId
                };
            }

            // -> send a request to the device registration service
            $.ajax({
                method:'POST',
                url:url, 
                data: JSON.stringify(payload),
                contentType: 'application/json',
                async: false
            }).done(function() {
                // Call was successful. Remember that this configuration is the one that was also sent to the cloud
                localStorage.setItem("cloudMessageEnabled", appMessageEnabled);
                localStorage.setItem("cloudDevicePushToken", data.registrationId);
                localStorage.setItem("cloudDeviceMessageTime", appMessageTime);
                if(success) {
                    success();
                }
            }).fail(function() {
                // Call failed. Let's re-try in 5 minutes by calling the setAlarm function again in 5 minutes
                window.setTimeout( function() { exports.setAlarm( settings, success, error ) }, 300000 );
                if(error) {
                    error();
                }
            });
        });
    };

    exports.testTimer = function(success, error) {
        // do nothing 
    };

    exports.saveSettings = function(settings, success, error) {
        localStorage.getItem("cloudDevicePushToken", ''); // clear locally saved push token to force re-registration of the device with the cloud
        exports.setAlarm(settings); // register again with the server
        if(success) {
            success();
        }
    };

    exports.loadSettings = function(success, error) {
        // Javascript-side settings are empty, otherwise this plugin would not have been called to read settings 
        // in a platform specific way.
        // -> Return some default settings for iOS.
        defaultSettings = {
            messageEnabled: 10,
            messageMinute: 0,
            messageEnabled: false                
        };
        success( defaultSettings );
    };
    
    
} else { //android
    // Plugin code for android. All calls are forwarded to the Java-based plugin implementation
    exports.testNotification = function(success, error) {
        exec(success, error, "DailyVersesPlugin", "testNotification", []);
    };

    exports.setAlarm = function(settings, success, error) {
        exec(success, error, "DailyVersesPlugin", "setAlarm", []);
    };

    exports.testTimer = function(success, error) {
        exec(success, error, "DailyVersesPlugin", "testTimer", []);
    };

    exports.saveSettings = function(settings, success, error) {
        exec(success, error, "DailyVersesPlugin", "saveConfig", [settings]);
    };

    exports.loadSettings = function(success, error) {
        exec(success, error, "DailyVersesPlugin", "loadConfig", []);
    };

}
