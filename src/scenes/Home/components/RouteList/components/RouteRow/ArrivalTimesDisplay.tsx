import React, {useMemo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ArrivalTime} from "models/";
import {DEFAULT_RADIUS} from "styles/dimens";

interface ArrivalTimesDisplayProps {
    isRefreshing: boolean;
    message: string;
    times: Array<ArrivalTime>;
}

interface ArrivalTimeDisplayProps {
    time: string;
    arrivingSoon: boolean;
}

const RetrievingMessage = () => (
    <Text style={styles.arrivalTime__Text_retrievingTimes}>
        Retrieving latest arrival times...
    </Text>
);

const ArrivalTimesDisplay = ({isRefreshing = false, message = "", times = []}: ArrivalTimesDisplayProps) => {
    const display = useMemo(() => {
        // Yes, the order of these conditionals matters. Specifically with regard to the third one,
        // when the times array is empty. This array will be empty in two cases:
        //
        // 1. When first creating a route.
        // 2. When there are no upcoming arrival times.
        //
        // We only want to show the RetrievingMessage for case 1. Case 2 is handled by conditional 2,
        // and by the fact that conditional 2 takes precedence over conditional 3.
        //
        // However, actual refreshing (as dictated by the parent component, RouteRow), takes precedence over everything.
        if (isRefreshing) {  // Refreshing
            return <RetrievingMessage />;
        } else if (message !== "") {  // Specific message (e.g. 'No upcoming arrival times')
            return <Text>{message}</Text>;
        } else if (times.length === 0) {  // On first creation of a route
            return <RetrievingMessage />;
        } else {  // Display times like usual
            return times.map(({time, arrivingSoon}, index) => (
                <ArrivalTimeDisplay
                    key={time + index}
                    time={time}
                    arrivingSoon={arrivingSoon}
                />
            ));
        }
    }, [isRefreshing, message, times]);

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
