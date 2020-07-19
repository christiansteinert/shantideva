#!/bin/sh
cd send-messages
rm -rf lib
mkdir lib
cd lib

PYTHONPATH=.


#easy_install-2.7 -d . apns2
#rm *
#rm -rf */EGG-INFO
#rm -rf */.*
#rm -rf */*.so

#mv */* .
#rmdir *.egg
#rm -rf *-info
#rm -rf __pycache__

pip3 install apns2 -t .
rm -rf *-info
rm *
rm -rf .*
rm -rf bin
rm -rf __pycache__
rm -rf */__pycache__
