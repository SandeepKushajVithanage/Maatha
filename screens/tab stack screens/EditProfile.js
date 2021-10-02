import React from "react";
import {View, Text, StyleSheet, Button, ScrollView, TextInput, Image, TouchableOpacity} from "react-native";
import {colors, gradientColors} from "../../assets/statics";
import img from "../../assets/images/logo1.png";
import {StoreContext} from "../../components/context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

const EditProfile = ({navigation}) => {

    const {retrieveData, saveData} = React.useContext(StoreContext);

    const [name, setName] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date());
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [mm, setMm] = React.useState('');
    const [hg, setHg] = React.useState('');
    const [urineLevel, setUrineLevelValue] = React.useState('');
    const [weight, setWeightValue] = React.useState('');
    const [height, setHeightValue] = React.useState('');

    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate;
        setDueDate(currentDate);
        setShow(false);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    React.useEffect(async () => {
        const d = await retrieveData()
        if(d){
            if(d.name){
                setName(d.name);
            }
            if(d.dueDate){
                setDueDate(new Date(d.dueDate));
            }
            if(d.bloodPressure && d.bloodPressure.mm && d.bloodPressure.hg){
                setHg(d.bloodPressure.hg);
                setMm(d.bloodPressure.mm);
            }
            if(d.urineLevel){
                setUrineLevelValue(d.urineLevel);
            }
            if(d.weight){
                setWeightValue(d.weight);
            }
            if(d.height){
                setHeightValue(d.height);
            }
            if(d.birthDay){
                setBirthDate(new Date(d.birthDay));
            }
        }
    }, []);


    const onNameChange = text => {
        setName(text);
    }

    const onMmChange = (text) => {
        if(!isNaN(text) && text>=0){
            setMm(text);
        }
    }

    const onUrineLevelChange = (text) => {
        if(!isNaN(text) && text<15 && text>=0){
            setUrineLevelValue(text);
        }
    }

    const onWeightChange = (text) => {
        if(!isNaN(text) && text>=0){
            setWeightValue(text)
        }
    }

    const onHeightChange = (text) => {
        if(!isNaN(text) && text>=0){
            setHeightValue(text);
        }
    }

    const onHgChange = (text) => {
        if(!isNaN(text) && text>=0){
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




    const onSave = () => {
        saveData({
            dueDate: Date.parse(dueDate.toISOString().substr(0, 10)),
            name: name.trim(),
            birthDay: Date.parse(birthDate.toISOString().substr(0, 10)),
            bloodPressure: {
                mm: mm.trim(),
                hg: hg.trim()
            },
            urineLevel: urineLevel.trim(),
            weight: weight.trim(),
            height: height.trim()
        });
    }

    return (
        <Animatable.View style={styles.container} animation={'fadeIn'}>
            <View style={styles.header}>
                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={img}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Name</Text>
                            {
                                name.trim() !== '' ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={20}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={20}/>
                                    </Animatable.View>
                            }
                        </View>

                        <View style={styles.buttonShadow}>
                            <TextInput onChangeText={onNameChange} value={name} placeholder={'Name'} style={styles.input}/>
                        </View>

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Due Date</Text>
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
                        <TouchableOpacity onPress={showDatepicker}>
                            <View style={styles.buttonShadow}>
                                <Text style={[styles.input, {padding: 15}]}>
                                    {dueDate.toString().substr(0, 15)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Blood Pressure (mm, hg)</Text>
                            {
                                checkBloodPressure() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={20}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={20}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.buttonShadow}>
                            <View style={[styles.input, {flexDirection: 'row', paddingLeft: 20}]}>
                                <TextInput onChangeText={onMmChange} value={mm} placeholder={'MM'} style={styles.value}/>
                                <Text style={{fontSize: 20, color: '#bbbbbb'}}>|</Text>
                                <TextInput onChangeText={onHgChange} value={hg} placeholder={'Hg'} style={styles.value}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Urine Level (ph)</Text>
                            {
                                checkUrineLevel() ?
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'check-circle'} color={colors.thirdColor} size={20}/>
                                    </Animatable.View> :
                                    <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                        <Feather name={'x-circle'} color={'#f00'} size={20}/>
                                    </Animatable.View>
                            }
                        </View>
                        <View style={styles.buttonShadow}>
                            <TextInput onChangeText={onUrineLevelChange} value={urineLevel} placeholder={'Urine Level'} style={styles.input}/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={[styles.inputContainer, {marginRight: 2}]}>
                            <View style={styles.title}>
                                <Text style={styles.text}>Weight (kg)</Text>
                                {
                                    checkWeight() ?
                                        <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                            <Feather name={'check-circle'} color={colors.thirdColor} size={20}/>
                                        </Animatable.View> :
                                        <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                            <Feather name={'x-circle'} color={'#f00'} size={20}/>
                                        </Animatable.View>
                                }
                            </View>
                            <View style={styles.buttonShadow}>
                                <TextInput onChangeText={onWeightChange} value={weight} placeholder={'Weight'} style={styles.input}/>
                            </View>
                        </View>
                        <View style={{width: 5}}></View>
                        <View style={[styles.inputContainer, {marginLeft: 2}]}>
                            <View style={styles.title}>
                                <Text style={styles.text}>Height (cm)</Text>
                                {
                                    checkHeight() ?
                                        <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                            <Feather name={'check-circle'} color={colors.thirdColor} size={20}/>
                                        </Animatable.View> :
                                        <Animatable.View animation={'bounceIn'} style={styles.icon}>
                                            <Feather name={'x-circle'} color={'#f00'} size={20}/>
                                        </Animatable.View>
                                }
                            </View>
                            <View style={styles.buttonShadow}>
                                <TextInput onChangeText={onHeightChange} value={height} placeholder={'Height'} style={styles.input}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity disabled={name===''} onPress={() => onSave()}>
                    <LinearGradient colors={gradientColors} style={[styles.buttonShadow, {
                        margin: 15,
                        marginBottom: 20
                    }]}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Save</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    },
    header: {
        flex: 1
    },
    footer: {

    },
    inputContainer: {
        margin: 10,
        flex: 1
    },
    input: {
        backgroundColor: colors.secondaryColor,
        borderRadius: 50,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.thirdColor
    },
    button: {
        padding: 15
    },
    buttonTitle: {
        color: colors.secondaryColor,
        textAlign: "center"
    },
    valueContainer: {
        flexDirection: 'row',
        backgroundColor: colors.secondaryColor
    },
    value: {
        flex: 1,
        padding: 0,
        paddingLeft: 10
    },
    text: {
        color: colors.thirdColor,
        fontSize: 17,
        fontWeight:'bold'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20
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
})
