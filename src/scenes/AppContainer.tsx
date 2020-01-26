import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {PRIMARY_COLOR, LIGHT_COLOR} from "styles";
import Home from "./Home";

export const SCENES = {
    HOME: "Transitr"
};

const AppNavigator = createStackNavigator(
    {
        [SCENES.HOME]: {
            screen: Home
        }
    },
    {
        initialRouteName: SCENES.HOME,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: PRIMARY_COLOR
            },
            headerTitleStyle: {
                color: LIGHT_COLOR
            },
            headerTintColor: LIGHT_COLOR
        }
    }
);

export default createAppContainer(AppNavigator);
