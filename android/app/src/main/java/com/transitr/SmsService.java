package com.transitr;

import java.util.*;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SmsService extends ReactContextBaseJavaModule {
    private Context mContext;
    private ReactContext mReactContext;
    private Queue<String> messageQueue;

    public static final String OC_TRANSPO_NUMBER = "560560";
    public static final String SMS_SENT_FILTER = "SMS_SENT";
    public static final String SMS_RECEIVED_FILTER = "android.provider.Telephony.SMS_RECEIVED";

    public static final String SMS_RECEIVED_EVENT = "SMS_RECEIVED_EVENT";
    public static final String PARAMS_MESSAGE = "message";
    public static final String PARAMS_ROUTE = "route";

    public SmsService(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = (Context)reactContext;
        mReactContext = reactContext;
        messageQueue = new LinkedList<String>();

        mContext.registerReceiver(new SMSSentBroadcastReceiver(), new IntentFilter(SMS_SENT_FILTER));
        mContext.registerReceiver(new SMSReceivedBroadcastReceiver(), new IntentFilter(SMS_RECEIVED_FILTER));
    }

    @Override
    public String getName() {
        return "SmsService";
    }

    @ReactMethod
    public void sendTextMessage(String message) {
        PendingIntent sentPendingIntent = PendingIntent.getBroadcast(mContext, 0, new Intent(SMS_SENT_FILTER), 0);

        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(OC_TRANSPO_NUMBER, null, message, sentPendingIntent, null);
        messageQueue.add(message);
    }

    public class SMSSentBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            switch (getResultCode()) {
                case SmsManager.RESULT_ERROR_GENERIC_FAILURE:
                    Toast.makeText(context, "Generic failure cause", Toast.LENGTH_SHORT).show();
                    break;
                case SmsManager.RESULT_ERROR_NO_SERVICE:
                    Toast.makeText(context, "Service is currently unavailable", Toast.LENGTH_SHORT).show();
                    break;
                case SmsManager.RESULT_ERROR_NULL_PDU:
                    Toast.makeText(context, "No pdu provided", Toast.LENGTH_SHORT).show();
                    break;
                case SmsManager.RESULT_ERROR_RADIO_OFF:
                    Toast.makeText(context, "Radio was explicitly turned off", Toast.LENGTH_SHORT).show();
                    break;
            }
        }
    }

    public class SMSReceivedBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Bundle bundle = intent.getExtras();
            if (bundle == null) return;

            Object[] pdus = (Object[])bundle.get("pdus");

            // Iterate over each message
            for (int i = 0; i < pdus.length; i++) {
                SmsMessage message = SmsMessage.createFromPdu((byte[])pdus[i]);

                if (message.getOriginatingAddress().equals(OC_TRANSPO_NUMBER)) {
                    emitSMSReceivedEvent(message.getMessageBody().toString());
                }
            }
        }

        private void emitSMSReceivedEvent(String message) {
            // Prevents crashes when user manually texts the SMS service outside the app
            if (messageQueue.isEmpty()) {
                return;
            }

            WritableMap params = Arguments.createMap();
            params.putString(PARAMS_MESSAGE, message);

            String route = messageQueue.remove();
            params.putString(PARAMS_ROUTE, route);

            mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(SMS_RECEIVED_EVENT, params);
        }
    }
}
