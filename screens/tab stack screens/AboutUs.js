import React from "react";
import {View, Text,StyleSheet} from "react-native";
import {colors} from "../../assets/statics";

const AboutUs = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>About Us</Text>
        </View>
    )
}

export default AboutUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    }
})
