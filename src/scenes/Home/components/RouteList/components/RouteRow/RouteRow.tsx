import React, {useCallback, useEffect, useState} from "react";
import {Platform, StyleProp, StyleSheet, Text, TouchableNativeFeedback, View, ViewStyle} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DARK_COLOR, LIGHT_COLOR, ICON_ON_WHITE_COLOR} from "styles/colors";
import {DEFAULT_SPACING, DEFAULT_RADIUS} from "styles/dimens";
import ArrivalTimesDisplay from "./ArrivalTimesDisplay";
import connect, {ConnectedProps} from "./connect";

const touchableBackground = (Platform.OS === "android") ? TouchableNativeFeedback.Ripple("", true) : undefined;

interface Props extends ConnectedProps {
    style?: StyleProp<ViewStyle>;
};

const RouteRow = ({
    style,
    busNumber = "",
    busStop = "",
    arrivalMessage = "",
    arrivalTimes = [],
    lastUpdated = "",
    onDelete,
    onRefresh
}: Props) => {
    const [isRefreshing, setRefreshing] = useState(false);

    const onRefreshClick = useCallback(() => {
        if (!isRefreshing) {
            setRefreshing(true);
            onRefresh();
        }
    }, [onRefresh, isRefreshing, setRefreshing]);

    useEffect(() => {
        // When 'lastUpdated' changes, that means that new arrival times have been created.
        // As such, refreshing can stop.
        //
        // Note that if 'lastUpdated' were a date value instead of a string value, this wouldn't
        // work because JavaScript dates with the same values aren't strictly equal
        // (i.e. new Date("1990-01-01") !== new Date("1990-01-01")).
        setRefreshing(false);
    }, [lastUpdated]);

    return (
        <TouchableNativeFeedback onLongPress={onDelete}>
            <View style={[styles.rowContainer, style]}>
                <Text style={styles.row__BusNumber}>{busNumber}</Text>

                <View style={styles.row__BusStopContainer}>
                    <Text style={styles.row__BusStop}>{busStop}</Text>

                    <ArrivalTimesDisplay
                        isRefreshing={isRefreshing}
                        message={arrivalMessage}
                        times={arrivalTimes}
                    />
                </View>

                <View style={styles.row__RefreshContainer}>
                    <TouchableNativeFeedback background={touchableBackground} onPress={onRefreshClick}>
                        <View style={styles.row__Refresh}>
                            <Icon name="refresh" color={ICON_ON_WHITE_COLOR} size={24} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: LIGHT_COLOR,
        borderRadius: DEFAULT_RADIUS,
        flexDirection: "row",
        padding: DEFAULT_SPACING / 1.5
    },
    row__BusNumber: {
        color: DARK_COLOR,
        fontSize: 16,
        width: 55,
    },
    row__BusStopContainer: {
        flex: 1,
    },
    row__BusStop: {
        color: DARK_COLOR,
        fontSize: 18,
        marginBottom: 15
    },
    row__RefreshContainer: {
        justifyContent: "center",
    },
    row__Refresh: {
        marginLeft: DEFAULT_SPACING / 2,
        padding: 5
    }
});

export default connect(RouteRow);
