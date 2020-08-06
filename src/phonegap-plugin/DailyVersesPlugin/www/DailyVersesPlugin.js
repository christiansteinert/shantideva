
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
        var cloudSettings = localStorage.getItem("cloudSettings")|| ''; // get last info that was already shared with the server        
        var appMessageEnabled = settings.messageEnabled;
        var appMessageTime = String(settings.messageHour) + ':' + String(settings.messageMinute) ;

        if( !cloudMessageEnabled && !settings.messageEnabled ) {
            // Push message is turned off and the cloud knows that.
            // We can abort here without having to request a push message token because we don't care whether the token or anything else has changed
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
            // -> the message enablement setting or the device token has changed. Notify the cloud about this
            var callSuccessful = false;
            var url;
            var payload;
            var payloadStr;
 
            if(settings.messageEnabled) {
                // messages are enabled. Subscribe this device to our service.                    
                url = 'https://skbmk395bj.execute-api.eu-central-1.amazonaws.com/v1/device/register';
                var timezoneOffset = (new Date).getTimezoneOffset();
                var notificationTimeGmt = settings.messageHour * 60 + settings.messageMinute + timezoneOffset;
                
                if ( notificationTimeGmt >= ( 24 * 60 )  )
                    notificationTimeGmt = notificationTimeGmt - ( 24 * 60 );
                
                if ( notificationTimeGmt < 0  )
                    notificationTimeGmt = notificationTimeGmt + ( 24 * 60 );
                

                payload = {
                    "devicetoken":data.registrationId,
                    "timezone_offset" : String(-timezoneOffset),
                    "notification_time" : String(notificationTimeGmt),
                    "language": settings.textLanguage,
                    "ui_language": settings.uiLanguage
                };
                payloadStr = JSON.stringify(payload);
                
                if( payloadStr === cloudSettings ) {
                    // -> the current push settings are already known to the cloud. We do not need to send a subscription / unsubsription request 
                    return;
                }
                            
                
            } else {
                // messages are disabled. Unsubscribe this device from our service
                url = 'https://skbmk395bj.execute-api.eu-central-1.amazonaws.com/v1/device/unregister';
                payload = {
                    "devicetoken": data.registrationId
                };
                payloadStr = JSON.stringify(payload);
            }

            // -> send a request to the device registration service
            $.ajax({
                method:'POST',
                url:url, 
                data: payloadStr,
                contentType: 'application/json',
                async: false
            }).done(function() {
                // Call was successful. Remember that this configuration is the one that was also sent to the cloud
                localStorage.setItem("cloudMessageEnabled", appMessageEnabled);
                localStorage.setItem("cloudSettings", payloadStr);
                if(success) {
                    success();
                }
            }).fail(function() {
                // Call failed. Let's re-try in 1 minute by calling the setAlarm function again in 1 minute
                window.setTimeout( function() { exports.setAlarm( settings, success, error ) }, 60000 );
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
        localStorage.getItem("cloudSettings", ''); // clear last synced cloud-settings to force re-registration of the device with the cloud
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
            messageHour: 10,
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
