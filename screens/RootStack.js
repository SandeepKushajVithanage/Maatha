import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./root stack screens/Welcome";
import Questions from "./root stack screens/Questions";

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false,
                    title: 'Welcome page',
                }}
            />
            <Stack.Screen
                name="Questions"
                component={Questions}
                options={{
                    headerShown: false,
                    title: 'Questions',
                }}
            />
        </Stack.Navigator>
    )
}

export default RootStack;
