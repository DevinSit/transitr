import React, {useMemo} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DARK_COLOR, GREY_COLOR} from "styles/colors";
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

    // Need a View when there aren't any rows to properly position the EmptyMessage.
    // Doesn't work with a ScrollView.
    const Container = routeRows.length > 0 ? ScrollView : View;

    return (
        <Container style={styles.routeList}>
            <Text style={styles.routeListHeader}>
                Routes
            </Text>

            {routeRows.length > 0 ? routeRows : <EmptyMessage />}
        </Container>
    );
};

// Yes, the styling for this thing is jank.
const EmptyMessage = () => (
    <View style={styles.emptyMessage}>
        <Text style={styles.emptyMessage__text}>
            Add your first route
        </Text>
        <Text style={styles.emptyMessage__arrow}>↓</Text>
    </View>
);

const styles = StyleSheet.create({
    routeList: {
        flex: 1,
        paddingHorizontal: DEFAULT_SPACING,
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
    },
    emptyMessage: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: DEFAULT_SPACING * 6,
    },
    emptyMessage__text: {
        fontSize: 18,
        color: GREY_COLOR,
        marginRight: 16
    },
    emptyMessage__arrow: {
        fontSize: 64,
        marginRight: 26,
        color: GREY_COLOR
    }
});

export default connect(RouteList);
