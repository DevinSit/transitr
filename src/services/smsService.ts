import {NativeEventEmitter, NativeModules, PermissionsAndroid} from "react-native";
import {EventChannel} from "redux-saga";
import {Route} from "models/";

type RawArrivalTimes = Array<string>;

interface RawSmsEvent {
    message: string;
    route: string;
}

interface ParsedSmsEvent {
    route: string;
    times: RawArrivalTimes;
}

type Emitter = (input: ParsedSmsEvent) => void;

const extractArrivalTimes = (message: string): RawArrivalTimes => (
    message.split(" ").filter((hunk: string) => hunk.includes(":"))
);

export default class SmsService {
    static sendTextMessage(message: string): void {
        NativeModules.SmsService.sendTextMessage(message);
    }

    // I couldn't figure out how to type redux-saga's eventChannel functional _itself_, so... it get's 'any'.
    static registerReceiver(eventChannel: any): EventChannel<ParsedSmsEvent> {
        return eventChannel((emitter: Emitter) => {
            const nativeEventEmitter = new NativeEventEmitter(NativeModules.SmsService);

            // SMS_RECEIVED_EVENT fired from SmsService.java
            const subscription = nativeEventEmitter.addListener("SMS_RECEIVED_EVENT", (event: RawSmsEvent) => {
                const {message, route} = event;
                const times = extractArrivalTimes(message);

                emitter({route, times});
            });

            return () => {
                NativeEventEmitter.removeSubscription(subscription);
            };
        });
    }

    static async requestPermissions(): Promise<boolean> {
        const {GRANTED} = PermissionsAndroid.RESULTS;

        try {
            const sendGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: "Transitr Send SMS Permission",
                    message: "Transitr needs access to send SMS to fulfill its purpose.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            );

            const receiveGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                {
                    title: "Transitr Receive SMS Permission",
                    message: "Transitr needs access to receive SMS to fulfill its purpose.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            );

            return sendGranted === GRANTED && receiveGranted === GRANTED;
        } catch (err) {
            console.warn("Error while requesting permissions:");
            console.warn(err);

            return false;
        }
    }
}
