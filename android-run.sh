./android-build.sh

export ANDROID_HOME=~/Android/Sdk 
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME/platform-tools:$PATH 
export PATH=$ANDROID_HOME/tools:$PATH


cd app/shantideva-phonegap

cordova run android --debug
