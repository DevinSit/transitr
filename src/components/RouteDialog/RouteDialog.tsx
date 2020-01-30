import React, {useCallback, useState} from "react";
import {StyleSheet, Text, TextInput} from "react-native";
import {ModalDialog} from "@devinsit/react-native-components";
import {Route} from "models/";
import {DARK_COLOR, GREY_LIGHT_COLOR} from "styles/colors";
import {DEFAULT_SPACING} from "styles/dimens";

interface Props {
    isVisible: boolean;
    onCancel: () => void;
    onSave: (route: Route) => void;
};

const RouteDialog = ({isVisible = false, onCancel, onSave}: Props) => {
    const [smsTextCode, setSmsTextCode] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [busStop, setBusStop] = useState("");

    const clearState = useCallback(() => {
        setSmsTextCode("");
        setBusNumber("");
        setBusStop("");
    }, [setSmsTextCode, setBusNumber, setBusStop]);

    const onTextCodeChange = useCallback((smsTextCode: string) => {
        const {busNumber, busStop} = Route.parseTextCode(smsTextCode);

        setSmsTextCode(smsTextCode);
        setBusNumber(busNumber);
        setBusStop(busStop);
    }, [setSmsTextCode, setBusNumber, setBusStop]);

    const closeDialog = useCallback(() => {
        clearState();
        onCancel();
    }, [clearState, onCancel]);

    const saveDialog = useCallback(() => {
        const route = new Route({
            smsTextCode: smsTextCode.trim(),
            busNumber: busNumber.trim(),
            busStop: busStop.trim()
        });

        onSave(route);
        clearState();
    }, [smsTextCode, busNumber, busStop, clearState, onSave]);

    return (
        <ModalDialog
            headerText="New Route"
            positiveButtonText="Add"
            negativeButtonText="Cancel"
            isVisible={isVisible}
            onClose={closeDialog}
            onPositiveButtonClick={saveDialog}
            onNegativeButtonClick={closeDialog}
        >
            <>
                <TextInput
                    placeholder="SMS Text Code"
                    placeholderTextColor={GREY_LIGHT_COLOR}
                    value={smsTextCode}
                    onChangeText={onTextCodeChange}
                />

                <Text style={styles.routeDialog__SecondaryHeader}>Display Labels</Text>

                <TextInput
                    placeholder="Bus Number"
                    placeholderTextColor={GREY_LIGHT_COLOR}
                    value={busNumber}
                    onChangeText={setBusNumber}
                />

                <TextInput
                    placeholder="Bus Stop"
                    placeholderTextColor={GREY_LIGHT_COLOR}
                    value={busStop}
                    onChangeText={setBusStop}
                />
            </>
        </ModalDialog>
    );
};

const styles = StyleSheet.create({
    routeDialog__SecondaryHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: DEFAULT_SPACING / 2
    }
});

export default RouteDialog;
