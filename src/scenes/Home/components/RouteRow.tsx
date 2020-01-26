import React from "react";
import {Platform, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DARK_COLOR, LIGHT_COLOR, ICON_ON_WHITE_COLOR} from "styles/colors";
import {DEFAULT_SPACING, DEFAULT_RADIUS} from "styles/dimens";
import ArrivalTimesDisplay from "./ArrivalTimesDisplay";

const mockArrivalTimes = [
    {id: "1", time: "1:00", arrivingSoon: false},
    {id: "2", time: "2:00", arrivingSoon: false},
    {id: "3", time: "3:00", arrivingSoon: false}
];

const touchableBackground = (Platform.OS === "android") ? TouchableNativeFeedback.Ripple("", true) : null;

/* interface Props { */
/*     style?: StyleSheet.Styles, */
/*     busStop: string, */
/*     busNumber: string, */
/*     message: string, */
/*     arrivalTimes: Array<ArrivalTime>, */
/*     onRefresh: () => void */
/* }; */

const RouteRow = ({style, route}) => {
    return (
        <View style={[styles.rowContainer, style]}>
            <Text style={styles.row__BusNumber}>{route.busNumber}</Text>

            <View style={styles.row__BusStopContainer}>
                <Text style={styles.row__BusStop}>{route.busStop}</Text>

                <ArrivalTimesDisplay
                    times={mockArrivalTimes}
                    message={""}
                />
            </View>

            <View style={styles.row__RefreshContainer}>
                <TouchableNativeFeedback background={touchableBackground}>
                    <View style={styles.row__Refresh}>
                        <Icon name="refresh" color={ICON_ON_WHITE_COLOR} size={24} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
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

export default RouteRow;