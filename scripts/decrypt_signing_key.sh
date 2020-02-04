#!/bin/bash

set -x

# Decrypt the actual keystore used for signing release APKs
gcloud kms decrypt --plaintext-file=./android/app/transitr-release-key.keystore --ciphertext-file=./android/app/transitr-release-key.keystore.encrypted --location=us-east1 --keyring=transitr-key-ring --key=transitr-keystore-key

# Decrypt the properties file with the keystore location and passwords
gcloud kms decrypt --plaintext-file=./android/keystore.properties --ciphertext-file=./android/keystore.properties.encrypted --location=us-east1 --keyring=transitr-key-ring --key=transitr-keystore-key
