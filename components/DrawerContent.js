import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking, Alert} from 'react-native';
import {Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {colors, gradientColors} from "../assets/statics";
import profile_pic from '../assets/images/logo1.png'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {StoreContext} from "./context";
import Tts from "react-native-tts";
import LinearGradient from "react-native-linear-gradient";

export default function DrawerContent(props) {

    const [data, setData] = React.useState({});
    const {retrieveData} = React.useContext(StoreContext);

    React.useEffect(async () => {
        const d = await retrieveData();
        await setData(d);
    }, [])

    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSd3GujuheZLF0hHeBXumnTjZpqg1pigSzkrVKkVdOIQm6cWYg/viewform?usp=sf_link'

    const handlePress = React.useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return(
        <View style={{flex:1, backgroundColor: colors.primaryColor}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <Image style={styles.pic} source={profile_pic} size={50}/>
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                    <Drawer.Section
                        style={styles.drawerSection}
                        activeTintColor={colors.thirdColor}
                        activeBackgroundColor={colors.thirdColor}
                    >
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="home" color={colors.thirdColor} size={size} />
                            )}
                            label="Home"
                            onPress={() => {
                                Tts.stop();
                                props.navigation.navigate('Home');
                            }}
                            labelStyle={styles.labelStyle}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="format-list-checks" color={colors.thirdColor} size={size} />
                            )}
                            label="My Birth Plan"
                            onPress={() => {
                                Tts.stop();
                                props.navigation.navigate('ToDoList');
                            }}
                            labelStyle={styles.labelStyle}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="format-list-checkbox" color={colors.thirdColor} size={size} />
                            )}
                            label="Exercises"
                            onPress={() => {
                                Tts.stop();
                                props.navigation.navigate('Exercises');
                            }}
                            labelStyle={styles.labelStyle}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="account" color={colors.thirdColor} size={size} />
                            )}
                            label="Profile"
                            onPress={() => {
                                Tts.stop();
                                props.navigation.navigate('Profile');
                            }}
                            labelStyle={styles.labelStyle}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <TouchableOpacity onPress={handlePress}>
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <LinearGradient colors={gradientColors} style={styles.buttonShadow}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.secondaryColor,
                                width: 200,
                                borderRadius: 50,
                                padding: 8
                            }}>Feedback</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={{fontFamily: 'Satisfy-Regular', fontSize: 13, color: colors.thirdColor, textAlign: 'center'}}>
                        Faculty of Computing and Technology {'\n'} University of Kelaniya
                    </Text>
                </View>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        marginTop: 0,
        padding: 20,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginTop: 25,
        fontWeight: 'bold',
        color: colors.thirdColor
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    pic: {
        marginTop: 30,
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: colors.thirdColor,
    },
    footer: {
        alignItems: 'center',
    },
    labelStyle: {
        color: colors.thirdColor
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
