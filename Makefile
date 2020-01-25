.PHONY: start-bundler start-emulator run-android

start-bundler:
	npm start

start-emulator:
	~/adt-bundle-linux-x86_64/sdk/tools/emulator -netdelay none -netspeed full -avd Pixel_2_API_25_2

run-android:
	npm run android
