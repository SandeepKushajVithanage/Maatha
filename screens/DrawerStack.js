import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "./tab stack screens/Home";
import Notifications from "./tab stack screens/Notifications";
import Profile from "./tab stack screens/Profile";
import ToDoList from "./tab stack screens/ToDoList";
import {colors, day, today} from "../assets/statics";
import DrawerContent from "../components/DrawerContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, TouchableOpacity, View} from "react-native";
import Exercises from "./tab stack screens/Exercises";
import EditProfile from "./tab stack screens/EditProfile";
import AboutUs from "./tab stack screens/AboutUs";
import {StoreContext} from "../components/context";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {

    const {retrieveData} = React.useContext(StoreContext);
    const [dates, setDates] = React.useState(100);

    React.useEffect(async () => {
        const data = await retrieveData();
        const d = (today - (data.dueDate - day * 7 * 38)) / day;
        setDates(d);
    }, [])

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: true,
                    title: 'Maatha', //'මාතා'
                    headerTintColor: colors.secondaryColor,
                    headerStyle: {
                        backgroundColor: colors.thirdColor
                    },
                    headerRight: () => {
                        return (
                            <View style={{
                                margin: 2,
                                marginRight: 10,
                                // borderColor: colors.secondaryColor,
                                // borderWidth: 2,
                                // borderRadius: 10
                            }}>
                                <Text style={{
                                    color: colors.secondaryColor,
                                    padding: 5,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>My baby's age {dates} days</Text>
                            </View>
                        )
                    }
                }}
            />
            <Drawer.Screen
                name="ToDoList"
                component={ToDoList}
                options={{
                    headerShown: true,
                    title: 'My Birth Plan',
                    headerTintColor: colors.secondaryColor,
                    headerStyle: {
                        backgroundColor: colors.thirdColor
                    }
                }}
            />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen
                name="Exercises"
                component={Exercises}
                options={{
                    headerShown: false
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    headerShown: true,
                    headerTintColor: colors.secondaryColor,
                    headerStyle: {
                        backgroundColor: colors.thirdColor
                    }
                }}
            />
            <Drawer.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    title: 'Update Profile',
                    headerShown: true,
                    headerTintColor: colors.secondaryColor,
                    headerStyle: {
                        backgroundColor: colors.thirdColor
                    }
                }}
            />
            <Drawer.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: 'About Us',
                    headerShown: true,
                    headerTintColor: colors.secondaryColor,
                    headerStyle: {
                        backgroundColor: colors.thirdColor
                    }
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack;


