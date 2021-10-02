import React, {useEffect} from "react";
import {Dimensions} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "./tab stack screens/Home";
import Notifications from "./tab stack screens/Notifications";
import Profile from "./tab stack screens/Profile";
import ToDoList from "./tab stack screens/ToDoList";

import {colors} from "../assets/statics";

const Tab = createMaterialBottomTabNavigator();

const TabStack = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={colors.secondaryColor}
            inactiveColor={colors.primaryColor}
            barStyle={{
                height:65,
                justifyContent:'center',
                paddingVertical:15,
                backgroundColor:colors.thirdColor,
                elevation:2
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ToDoList"
                component={ToDoList}
                options={{
                    tabBarLabel: 'To Do',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabStack;


