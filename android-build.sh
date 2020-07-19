export ANDROID_HOME=~/Android/Sdk 
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME/platform-tools:$PATH 
export PATH=$ANDROID_HOME/tools:$PATH


rm -rf app/shantideva-phonegap/www/*
cp -rv src/web/* app/shantideva-phonegap/www/
rm -rf app/shantideva-phonegap/www/lib/jquery-ui-1.12.1.custom/debug
rm app/shantideva-phonegap/www/css/*.ttf
rm app/shantideva-phonegap/www/css/*.woff2
rm app/shantideva-phonegap/www/favicon*.png

cd app/shantideva-phonegap

cordova plugin remove de.christiansteinert.dailyversesplugin
cordova plugin add ../../src/phonegap-plugin/DailyVersesPlugin

cordova build android --release

cp platforms/android/app/build/outputs/apk/release/*-unsigned.apk ../../ShantidevaVerses.apk
cd ../..

echo xxxxxxxx|jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore ./_internal/my-release-key.keystore *.apk  android_release_key
zipalign -v 4 ShantidevaVerses.apk ShantidevaVerses-aligned.apk
mv ShantidevaVerses-aligned.apk ShantidevaVerses.apk

APP_VERSION=`cat app/shantideva-phonegap/config.xml |grep '<widget' | sed  's#.*version="\([^"]*\)".*#\1#'`
cp ShantidevaVerses.apk "android_releases/New versions (Android 4.4 and higher)/ShantidevaVerses_${APP_VERSION}.apk"

