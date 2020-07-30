# sudo gem install cocoapods

rm -rf app/shantideva-phonegap/www/*
cp -rv src/web/* app/shantideva-phonegap/www/
rm -rf app/shantideva-phonegap/www/lib/jquery-ui-1.12.1.custom/debug
rm app/shantideva-phonegap/www/css/*.ttf
rm app/shantideva-phonegap/www/css/*.woff2
rm app/shantideva-phonegap/www/favicon*.png


#cd app/shantideva-phonegap/platorms/ios
#pod init
## then edit Podfile and add dependencies
#pod install

cd app/shantideva-phonegap

cordova plugin remove de.christiansteinert.dailyversesplugin
cordova plugin add ../../src/phonegap-plugin/DailyVersesPlugin

cordova build ios --release

