import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {AddRouteButton, DeleteRouteDialog, SortDialog} from "components/";
import sceneStyles from "styles/sceneStyles";
import {HomeActionBarMenu, RouteList} from "./components";

const Home = () => (
    <View style={sceneStyles.defaultStyle}>
        <RouteList />
        <AddRouteButton />
        <DeleteRouteDialog />

        <SortDialog />
    </View>
);

// react-navigation options
Home.navigationOptions = {
    headerRight: () => <HomeActionBarMenu />
};

export default Home;
