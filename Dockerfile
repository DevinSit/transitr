FROM openjdk:8-jdk

ENV ANDROID_COMPILE_SDK=28
ENV ANDROID_BUILD_TOOLS=28.0.3
ENV ANDROID_SDK_TOOLS=24.4.1

# Update deps and install some necessary tools
RUN apt-get --quiet update --yes
RUN apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1

# Get the android sdk tools
RUN wget --quiet --output-document=android-sdk.tgz https://dl.google.com/android/android-sdk_r${ANDROID_SDK_TOOLS}-linux.tgz
RUN tar --extract --gzip --file=android-sdk.tgz

# Install all of the android sdk pieces
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter android-${ANDROID_COMPILE_SDK}
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter platform-tools
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter build-tools-${ANDROID_BUILD_TOOLS}
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-android-m2repository
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-google_play_services
RUN echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-m2repository

# Install node
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs

# Set relevant environment variables
ENV ANDROID_HOME=$PWD/android-sdk-linux
ENV GRADLE_USER_HOME=$PWD/.gradle
ENV PATH=$PATH:$ANDROID_HOME/platform-tools

# Accept licenses?
RUN mkdir -p "${ANDROID_HOME}/licenses"
RUN echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55\nd56f5187479451eabf01fb78af6dfcb131a6481e" > "${ANDROID_HOME}/licenses/android-sdk-license"
RUN echo -e "\n84831b9409646a918e30573bab4c9c91346d8abd" > "${ANDROID_HOME}/licenses/android-sdk-preview-license"
RUN echo -e "\nd975f751698a77b662f1254ddbeed3901e976f5a" > "${ANDROID_HOME}/licenses/intel-android-extra-license"

# Copy over just the android folder to install gradle
RUN mkdir -p /app/android
COPY ./android /app/android/

# Install gradle from the wrapper
WORKDIR /app/android
RUN chmod +x ./gradlew
RUN ./gradlew --version

ENTRYPOINT ["bash"]
