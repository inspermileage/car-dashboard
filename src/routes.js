import React from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import {
    DrawerItems,
    SafeAreaView,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";

import Dashboard from "./pages/Dashboard";
import Config from "./pages/Config";
import logo from "../assets/logo.png";
import { View } from "native-base";

const LogoDrawerComponent = props => (
    <ScrollView>
        <View style={styles.container}>
            <Image style={styles.image} source={logo} />
        </View>

        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

export default createAppContainer(
    createDrawerNavigator(
        {
            // As páginas que existem no aplicativo
            Config,
            Dashboard
        },
        {
            contentComponent: LogoDrawerComponent,

            drawerWidth: 200,
            contentOptions: { activeTintColor: "#ff450d" }
        }
    )
);

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    image: { height: 47.5, width: 185 }
});
