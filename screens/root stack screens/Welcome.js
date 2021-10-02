import React from "react";
import {View, Text, StyleSheet, Button, Image, TouchableOpacity} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, gradientColors, shadow} from "../../assets/statics";
import * as Animatable from 'react-native-animatable';
import LinearGradient from "react-native-linear-gradient";
import Tts from "react-native-tts";

const slides = [
    {
        key: '1',
        title: 'Welcome',
        text: " 'Maatha' is an antenatal care mobile application which is targeting on individuals who need support self-management during pregnancy.",
        image: require('../../assets/image.png'),
    },
    {
        key: '2',
        title: 'Instructions',
        text: "All the features have been provided here to manage everything for you regarding pregnancy",
        image: require('../../assets/images/welcome_2.jpg'),
    },
    {
        key: '3',
        title: 'Get Start',
        text:
            "✨👶🏻Thank you for choosing our mobile application. We hope you will enjoy our software product ❤",
        image: require('../../assets/images/welcome_3.jpg'),
    },
];

const renderSlide = ({item}) => {

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.slide}>
                    <Image style={styles.image} source={item.image}/>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        </>
    );
}

const nextButton = () => {
    return (
        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
            <Icon name={'md-chevron-forward'} size={45} color={colors.secondaryColor}/>
        </LinearGradient>
    );
}

const doneButton = () => {
    return (
        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
            <Icon name={'md-checkmark'} size={45} color={colors.secondaryColor}/>
        </LinearGradient>
    );
}

const Welcome = ({navigation}) => {

    const speech = "Welcome. This is maatha, your antenatal personal care assistant. Let's get started.";

    React.useEffect(() => {
        Tts.stop();
        setTimeout(() => {
            Tts.speak(speech, {
                androidParams: {
                    // KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 1000)
    }, []);

    return (
        <Animatable.View animation={'fadeIn'} style={styles.container}>
            <AppIntroSlider
                renderItem={renderSlide}
                data={slides}
                activeDotStyle={{
                    backgroundColor: colors.thirdColor,
                    width:40
                }}
                onDone={() => navigation.navigate('Questions')}
                renderNextButton={nextButton}
                renderDoneButton={doneButton}
            />
        </Animatable.View>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 40,
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.thirdColor
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 400,
        width: 400,
        borderRadius: 250
    },
    footer: {
        flex: 4,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,0,148,0.5)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 20,
        color: colors.thirdColor,
        textAlign: 'center'
    },
    buttonShadow: {
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    }
});
