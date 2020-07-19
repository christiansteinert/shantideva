rm -rf app/shantideva-phonegap/www/*
cp -rv src/web/* app/shantideva-phonegap/www/
rm -rf app/shantideva-phonegap/www/lib/jquery-ui-1.12.1.custom/debug
rm app/shantideva-phonegap/www/css/*.ttf
rm app/shantideva-phonegap/www/css/*.woff2
rm app/shantideva-phonegap/www/favicon*.png

#cp src/phonegap-plugin/DailyVersesPlugin/www/*.js app/shantideva-phonegap/platforms/ios/platform_www/plugins/de.christiansteinert.dailyversesplugin/www/
#cp src/phonegap-plugin/DailyVersesPlugin/www/*.js app/shantideva-phonegap/platforms/ios/www/plugins/de.christiansteinert.dailyversesplugin/www/
#cp src/phonegap-plugin/DailyVersesPlugin/www/*.js app/shantideva-phonegap/platforms/ios/build/emulator/Shantideva.app/www/plugins/de.christiansteinert.dailyversesplugin/www/
#cp src/phonegap-plugin/DailyVersesPlugin/www/*.js app/shantideva-phonegap/plugins/de.christiansteinert.dailyversesplugin/www/

cd app/shantideva-phonegap

cordova plugin remove de.christiansteinert.dailyversesplugin
cordova plugin add ../../src/phonegap-plugin/DailyVersesPlugin

cordova build ios --release

#cp platforms/android/app/build/outputs/apk/release/*-unsigned.apk ../../ShantidevaVerses.apk
#cd ../..

#mv ShantidevaVerses-aligned.apk ShantidevaVerses.apk

#APP_VERSION=`cat app/shantideva-phonegap/config.xml |grep '<widget' | sed  's#.*version="\([^"]*\)".*#\1#'`
#cp ShantidevaVerses.apk "android_releases/New versions (Android 4.4 and higher)/ShantidevaVerses_${APP_VERSION}.apk"

