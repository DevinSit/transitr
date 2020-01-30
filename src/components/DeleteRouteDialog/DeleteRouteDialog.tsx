import React from "react";
import {StyleSheet, Text} from "react-native";
import {ModalDialog} from "@devinsit/react-native-components";
import {DEFAULT_SPACING} from "styles/dimens";
import connect, {ConnectedProps} from "./connect";

const DeleteRouteDialog = ({
    busNumber = "", busStop = "", isVisible = false, onCancel, onDelete
}: ConnectedProps) => (
    <ModalDialog
        headerText="Delete Route"
        positiveButtonText={`Delete ${busStop} ${busNumber}`}
        negativeButtonText="Cancel"
        isVisible={isVisible}
        onClose={onCancel}
        onPositiveButtonClick={onDelete}
        onNegativeButtonClick={onCancel}
    >
        <Text style={styles.deleteRouteDialog__text}>
            Are you sure you want to delete {busStop} {busNumber}?
        </Text>
    </ModalDialog>
);

const styles = StyleSheet.create({
    deleteRouteDialog__text: {
        marginBottom: DEFAULT_SPACING / 2,
        marginTop: DEFAULT_SPACING / 2
    }
});

export default connect(DeleteRouteDialog);
