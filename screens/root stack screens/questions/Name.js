import React from "react";
import {View, Text, Platform, Alert, TextInput, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import img from '../../../assets/image.png';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';

import {colors, gradientColors} from "../../../assets/statics";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

const Name = ({next, name, setName}) => {

    const onNameChange = (text) => {
        setName(text)
    }

    return (
        <Animatable.View animation={'fadeIn'} style={styles.container}>
            <View style={styles.header}>
                <Image source={img} style={{
                    borderRadius: 250,
                }}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.question}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>My Name?</Text>
                        {
                            name.trim() !== '' ?
                                <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                    <Feather name={'check-circle'} color={colors.thirdColor} size={25}/>
                                </Animatable.View> :
                                <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                    <Feather name={'x-circle'} color={'#f00'} size={25}/>
                                </Animatable.View>
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <TextInput
                            autoCapitalize={'words'}
                            autoCompleteType={'name'}
                            value={name}
                            placeholder={'My name'}
                            onChangeText={onNameChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={() => next(1)} disabled={(name==='')}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Icon name={'md-chevron-forward'} size={45} color={colors.secondaryColor}/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animatable.View>
    );
}

export default Name;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        // padding: 10,
    },
    title: {
        color: colors.thirdColor,
        fontWeight: 'bold',
        fontSize: 25
    },
    question: {
        margin: 20,
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 5,
        width: 250,
        height: 40,
        paddingTop: 10,
        backgroundColor: colors.thirdColor,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.secondaryColor,
        borderRadius: 20
    },
    input: {
        margin: 5,
        marginTop: 10,
        backgroundColor: colors.secondaryColor,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        width: 250
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    navButton: {

    },
    icon: {
        marginLeft: 20,
        justifyContent: 'flex-end',
        paddingBottom: 2
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
