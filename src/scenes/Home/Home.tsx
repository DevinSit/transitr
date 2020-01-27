import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {AddRouteButton} from "components/";
import sceneStyles from "styles/sceneStyles";
import {RouteList} from "./components";

const Home = () => (
    <View style={sceneStyles.defaultStyle}>
        <RouteList />
        <AddRouteButton />
    </View>
);

export default Home;
