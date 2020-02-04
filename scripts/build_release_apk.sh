#!/bin/sh

set -x

cd android
chmod +x ./gradlew
./gradlew assembleRelease
cd ..
