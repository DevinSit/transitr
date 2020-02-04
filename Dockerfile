FROM openjdk:8-jdk

ENV ANDROID_COMPILE_SDK=28
ENV ANDROID_BUILD_TOOLS=28.0.3
ENV ANDROID_SDK_TOOLS=24.4.1

# Update deps and install some necessary tools.
RUN apt-get --quiet update --yes && \
    apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1 curl

# Install node.
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs

# Get the android sdk tools.
RUN wget --quiet --output-document=android-sdk.tgz https://dl.google.com/android/android-sdk_r${ANDROID_SDK_TOOLS}-linux.tgz && \
    tar --extract --gzip --file=android-sdk.tgz

# Install all of the android sdk pieces.
# For reference, the android related commands are based off of https://stackoverflow.com/questions/24942751/generating-android-build-with-gitlab-ci.
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter android-${ANDROID_COMPILE_SDK} && \
    echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter platform-tools && \
    echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter build-tools-${ANDROID_BUILD_TOOLS} && \
    echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-android-m2repository && \
    echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-google_play_services && \
    echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-m2repository

# Set relevant environment variables.
ENV ANDROID_HOME=$PWD/android-sdk-linux
ENV GRADLE_USER_HOME=$PWD/.gradle
ENV PATH=$PATH:$ANDROID_HOME/platform-tools

# Accept licenses.
RUN mkdir -p "${ANDROID_HOME}/licenses" && \ 
    echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55\nd56f5187479451eabf01fb78af6dfcb131a6481e" > "${ANDROID_HOME}/licenses/android-sdk-license" && \
    echo -e "\n84831b9409646a918e30573bab4c9c91346d8abd" > "${ANDROID_HOME}/licenses/android-sdk-preview-license" && \
    echo -e "\nd975f751698a77b662f1254ddbeed3901e976f5a" > "${ANDROID_HOME}/licenses/intel-android-extra-license"

# Copy over just the android folder to install gradle.
# Note that here, the '/app' folder is just a placeholder for storing the android config.
#
# When used with Cloud Build, the code repo will be mounted at '/workspace'.
# For reference, https://cloud.google.com/cloud-build/docs/create-custom-build-steps.
RUN mkdir -p /app/android
COPY ./android /app/android/

# Install gradle from the wrapper so that it doesn't have to be installed at run time.
WORKDIR /app/android
RUN chmod +x ./gradlew && \
    ./gradlew --version

# This is more or less arbitrary.
ENTRYPOINT ["bash"]
