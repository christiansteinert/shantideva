
var exec = cordova.require('cordova/exec');

if ( cordova.platformId == 'ios' ) {
    // Plugin code for iOS
    // On iOS we do not call into platform code; instead, the javascript file 
    // just serves as an abstraction that contains most of the platform-specific code
    
    exports.testNotification = function(success, error) {
        // do nothing 
        console.log('testNotification()');
    };  

    exports.setAlarm = function(settings, success, error) {
        console.log('setAlarm(): settings=', JSON.stringify(settings));

        // find out how we are already registered with the cloud-based push service
        var cloudMessageEnabled = localStorage.getItem("cloudMessageEnabled")||false; // get last message status that was already shared with the server
        var cloudSettings = localStorage.getItem("cloudSettings")|| ''; // get last info that was already shared with the server        
        var pushRegistrationId = localStorage.getItem("apnsId")|| ''; // get last known apns ID
        var appMessageEnabled = settings.messageEnabled;
        //var appMessageTime = String(settings.messageHour) + ':' + String(settings.messageMinute);
        var payload = {};
        var payloadStr = '';
        var url = '';

        if( !cloudMessageEnabled && !settings.messageEnabled ) {
            // Push message is turned off and the cloud knows that.
            // We can abort here without having to request a push message token because we don't care whether the token or anything else has changed
            return;
        }

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
                "devicetoken": pushRegistrationId,
                "timezone_offset": String(-timezoneOffset),
                "notification_time": String(notificationTimeGmt),
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
                "devicetoken": pushRegistrationId
            };
            payloadStr = JSON.stringify(payload);
        }

        if(pushRegistrationId){
            // do an immediate config update on the server with the last known push registration ID
            // this saves time in case the user closes the app right after.
            console.log('setAlarm(): sending preliminary config update.');
            $.ajax({
                method:'POST',
                url:url, 
                data: payloadStr,
                contentType: 'application/json',
                async: false
            });
            console.log('done.');
        }

        setTimeout(function() {
            // use the cordova-plugin-push plugin to activate the push functionality of ios and request a push token for this device
            var push = PushNotification.init({
                ios: {
                    alert: "true",
                    badge: "false",
                    sound: "false"
                }
            });

            // Then get the latest push registration ID in case it has changed and do another call 
            // asynchronously to the server just in case.
            push.on('registration', function(data) {

                // -> the message enablement setting or the device token has changed. Notify the cloud about this
                var callSuccessful = false;
                localStorage.setItem("apnsId", data.registrationId);
                payload.devicetoken = data.registrationId;
                payloadStr = JSON.stringify(payload);
                
                console.log(url);
                console.log(payloadStr);
                console.log('sending actual config update');

                // -> send a request to the device registration service
                $.ajax({
                    method:'POST',
                    url:url, 
                    data: payloadStr,
                    contentType: 'application/json',
                    async: true
                }).done(function() {
                    // Call was successful. Remember that this configuration is the one that was also sent to the cloud
                    localStorage.setItem("cloudMessageEnabled", appMessageEnabled);
                    localStorage.setItem("cloudSettings", payloadStr);
                    console.log('setAlarm(): success while calling APNS device registration service.');
                    if(success) {
                        success();
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    // Call failed. Let's re-try in 1 minute by calling the setAlarm function again in 1 minute
                    console.log('setAlarm(): error when calling APNS device registration service. Retrying in 1 minute.', textStatus, JSON.stringify(errorThrown));
                    window.setTimeout( function() { exports.setAlarm( settings, success, error ) }, 60000 );
                    if(error) {
                        error();
                    }
                });
            });
        }, 1000);
    };

    exports.testTimer = function(success, error) {
        // do nothing 
        console.log('testTimer()');

    };

    exports.saveSettings = function(settings, success, error) {
        console.log('saveSettings()', JSON.stringify(settings));
        localStorage.setItem("cloudSettings", ''); // clear last synced cloud-settings to force re-registration of the device with the cloud
        exports.setAlarm(settings, success, error); // register again with the server
    };

    exports.loadSettings = function(success, error) {
        // -> Return some default settings for iOS.
        defaultSettings = {};
        console.log('loadSettings(): returning empty cordova notification defaults', JSON.stringify(defaultSettings));
        success( defaultSettings );
    };

    exports.saveFavoriteVerses = function(favoriteVerses, success, error) {
        if(success) {
            success();
        }        
    }
    
    
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
        var successWrapper=function(callbackParams){success(callbackParams[0], callbackParams[1]);};
        exec(successWrapper, error, "DailyVersesPlugin", "loadConfig", []);
    };

    exports.saveFavoriteVerses = function(favoriteVerses, success, error) {
        exec(success, error, "DailyVersesPlugin", "saveFavoriteVerses", [favoriteVerses]);
    };

    exports.loadFavoriteVerses = function(success, error) {
        exec(success, error, "DailyVersesPlugin", "loadFavoriteVerses", []);
    };

}
