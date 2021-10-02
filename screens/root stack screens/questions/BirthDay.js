import React from "react";
import {View, Text, Platform, Alert, TextInput, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import img from '../../../assets/image.png';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Ionicons";
import {colors, gradientColors} from "../../../assets/statics";
import LinearGradient from "react-native-linear-gradient";


const BirthDay = ({birthDate, setBirthDate, next, prev, isSetBD, setIsSetBD}) => {

    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setBirthDate(currentDate);
        setShow(false);
        setIsSetBD(true);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <Animatable.View animation={'fadeIn'} style={styles.container}>
            <View style={styles.header}>
                <Image source={img} style={{
                    borderRadius: 250
                }}/>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={birthDate}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(Date.now()-86400000*365*50)}
                />
            )}
            <View style={styles.footer}>
                <View style={styles.question}>
                    <Text style={styles.title}>Your Birth Date?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={showDatepicker}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Text style={styles.button}>
                                    {/*{isSetBD? */}
                                    {birthDate.toString().substr(0, 15)}
                                        {/*: 'My birth date'}*/}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={() => prev(2)}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Icon name={'md-chevron-back'} size={45} color={colors.secondaryColor}/>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => next(1)}>
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

export default BirthDay;

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
        width: 250,
        height: 40,
        paddingTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.secondaryColor
    },
    date: {
        color: colors.thirdColor,
        fontSize: 20,
        margin: 5,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navButton: {

    },
    buttonOutline: {
        marginTop: 10,
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
