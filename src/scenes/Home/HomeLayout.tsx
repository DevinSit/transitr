import React from "react";
import {StyleSheet, Text, View} from "react-native";
import sceneStyles from "styles/sceneStyles";
import {RouteList} from "./components";

const HomeLayout = () => (
    <View style={sceneStyles.defaultStyle}>
        <RouteList />
    </View>
);

export default HomeLayout;
