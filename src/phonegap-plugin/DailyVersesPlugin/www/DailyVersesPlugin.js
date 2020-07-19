var exec = require('cordova/exec');

exports.testNotification = function(success, error) {
    exec(success, error, "DailyVersesPlugin", "testNotification", []);
};

exports.setAlarm = function(success, error) {
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

