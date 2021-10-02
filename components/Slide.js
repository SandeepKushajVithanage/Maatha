import React from "react";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {colors, gradientColors} from "../assets/statics";
import Tts from "react-native-tts";
import {useRoute} from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";

const Slide = ({item, prev, isPrev, next, isNext, finish, navigation}) => {

    const [data, setData] = React.useState(null);

    const route = useRoute();
    Tts.stop();
    if(route.name==='Exercises'){
        setTimeout(() => {
            Tts.speak(item.speak, {
                androidParams: {
                    // KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
                {item.steps.map((item, index) => {
                    return (
                        <View key={index} style={styles.stepContainer}>
                            <Icon name={'md-chevron-forward'} size={20} color={colors.thirdColor}/>
                            <Text style={styles.step}>{item}</Text>
                        </View>
                    )
                })}
            </View>
            {
                item.image ?
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={item.image} style={{
                            height: 250,
                            width: 250
                        }}/>
                    </View> :
                    <></>
            }
            <View style={styles.footer}>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={[styles.navContainer, {
                justifyContent: isNext && isPrev ? 'space-between' : isNext ? 'flex-end' : 'space-between'
            }]}>
                {isPrev ?
                    <TouchableOpacity onPress={prev}>
                        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                            <Icon name={'md-chevron-back'} size={45} color={colors.secondaryColor}/>
                        </LinearGradient>
                    </TouchableOpacity> : <></>
                }
                {isNext ?
                    <TouchableOpacity onPress={next}>
                        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                         <Icon name={'md-chevron-forward'} size={45} color={colors.secondaryColor}/>
                        </LinearGradient>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={finish}>
                        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                            <Icon name={'md-checkmark'} size={45} color={colors.secondaryColor}/>
                        </LinearGradient>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}
export default Slide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    },
    header: {
        flex: 2,
        padding: 20,
        paddingBottom: 70
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    stepContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    step: {
        color: colors.thirdColor,
        padding: 5,
        fontSize: 15
    },
    title: {
        textAlign: 'center',
        color: colors.thirdColor,
        fontSize: 25,
        margin: 20
    },
    description: {
        color: colors.thirdColor,
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15,
        textAlign: 'center'
    },
    navContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        margin: 20
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
