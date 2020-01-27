import React, {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {FloatingActionButton} from "@devinsit/react-native-components";
import {RouteDialog} from "components/";
import {Route} from "models/";
import {PRIMARY_COLOR} from "styles/colors";
import connect, {ConnectedProps} from "./connect";

const AddRouteButton = ({onAddRoute}: ConnectedProps) => {
    const [isDialogVisible, setDialogVisible] = useState(false);

    const hideDialog = useCallback(() => setDialogVisible(false), [setDialogVisible]);
    const showDialog = useCallback(() => setDialogVisible(true), [setDialogVisible]);

    const onDialogSave = useCallback((route: Route) => {
        onAddRoute(route);
        setDialogVisible(false);
    }, [setDialogVisible, onAddRoute]);

    return (
        <View style={styles.addRouteContainer}>
            <FloatingActionButton color={PRIMARY_COLOR} onClick={showDialog}>
                <Icon name="add" color="white" size={24} />
            </FloatingActionButton>

            <RouteDialog
                isVisible={isDialogVisible}
                onCancel={hideDialog}
                onSave={onDialogSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addRouteContainer: {
        bottom: 0,
        position: "absolute",
        right: 0
    }
});

export default connect(AddRouteButton);
