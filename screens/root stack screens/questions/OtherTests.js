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
import * as Animatable from 'react-native-animatable';
import img from '../../../assets/image2.png';
import Icon from "react-native-vector-icons/Ionicons";
import {colors, gradientColors} from "../../../assets/statics";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";


const OtherTests = ({prev, finish, mm, setMm, hg, setHg, height, setHeight, urineLevel, setUrineLevelValue, weight, setWeightValue}) => {

    const onMmChange = (text) => {
        if(!isNaN(text) && text>0){
            setMm(text);
        }
    }

    const onUrineLevelChange = (text) => {
        if(!isNaN(text) && text<15 && text>=0){
            setUrineLevelValue(text);
        }
    }

    const onWeightChange = (text) => {
        if(!isNaN(text) && text>0){
            setWeightValue(text)
        }
    }

    const onHeightChange = (text) => {
        if(!isNaN(text) && text>0){
            setHeight(text);
        }
    }

    const onHgChange = (text) => {
        if(!isNaN(text) && text>0){
            setHg(text)
        }
    }

    const checkBloodPressure = () => {
        if(mm>0 && hg>0){
            return true;
        }else{
            return false;
        }
    }

    const checkUrineLevel = () => {
        if(urineLevel!=='' && urineLevel>=0 && urineLevel<15){
            return true;
        }else{
            return false
        }
    }

    const checkHeight = () => {
        if(height>0){
            return true;
        }else{
            return false;
        }
    }
    const checkWeight = () => {
        if(weight>0){
            return true;
        }else{
            return false;
        }
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <Animatable.View animation={'fadeIn'} style={styles.container}>
            <View style={styles.header}>
                <Image source={img} style={{
                    width: windowWidth/1.5, height: windowHeight/3,
                    borderRadius: 50
                }}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.questionContainer}>
                    <Text style={styles.title}>Extra Fields</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.questionTitle}>
                            <Text style={styles.questions}>Blood Pressure (mm/hg)</Text>
                            {
                                checkBloodPressure() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={15}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={15}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.value}>
                            <View style={styles.buttonShadow}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        value={mm}
                                        onChangeText={onMmChange}
                                        placeholder={'MM'}
                                        style={styles.input}
                                    />
                                    <TextInput
                                        keyboardType={'numeric'}
                                        value={hg}
                                        onChangeText={onHgChange}
                                        placeholder={'HG'}
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.questionTitle}>
                            <Text style={styles.questions}>Urine Level (ph)</Text>
                            {
                                checkUrineLevel() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={15}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={15}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.value}>
                            <View style={styles.buttonShadow}>
                                <TextInput
                                    keyboardType={'numeric'}
                                    value={urineLevel}
                                    onChangeText={onUrineLevelChange}
                                    placeholder={'Urine Level'}
                                    style={styles.inputContainer}
                                />
                            </View>
                        </View>
                        <View style={styles.questionTitle}>
                            <Text style={styles.questions}>Height (cm)</Text>
                            {
                                checkHeight() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={15}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={15}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.value}>
                            <View style={styles.buttonShadow}>
                                <TextInput
                                    keyboardType={'numeric'}
                                    value={height}
                                    onChangeText={onHeightChange}
                                    placeholder={'Height'}
                                    style={styles.inputContainer}
                                />
                            </View>
                        </View>
                        <View style={styles.questionTitle}>
                            <Text style={styles.questions}>Weight (kg)</Text>
                            {
                                checkWeight() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={15}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={15}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.value}>
                            <View style={styles.buttonShadow}>
                                <TextInput
                                    keyboardType={'numeric'}
                                    value={weight}
                                    onChangeText={onWeightChange}
                                    placeholder={'Weight'}
                                    style={styles.inputContainer}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={{textAlign: 'center', color: colors.thirdColor, fontStyle: 'italic'}}>
                        Note: These fields are optional
                    </Text>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={() => prev(1)}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Icon name={'md-chevron-back'} size={45} color={colors.secondaryColor}/>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={finish}>
                            <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                                <Icon name={'md-checkmark'} size={45} color={colors.secondaryColor}/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animatable.View>
    );
}

export default OtherTests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
    },
    header: {
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        // padding: 10,
    },
    title: {
        color: colors.thirdColor,
        fontWeight: 'bold',
        fontSize: 25
    },
    questionContainer: {
        margin: 20,
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        margin: 10,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    date: {
        color: colors.thirdColor,
        fontSize: 20,
        margin: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: colors.secondaryColor,
        padding: 5,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: 250
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navButton: {

    },
    questions: {
        color: colors.thirdColor,
        fontWeight: 'bold',
        marginTop: 5
    },
    value: {
        alignItems: 'center',
        marginBottom: 5
    },
    input: {
        flex: 1,
        padding: 0
    },
    questionTitle: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
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
