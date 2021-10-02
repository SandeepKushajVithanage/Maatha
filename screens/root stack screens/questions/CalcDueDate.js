import React from "react";
import {
    View,
    Text,
    Platform,
    Alert,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import img from '../../../assets/image2.png';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Ionicons";
import {colors, day, gradientColors, week} from "../../../assets/statics";
import LinearGradient from "react-native-linear-gradient";


const CalcDueDate = ({dueDate, setDueDate, next, prev}) => {

    const [show, setShow] = React.useState(false);
    const [isSetTime, setIsSetTime] = React.useState(false);
    const [length, setLength] = React.useState(30);

    const [date, setDate] = React.useState(new Date(new Date(Date.now()-2*day).toISOString().substr(0,10)));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDueDate(new Date(Date.parse(currentDate) + day * (length>=28 && length<=32 ? length : 30) * 8.5))
        setShow(false);
        setIsSetTime(true);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const onTextChange = (text) => {
        if((!isNaN(text))&&text>=0&&text<=32){
            setLength(text);
            setDueDate(new Date(Date.parse(date) + day * (text>=28 && text<=32 ? text : 30) * 8.5));
        }
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <Animatable.View animation={'fadeIn'} style={styles.container}>
            <View style={styles.header}>
                <Image source={img} style={{
                    width: windowWidth, height: windowHeight/2,
                    borderRadius: 300
                }}/>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date(Date.now()-86400000)}
                    minimumDate={new Date(Date.now()-86400000*7*37)}
                />
            )}
            <View style={styles.footer}>
                <View style={styles.question}>
                    <Text style={styles.title}>Calculate Due Date?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={showDatepicker}>
                            <LinearGradient colors={gradientColors} style={[styles.buttonShadow]}>
                                <Text style={styles.button}>
                                    {isSetTime ? date.toString().substr(0, 15) : 'First day of my last period'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={[styles.buttonShadow, styles.buttonOutline]}>
                            <TextInput
                                onEndEditing={text => {
                                    if(text<28 || text>32){
                                        setLength(30);
                                    }
                                }}
                                keyboardType={'number-pad'}
                                value={length.toString()}
                                placeholder={'My cycle length'}
                                onChangeText={onTextChange}
                                style={styles.input}
                            />
                        </View>
                    </View>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={() => prev(1)}>
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

export default CalcDueDate;

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
    input: {
        backgroundColor: colors.secondaryColor,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        width: 250,
        textAlign: 'center'
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
