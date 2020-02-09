# Dank Meme Classifier

> An SMS-based OC Transpo app for finding out when the next bus is coming -- without cellular data!

![Screenshot](docs/images/Transitr.png?raw=true)

Transitr is a small **React Native** app that makes use of OC Transpo's [SMS service](https://www.octranspo.com/en/plan-your-trip/travel-tools/text-560560/) to find upcoming bus arrival times. 

It uses the SMS service instead of the normal data service that other apps use to enable those who don't have cellular data to still find bus arrival times -- albeit, in a cleaner interface than manually having to text the SMS service.

Currently, only Android APKs are available for download. You can find the latest released APK on the [releases page](https://github.com/DevinSit/transitr/releases).

## Table of Contents

TODO

## Why did I build Transitr?

When I first built Transitr, I had a very simple reason: since I'm too cheap to pay for cellular data, I have to use OC Transpo's SMS service for getting bus arrival times. And since I'm too lazy to keep manually texting the service, I might as well automate the process with an app.

Lo and behold, it was also a convenient excuse to pick up React Native. 

So a little learning and elbow grease later, I had a small app that did exactly what I wanted: I could add a new bus route using the code that would normally be sent through a text over SMS, and then I could click a button to have the arrival times updated (i.e. it would send the text to the SMS service and parse the results).

Clean, simple, effective. So effective, that I implemented basically only those two features and was happy enough with the app that I used it like that for several years -- only adding and refreshing. No deleting, no editing, no fancy bus GPS graphs, nada.

But when I decided I wanted to (_finally_) open source the app, I looked over the code, the outdated React Native version, and the general lack of essential features (really, it was just the lack of deletion that was annoying me), and I decided I might as well rewrite the thing (the daunting prospect of having to upgrade React Native some 15 versions might have helped push that decision).

Thankfully, a lot of the pure React code (i.e. the view layer) translated nicely. Converting class components to functional components, sprinkling in some TypeScript, adding the magic of Redux Saga -- I'd say it all turned out quite nice in the end. 

And that's what is currently available in this repo.

## Repo Structure

This being a React Native app, there are really two parts: the React code and the Native code. Since this app needs to make use of a device's SMS capabilities, there had to be some native code. 

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
└── keystore.properties.encrypted                   # The encrypted version of the key properties used to sign release builds (see the 'Build Pipeline' section for more details)
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

TODO

### Custom Docker Image

TODO

## Local Development

TODO

## FAQ

Here are some questions I'm sure you'll be asking.

### Why isn't there an iOS version?

Because I don't own any Apple products and didn't want to buy/rent one to build the iOS version. 

However, since the project _is_ open source, I'd be more than happy to have someone port the native code and build the iOS version!

### Why isn't the Android version on the Play Store?

Because I'm cheap and didn't want to bother setting up an account. 

Don't worry; you can totally trust that the APKs on the [release page](https://github.com/DevinSit/transitr/releases) are safe!

### Why doesn't the app do X?

Because along with being cheap, I'm also quite lazy. As such, I built just enough features to satisfy my own needs for a bus tracking app.

## Contributing

As much as this is an app that I actively use, I'm not really looking for other contributors. The app was built to satisfy my own needs, so if it happens to also satisfy yours, then feel free to use it, tweak it, etc. 

If you do happen to want to make contributions, open up an issue or a PR and I'd be happy to chat or look it over!

## Authors

- **Devin Sit**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
