# Shantideva
This app contains the text *Engaging in Bodhisattva Behavior* (Bodhicharyavatara) by Shantideva. The app contains the full text by Shantideva in multiple languages and allows to browse through it chapter by chapter. It also selects a random verse from the text as "verse of the day".

The app is packaged into an installable app with Apache Cordova. Most of the logic is implemented in Javascript. The app can also be used as a single page web application that is simply served from a webserver without being packaged into a mobile app. The cordova version of the app, however, has one additional feature that the web application does not have: in the Android version of the app the user can choose to see the verse of the day as a notification message. This is accomplished with an additional Cordova plugin for Android that is implemented in Java.

## Project structure
The folder structure is as follows
* src/ This folder contains the main source code that is shared by all versions of the app. It also contains additional resources such as icons in editable formats. The main folder is src/web/ which contains all the html, javascript, and css resources that is used by all versions of the app. The folder src/phonegap-plugin/ also contains the Cordova plugin for the Android version of the app.
* app/ This folder contains the app projects for different platforms. app/shantideva-phonegap/ contains the Cordova project for the app. app/shantideva-web/ contains the web version of the app; This is almost identical to the contents of the src/web/ folder but there are a few additional files in the app/shantideva-web/ folder.
* android_releases/ This folder contains the APK files for Android releases of the app. 

## Build scripts
There are the following build scripts. 
These scripts are written for linux. The ndroid build process requires an installed Android SDK and an installation of Cordova. 
* _webapp-build.sh generates the content for the single-page web application. The output folder is app/shantideva-phonegap/
* _android_build.sh triggers the build process of the Android application
* _android_run.sh triggers the build process of the Android application and then runs the app in the Android emulator




