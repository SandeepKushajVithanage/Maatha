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
    ImageBackground, Dimensions
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import img from '../../../assets/image2.png';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Ionicons";
import {colors, gradientColors} from "../../../assets/statics";
import LinearGradient from "react-native-linear-gradient";
// import DatePicker from "react-native-datepicker";


const DueDate = ({dueDate, setDueDate, next, prev, isSetTime, setIsSetTime}) => {

    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate;
        setDueDate(currentDate);
        setShow(false);
        setIsSetTime(true);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const onCalc = () => {
        next(1);
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
                    value={dueDate}
                    mode={'date'}
                    display="default"
                    onChange={onChange}
                    customStyles={{backgroundColor: colors.thirdColor}}
                    maximumDate={new Date(Date.now()+86400000*7*38)}
                    minimumDate={new Date(Date.now()+86400000)}
                />
            )}
            <View style={styles.footer}>
                <View style={styles.question}>
                    <Text style={styles.title}>Due Date?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={showDatepicker} style={
                            [styles.buttonShadow]
                        }>
                            <LinearGradient colors={gradientColors} style={[styles.buttonShadow]}>
                                <Text style={styles.button}>
                                    {dueDate.toString().substr(0, 15)}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCalc}>
                            <LinearGradient colors={gradientColors} style={[styles.buttonOutline, styles.buttonShadow]}>
                                <Text style={styles.button}>Calculate my due date</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={() => prev(1)}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Icon name={'md-chevron-back'} size={45} color={colors.secondaryColor}/>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => next(2)}>
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

export default DueDate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
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
