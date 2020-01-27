import React, {useMemo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ArrivalTime} from "models/";
import {DEFAULT_RADIUS} from "styles/dimens";

interface ArrivalTimesDisplayProps {
    times: Array<ArrivalTime>,
    message: string
};

interface ArrivalTimeDisplayProps {
    time: string,
    arrivingSoon: boolean
};

const ArrivalTimesDisplay = ({times = [], message = ""}: ArrivalTimesDisplayProps) => {
    const display = useMemo(() => {
        if (message !== "") {
            return <Text>{message}</Text>;
        } else if (times.length === 0) {
            return (
                <Text style={styles.arrivalTime__Text_retrievingTimes}>
                    Retrieving latest arrival times...
                </Text>
            );
        } else {
            return times.map(({time, arrivingSoon}, index) => (
                <ArrivalTimeDisplay
                    key={time + index}
                    time={time}
                    arrivingSoon={arrivingSoon}
                />
            ));
        }
    }, [times, message]);

    return <View style={styles.arrivalTimes__Container}>{display}</View>;
};

const ArrivalTimeDisplay = ({time = "", arrivingSoon = false}: ArrivalTimeDisplayProps) => (
    <View style={arrivingSoon && styles.arrivalTime__Container_arrivingSoon}>
        <Text
            style={[
                styles.arrivalTime__Text,
                arrivingSoon && styles.arrivalTime__Text_arrivingSoon
            ]}
        >
            {`${time}${arrivingSoon ? "*" : ""}`}
        </Text>
    </View>
);

const ARRIVAL_TIME_HORIZONTAL_SPACING = 6;

const styles = StyleSheet.create({
    arrivalTimes__Container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    arrivalTime__Container_arrivingSoon: {
        backgroundColor: "red",
        borderRadius: DEFAULT_RADIUS,
        paddingVertical: ARRIVAL_TIME_HORIZONTAL_SPACING / 2,
        paddingHorizontal: ARRIVAL_TIME_HORIZONTAL_SPACING
    },
    arrivalTime__Text: {
        fontSize: 16,
        marginRight: ARRIVAL_TIME_HORIZONTAL_SPACING
    },
    arrivalTime__Text_arrivingSoon: {
        color: "white",
        marginRight: 0
    },
    arrivalTime__Text_retrievingTimes: {
        fontStyle: "italic"
    }
});

export default ArrivalTimesDisplay;
