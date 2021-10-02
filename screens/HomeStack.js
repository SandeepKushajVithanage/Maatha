import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./tab stack screens/Home";
import Notifications from "./tab stack screens/Notifications";
import Profile from "./tab stack screens/Profile";
import ToDoList from "./tab stack screens/ToDoList";

const Stack = createNativeStackNavigator();

const HomeStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ToDoList"
                component={ToDoList}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack;


