#!/bin/sh

project=$(gcloud config get-value project 2> /dev/null)

docker build -t gcr.io/${project}/transitr-build-container:latest .
