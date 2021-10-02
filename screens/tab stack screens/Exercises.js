import React from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from "../../assets/statics";
import Slide from "../../components/Slide";
import {exercises} from "../../assets/exercises";
import Tts from "react-native-tts";
import * as Animatable from 'react-native-animatable'
import BackHandler from "react-native/Libraries/Utilities/BackHandler";

const Exercises = ({navigation}) => {

    const [page, setPage] = React.useState(0);

    const [isFinish, setIsFinish] = React.useState(false);

    React.useEffect(() => {
        const backAction = () => {
            Tts.stop();
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    const next = () => {
        setPage(page+1);
    }

    const prev = () => {
        setPage(page-1);
    }

    const finish = () => {
        Tts.stop();
        setIsFinish(true);
        setPage(0);
        Tts.speak('Congratulations, Yo have completed all the workouts', {
            androidParams: {
                // KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
        setTimeout(() => {
            navigation.navigate('Home');
            setIsFinish(false);
        }, 3000);
        setTimeout(() => Tts.stop(), 4390 );
    }

    if(isFinish){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primaryColor
            }}>
                <Image source={require('../../assets/images/icegif-2710-unscreen.gif')}/>
                <Animatable.Text
                    style={styles.text}
                    animation={'bounceInUp'}
                    duration={2000}
                >
                    Congratulations! 🥳
                </Animatable.Text>
                <Animatable.Text
                    animation={'bounceInUp'}
                    duration={2000}
                    style={[styles.text, {
                        fontSize: 20,
                        fontWeight: 'normal',
                        textAlign: 'center',
                        padding: 20
                    }]}
                >
                    You have successfully completed workout schedule
                </Animatable.Text>
            </View>
        )
    }

    return (
        <Slide
            item={exercises[page]}
            next={next}
            prev={prev}
            isPrev={ page > 0 }
            isNext={ page < exercises.length - 1 }
            finish={finish}
            navigation={navigation}
        />
    )
}

export default Exercises;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    },
    text: {
        fontFamily: 'sans-serif-medium',
        color: colors.thirdColor,
        fontSize: 30,
        fontWeight: 'bold',
        // fontStyle: 'italic'
    }
});
