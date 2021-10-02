import React from "react";
import {View, Text, Button, StyleSheet, ScrollView, Image, Alert, TouchableOpacity} from "react-native";
import {StoreContext} from "../../components/context";
import {colors, day, getPeriod, gradientColors, month, today, week} from "../../assets/statics";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import img from '../../assets/images/logo1.png'
import LinearGradient from "react-native-linear-gradient";

const Profile = ({navigation}) => {
    const {clearData, retrieveData} = React.useContext(StoreContext);
    const [data, setData] = React.useState({});

    React.useEffect(async () => {
        const d = await retrieveData()
        await setData(d);
    }, []);

    const onClear = () => {
        clearData();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'flex-end',
                    margin: 10
                }}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Your all data will be reset', // <- this part is optional, you can pass an empty string
                            [
                                {text: 'Cancel', onPress: () => {}},
                                {text: 'Clear', onPress: () => onClear()},
                            ],
                            {cancelable: true},
                        );
                    }}>
                        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                            <Text style={{
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderRadius: 50,
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>Clear Data</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.dataContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={img}/>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>User Information</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                            <MaterialCommunityIcons
                                name="account-edit"
                                color={colors.thirdColor}
                                size={28}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.tag}>Name </Text>
                    <Text style={styles.value}>{data.name}</Text>
                    <Text style={styles.tag}>Due Date</Text>
                    <Text style={styles.value}>{new Date(data.dueDate).toString().substr(0,15)}</Text>
                    <Text style={styles.tag}>Birth Date</Text>
                    <Text style={styles.value}>{new Date(data.birthDay).toString().substr(0,15)}</Text>
                    {
                        data.bloodPressure && data.bloodPressure.mm && data.bloodPressure.hg ?
                            <>
                                <Text style={styles.tag}>Blood Pressure</Text>
                                <Text style={styles.value}>{data.bloodPressure.mm}/{data.bloodPressure.hg} mmHg</Text>
                            </> : <></>
                    }
                    {
                        data.urineLevel ?
                            <>
                                <Text style={styles.tag}>Urine Level</Text>
                                <Text style={styles.value}>{data.urineLevel} ph</Text>
                            </> : <></>
                    }
                    {
                        data.weight ?
                            <>
                                <Text style={styles.tag}>Weight</Text>
                                <Text style={styles.value}>{data.weight} Kg</Text>
                            </> : <></>
                    }
                    {
                        data.height ?
                            <>
                                <Text style={styles.tag}>Height</Text>
                                <Text style={styles.value}>{data.height} mm</Text>
                            </> : <></>
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.primaryColor
    },
    header: {
        flex: 1
    },
    dataContainer: {
        margin: 10
    },
    tag: {
        color: colors.thirdColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    value: {
        textAlign: 'right',
        color: colors.thirdColor,
        // color: Statics.thirdColor
        // fontWeight: 'bold'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        color: colors.thirdColor
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.thirdColor
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
        elevation: 10
    }
});
