#!/bin/sh
#echo Ensure Mobile is connected
cordova build android
cp platforms/android/build/outputs/apk/android-debug.apk telia-iot-sensortag.apk
