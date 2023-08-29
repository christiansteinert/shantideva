./android-build.sh

export ANDROID_HOME=~/Android/Sdk 
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME/platform-tools:$PATH 
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH
export PATH=$ANDROID_HOME/cmdline-tools/build-tools/33.0.2:$PATH

cd app/shantideva-phonegap

cordova run android --debug
