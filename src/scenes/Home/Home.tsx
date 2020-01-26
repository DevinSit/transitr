import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";

const Home = () => (
    <>
        <SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.sectionDescription}>Here is a test!</Text>
            </View>
        </SafeAreaView>
    </>
);

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#FFF",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
        color: "#212121",
    }
});

export default Home;
