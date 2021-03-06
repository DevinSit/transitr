.PHONY: start-bundler start-emulator run-android

start-bundler:
	npm start

start-emulator:
	~/adt-bundle-linux-x86_64/sdk/tools/emulator -netdelay none -netspeed full -avd Pixel_2_API_25_2

run-android:
	npm run android

decrypt-release-key:
	bash ./scripts/decrypt_signing_key.sh

build-release-apk:
	bash ./scripts/build_release_apk.sh

generate-build-container:
	bash ./scripts/generate_build_container.sh

push-build-container:
	bash ./scripts/push_build_container.sh
