cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
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
    "cordova-plugin-wkwebview-engine": "1.0.2",
    "phonegap-plugin-multidex": "1.0.0",
    "zestia-cordova-plugin-wkwebview-engine-windowopen": "1.0.1",
    "de.christiansteinert.dailyversesplugin": "0.0.1"
  };
});