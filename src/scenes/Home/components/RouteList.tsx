import React, {useMemo} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DARK_COLOR} from "styles/colors";
import {DEFAULT_SPACING} from "styles/dimens";
import RouteRow from "./RouteRow";

const mockRoutes = [
    {
        id: "1",
        busNumber: "231",
        busStop: "Blair",
        smsTextCode: "Blair 231"
    },
    {
        id: "2",
        busNumber: "231",
        busStop: "Blair",
        smsTextCode: "Blair 231"
    },
    {
        id: "3",
        busNumber: "231",
        busStop: "Blair",
        smsTextCode: "Blair 231"
    }
];


const computeRowStyle = (isLastRow: boolean) => isLastRow ? [styles.routeRow, styles.routeRow__last] : styles.routeRow;

const RouteList = ({routes = mockRoutes}) => {
    const routeRows = useMemo(() => routes.map((route, index) => (
        <RouteRow
            key={route.id}
            style={computeRowStyle(index === routes.length - 1)}
            route={route}
        />
    )), routes);

    return (
        <ScrollView style={styles.routeList}>
            <Text style={styles.routeListHeader}>
                Routes
            </Text>

            {routeRows}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    routeList: {
        paddingHorizontal: DEFAULT_SPACING
    },
    routeListHeader: {
        color: DARK_COLOR,
        fontSize: 18,
        marginTop: DEFAULT_SPACING,
        marginBottom: DEFAULT_SPACING / 2
    },
    routeRow: {
        marginVertical: DEFAULT_SPACING / 2
    },
    routeRow__last: {
        marginBottom: DEFAULT_SPACING * 6
    }
});

export default RouteList;
