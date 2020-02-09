# Dank Meme Classifier

> An SMS-based OC Transpo app for finding out when the next bus is coming -- without cellular data!

![Screenshot](docs/images/Transitr.png?raw=true)

Transitr is a small **React Native** app that makes use of OC Transpo's [SMS service](https://www.octranspo.com/en/plan-your-trip/travel-tools/text-560560/) to find upcoming bus arrival times. 

It uses the SMS service instead of the normal data service that other apps use to enable those who don't have cellular data to still find bus arrival times -- albeit, in a cleaner interface than manually having to text the SMS service.

Currently, only **Android APKs** are available for download. You can find the latest released APK on the [releases page](https://github.com/DevinSit/transitr/releases).

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Why did I build Transitr?](#why-did-i-build-transitr-)
* [Repo Structure](#repo-structure)
	+ [Top-Level Repo](#top-level-repo)
	+ [`android` Folder](#-android--folder)
	+ [`src` Folder](#-src--folder)
* [Tech Stack](#tech-stack)
* [Build Pipeline](#build-pipeline)
	+ [Custom Docker Image](#custom-docker-image)
* [Local Development](#local-development)
    + [Prerequisites](#prerequisites)
    + [Running the App](#running-the-app)
* [FAQ](#faq)
    + [Why isn't there an iOS version?](#why-isn-t-there-an-ios-version-)
    + [Why isn't the Android version on the Play Store?](#why-isn-t-the-android-version-on-the-play-store-)
    + [Why doesn't the app do X?](#why-doesn-t-the-app-do-x-)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Why did I build Transitr?

When I first built Transitr, I had a very simple reason: since I'm too cheap to pay for cellular data, I have to use OC Transpo's SMS service for getting bus arrival times. And since I'm too lazy to keep manually texting the service, I might as well automate the process with an app.

Lo and behold, it was also a convenient excuse to pick up **React Native**. And thus, Transitr was born.

I kept the feature set very minimal (just adding new bus routes and manually refreshing arrival times) since that's all that I really needed.

After a couple of years of using it (even after getting cellular data), when I finally decided I wanted to open source the app, I also decided to rewrite it in TypeScript with my updated knowledge of React and Redux.

And that is the version of the app found in this repo today.

## Repo Structure

This being a **React Native** app, there are really two parts: the React code and the Native code. Since this app needs to make use of a device's SMS capabilities, there had to be some native code. 

As such, the repo structure breakdown will be divided into three parts: the top-level repo, the `android` folder, and the `src` folder (I never touched the iOS folder, since I have no ability to build an iOS version of the app).

### Top-Level Repo

```
├── android/                        # Android native code
├── app.json                        # Generated 'react-native' CLI file
├── babel.config.js                 # Generated 'react-native' CLI file for Babel configuration
├── cloudbuild.master.yaml          # Cloud Build pipeline for the 'master' branch
├── cloudbuild.yaml                 # Cloud Build pipeline for every other branch
├── Dockerfile                      # Configuration for a custom Docker image for building release APKs (explained in 'Custom Docker Image' below)
├── docs/                           # Miscellaneous docs and images
├── index.js                        # Entrypoint to the React Native app
├── ios/                            # iOS native code
├── Makefile                        # Useful commands for local development
├── metro.config.js                 # Generated 'react-native' CLI file for the Metro bundler (what runs as part of `npm start` or `make start`)
├── package.json                    # NPM dependencies for the React half of the code
├── package-lock.json               # NPM dependencies lock file
├── scripts/                        # Useful scripts for local development/build pipeline
├── src/                            # React code
└── tsconfig.json                   # Generated 'react-native' CLI file for TypeScript configuration
```

### `android` Folder

This folder breakdown will only include the most relevant files and folders for things that have actually been modified.

```
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/transitr/
│   │       │   ├── SmsService.java                 # The Android (Java) native code that handles sending/receiving SMS text messages
│   │       │   └── SmsServicePackage.java          # Wrapper package around the SMS service as required by React Native to register the service
│   │       └── res/                                # Includes the app icon at all resolutions
│   └── transitr-release-key.keystore.encrypted     # The encrypted version of the key used to sign release builds (see the 'Build Pipeline' section for more details)
└── keystore.properties.encrypted                   # The encrypted version of the key properties (passwords) used to sign release builds (see the 'Build Pipeline' section for more details)
```

### `src` Folder

```
├── App.tsx                             # Main component for the app
├── components/                         # Some re-usable (not necessarily scene-related) components
├── models/                             # Models used for representing data
├── react-native-components.d.ts        # Custom typescript declaration file for my personal 'react-native-components' shared repo
├── scenes/                             # Large components that generally represent pages and compose many sub-components
├── services/                           # Business logic related services like for the SMS service
├── store/                              # Everything related to Redux
└── styles/                             # Global shared styles
```

## Tech Stack

- **Languages**: TypeScript (for React half) and Java (for native Android half)
- **Framework**: React Native
- **Global State Management**: Redux
- **Side Effect Management**: Redux Saga
- **Data Persistence**: Redux Persist with Async Storage

## Build Pipeline

There's two pipelines here; one for the `master` branch and one for the every other branch.

Since I'm a **GCP** guy, making use of their **Cloud Build** service for the build pipeline only makes sense. As such, the configuration for the `master` pipeline can be found in the `cloudbuild.master.yaml` file and the 'every other' branch pipeline can be found in `cloudbuild.yaml`.

The reason for the separate pipelines is because I only wanted release APKs to be built on `master`. As such, both pipelines perform the usual linting and TypeScript checking, but only the `master` pipeline handles building release APKs and storing in a **Cloud Storage** bucket.

Since the key used to sign the release builds is stored in the repo as a set of encrypted files (`transitr-release-key.keystore.encrypted` and `keystore.properties.encrypted`), the `master` pipeline also has to handle decrypting them. Thankfully, this is simple to do since they are encrypted using just a GCP **KMS** key.

### Custom Docker Image

In order to handle building the release APKs in the `master` pipeline, I needed to create a portable environment that had all the necessary dependencies pre-installed (Android SDK, Node, etc).

Of course, since **Cloud Build** is being used, a custom **Docker** image seemed to make the most sense. The image is built from the `Dockerfile` at the root of the repo, using the repo as build context -- it can be built using the `make generate-build-container` command.

The main reason it needs to be built with the repo is because the image needs to install and cache the version of `gradle` used by the `gradle wrapper` in the `android` folder. Otherwise, it would have to install `gradle` on every built, which is no bueno.

Once the image is built, it can then be used as a custom build step in **Cloud Build** by hosting it in the GCP project's private image repository.

## Local Development

Although I created a **Docker** image that should have everything needed to also develop, it is currently only used for the build pipeline.

As such, local development still requires having the Android SDK installed, Node installed... the usual things needed for **React Native** development for Android.

### Prerequisites

You'll need everything installed that is normal for local **React Native** development.

The **React Native** docs has a good [Getting Started guide](https://facebook.github.io/react-native/docs/getting-started) for this.

### Running the App

First, you'll need make sure all of the NPM dependencies have been installed locally: 

```
npm install
```

Then, you should be able to start the **React Native** bundler (this is what dynamically serves the JavaScript assets to the app's runtime):

```
make start-bundler
```

From here, you have the choice of either running the app on a real device or on an Android emulator (AVD). If you have a real device, just hook it up to your computer and enable debug mode. 

Personally, I develop with an emulator, so I have a `make` command to start it (`make start-emulator`), but that's unlikely to work for you since it's hard-coded to my SDK's install path and AVD name. You can start your emulator however you usually do, which is probably through Android Studio.

Finally, we can run the app:

```
make run-android
```

## Trello Board

If you look at any of the commit messages, you'll probably notice the `TSR-XX` prefixes to all the messages. These are IDs for tickets that I handle in a [Trello board](https://trello.com/b/VqwmXCNp/transitr) separate from the GitHub repo.

I prefer using **Trello** for my projects since it's one place where I can put everything, regardless of where I host the code (I used to use Bitbucket, for example).

## FAQ

Here are some questions I'm sure you're asking.

### Why isn't there an iOS version?

Because I do not own any Apple products nor want to buy/rent any to be able build the iOS version. 

However, since the project _is_ open source, I'd be more than happy to have someone port the native code and build the iOS version!

### Why isn't the Android version on the Play Store?

Because I am cheap and did not want to bother setting up an account. 

But don't worry; you can totally trust that the APKs on the [release page](https://github.com/DevinSit/transitr/releases) are safe!

### Why doesn't the app do X?

Because along with being cheap, I'm _also_ quite lazy. As such, I built just enough features to satisfy my own needs for a bus tracking app.

## Contributing

As much as this is an app that I actively use, I'm not really looking for other contributors. The app was built to satisfy my own needs, so if it happens to also satisfy yours, then feel free to use it, tweak it, whatever you want!

If you do happen to want to make contributions, open up an issue or a PR and I'd be happy to chat or look it over!

## Authors

- **Devin Sit**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
