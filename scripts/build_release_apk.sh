#!/bin/sh

set -x

cd android
chmod +x ./gradlew
./gradlew --no-daemon assembleRelease
cd ..
