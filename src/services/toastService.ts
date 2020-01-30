import {ToastAndroid} from "react-native";

export default class ToastService {
    static show(message: string): void {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}
