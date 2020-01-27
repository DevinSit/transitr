import React, {useMemo} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DARK_COLOR} from "styles/colors";
import {DEFAULT_SPACING} from "styles/dimens";
import {RouteRow} from "./components";
import connect, {ConnectedProps} from "./connect";

const computeRowStyle = (isLastRow: boolean) => isLastRow ? [styles.routeRow, styles.routeRow__last] : styles.routeRow;

const RouteList = ({routes = []}: ConnectedProps) => {
    const routeRows = useMemo(() => routes.map((route, index) => (
        <RouteRow
            key={route.id}
            style={computeRowStyle(index === routes.length - 1)}
            id={route.id}
        />
    )), [routes]);

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

export default connect(RouteList);
