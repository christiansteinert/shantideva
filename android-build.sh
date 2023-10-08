export ANDROID_HOME=~/Android/Sdk 
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME/platform-tools:$PATH 
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH
export PATH=$ANDROID_HOME/cmdline-tools/build-tools/33.0.2:$PATH

export ANDROID_TOOLS_VERSION=`ls -1 $ANDROID_HOME/build-tools/ |tail -n 1 `
export ANDROID_TOOLS_PATH="$ANDROID_HOME/build-tools/$ANDROID_TOOLS_VERSION"
export JAVA_TOOL_OPTIONS="-Xmx2048m -XX:ReservedCodeCacheSize=1024m"


rm -rf app/shantideva-phonegap/www/*
cp -rv src/web/* app/shantideva-phonegap/www/
cp src/icon/App-Icons/ic_icon.xml app/shantideva-phonegap/platforms/android/app/src/main/res/drawable/ic_shantideva_splashscreen.xml

rm -rf app/shantideva-phonegap/www/lib/jquery-ui-1.12.1.custom/debug
rm app/shantideva-phonegap/www/css/*.ttf
rm app/shantideva-phonegap/www/css/*.woff2
rm app/shantideva-phonegap/www/favicon*.png

cd app/shantideva-phonegap

cordova plugin remove de.christiansteinert.dailyversesplugin
cordova plugin add ../../src/phonegap-plugin/DailyVersesPlugin

echo ">> starting build"
cordova build android --release -- --packageType=apk

echo ">>>copying and signing apk"
cp platforms/android/app/build/outputs/apk/release/*-unsigned.apk ../../ShantidevaVerses.apk
cd ../..

#echo xxxxxxxx|jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore ./_internal/my-release-key.keystore *.apk  android_release_key
$ANDROID_TOOLS_PATH/zipalign -v 4 ShantidevaVerses.apk ShantidevaVerses-aligned.apk

echo $ANDROID_TOOLS_PATH/apksigner sign --verbose --ks "./_internal/my-release-key.keystore" --ks-key-alias android_release_key ShantidevaVerses-aligned.apk
echo xxxxxxxx|$ANDROID_TOOLS_PATH/apksigner sign --verbose --ks "./_internal/my-release-key.keystore" --ks-key-alias android_release_key ShantidevaVerses-aligned.apk

mv ShantidevaVerses-aligned.apk ShantidevaVerses.apk

APP_VERSION=`cat app/shantideva-phonegap/config.xml |grep '<widget' | sed  's#.* version="\([^"]*\)".*#\1#'`
cp ShantidevaVerses.apk "android_releases/New versions (Android 7.0 and higher)/ShantidevaVerses_${APP_VERSION}.apk"

