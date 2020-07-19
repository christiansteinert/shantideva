cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "phonegap-plugin-push.PushNotification",
      "file": "plugins/phonegap-plugin-push/www/push.js",
      "pluginId": "phonegap-plugin-push",
      "clobbers": [
        "PushNotification"
      ]
    },
    {
      "id": "de.christiansteinert.dailyversesplugin.DailyVersesPlugin",
      "file": "plugins/de.christiansteinert.dailyversesplugin/www/DailyVersesPlugin.js",
      "pluginId": "de.christiansteinert.dailyversesplugin",
      "clobbers": [
        "cordova.plugins.DailyVersesPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.1",
    "phonegap-plugin-push": "2.3.0",
    "de.christiansteinert.dailyversesplugin": "0.0.1"
  };
});