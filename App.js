import React from "react";
import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
    ImageBackground,
    StatusBar,
    Alert, Image, BackHandler
} from "react-native";
import {ProgressBar} from '@react-native-community/progress-bar-android'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
// import TabStack from "./screens/TabStack";
import RootStack from "./screens/RootStack";
import DrawerStack from "./screens/DrawerStack";
// import HomeStack from "./screens/HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StoreContext} from "./components/context";
import {colors, day, today} from "./assets/statics";
import img from "./assets/background.gif";
import * as Animatable from "react-native-animatable";
import NetInfo from "@react-native-community/netinfo";

const app = () => {

    const scheme = useColorScheme();

    const initialState = {
        isLoading: true,
        details: null,
        isAny: false
    }

    const storeReducer = (prevState, action) => {
        switch(action.type){
            case 'SAVE':
                return {
                    ...prevState,
                    isLoading: false,
                    details: action.data,
                    isAni: true
                }
            case 'CLEAR':
                return {
                    ...prevState,
                    isLoading: false,
                    details: null,
                    isAni: false
                }
            case 'RETRIEVE':
                return {
                    ...prevState,
                    isLoading: false,
                    details: action.data,
                    isAni: false
                }
            case 'ANIOFF':
                return {
                    ...prevState,
                    isAni: false
                }
        }
    }

    const [storeState, dispatch] = React.useReducer(storeReducer, initialState);

    const store = React.useMemo(() => ({
        saveData: async (data) => {
            try{
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.setItem('userData', JSON.stringify(data));
            }catch (e) {
                console.log(e);
            }
            dispatch({type: 'SAVE', data: data});
        },
        clearData: async () => {
            try{
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('toDo');
            }catch (e) {
                console.log(e);
            }
            dispatch({type: 'CLEAR'})
        },
        retrieveData: async () => {
            let userData = {};
            try{
                const data = await AsyncStorage.getItem('userData');
                userData = data != null ? JSON.parse(data) : null;
            }catch (e) {
                console.log(e);
            }
            return userData
        },
        addToDo: async (data) => {
            try{
                await AsyncStorage.setItem('toDo', JSON.stringify(data));
            }catch (e) {
                console.log(e);
            }
        },
        updateToDo: async (data) => {
            try{
                await AsyncStorage.removeItem('toDo');
                await AsyncStorage.setItem('toDo', JSON.stringify(data));
            }catch (e) {
                console.log(e);
            }
        },
        retrieveToDo: async () => {
            let toDo = {};
            try{
                const data = await AsyncStorage.getItem('toDo');
                toDo = data != null ? JSON.parse(data) : null;
            }catch (e) {
                console.log(e);
            }
            return toDo;
        },
        clearToDo: async () => {
            try{
                await AsyncStorage.removeItem('toDo');
            }catch (e) {
                console.log(e);
            }
        }
    }), []);

    React.useEffect(() => {
        NetInfo.addEventListener(state => {
            if(!state.isConnected){
                Alert.alert('Connection Error', 'You have not connected to a network',
                    [
                        { text: "EXIT", onPress: () => BackHandler.exitApp() }
                    ],
                    {
                        cancelable: false,
                    }
                );
            }
        });
        setTimeout(async () => {
            let userData = null;
            try {
                const data = await AsyncStorage.getItem('userData');
                userData = data != null ? JSON.parse(data) : null;
            }catch (e) {
                console.log(e);
            }
            if(userData&&userData.dueDate&&userData.name&&userData.birthDay){
                dispatch({type: 'RETRIEVE', data: userData});
            }else{
                dispatch({type: 'RETRIEVE', data: null});
            }
        }, 1000);
    }, [])

    if(storeState.isAni){
        setTimeout(() => {
            dispatch({type: "ANIOFF"});
        }, 2000)
    }

    if(storeState.isLoading){
    // if(true){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryColor}}>
                {/*<ActivityIndicator size={'large'} color={colors.thirdColor}/>*/}
                <StatusBar
                    backgroundColor={'#610272'}
                    barStyle="light-content"
                />
                <View style={{flex: 1}}>

                </View>
                <Image source={require('./assets/images/logo1.png')} style={{
                    width: 100, height: 100
                }}/>
                <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                    <ProgressBar
                        style={{
                            marginTop: 10,
                            width: 110
                        }}
                        styleAttr="Horizontal"
                        color={colors.thirdColor}
                    />
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                marginBottom: 6,
                                color: colors.thirdColor,
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>
                                MAATHA
                            </Text>
                            <Text style={{color: colors.thirdColor}}>®</Text>
                        </View>

                        <Text style={{
                            textAlign: 'center',
                            color: colors.thirdColor,
                            fontSize: 14,
                            marginBottom: 60,
                            opacity: 0.7
                        }}>
                            The Antenatal Care Mobile Application
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    if(storeState.isAni){
        return (
            <View style={{
                flex: 1,
            }}>
                <StatusBar
                    backgroundColor={'#610272'}
                    barStyle="light-content"
                />
                <ImageBackground source={img} style={styles.backgroundImage}>
                    <Animatable.View animation={'bounceIn'} style={styles.header}>
                        <Text style={styles.title}>Congratulations on your pregnancy!</Text>
                        <Text style={[styles.title, {fontSize: 30}]}>That’s good to hear</Text>
                        <Text style={styles.subTitle}>You have {(storeState.details.dueDate - today) / day} days remaining to see your baby</Text>
                    </Animatable.View>
                    {/*<View style={styles.footer}>*/}

                    {/*</View>*/}
                </ImageBackground>
            </View>
        )
    }

    return (
        <StoreContext.Provider value={store}>
            <StatusBar
                backgroundColor={'#610272'}
                barStyle="light-content"
            />
            <NavigationContainer theme={ scheme==='dark' ? DarkTheme : DefaultTheme }>
                {
                    storeState.details ? <DrawerStack/> : <RootStack/>
                }
            </NavigationContainer>
        </StoreContext.Provider>
    )
}

export default app;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.thirdColor,
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'sans-serif-medium',
        fontStyle: 'italic'

    },
    subTitle: {
        color: colors.thirdColor,
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'sans-serif-medium'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1
    }
})
