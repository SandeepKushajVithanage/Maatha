import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image, Text, Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat'
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
import {colors, gradientColors} from "../../assets/statics";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {ChatBot} from "../../components/ChatBot";
import {StoreContext} from "../../components/context";
import MessageVideo from "../../components/MessageVideo";
import mic from '../../assets/images/mic_img.gif'
import LinearGradient from "react-native-linear-gradient";

const Home = ({navigation}) => {
    const {retrieveData, retrieveToDo} = React.useContext(StoreContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [data, setData] = React.useState({});
    const [inputText, setInputText] = React.useState('');

    React.useEffect(async () => {

        const d = await retrieveData();
        await setData(d);
        setMessages([
            {
                _id: 1,
                text: 'Hello '+ d.name + '\nHow are you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                },
                //image: "data:image/jpeg;base64,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"
            },
        ]);
        Voice.destroy()
        Voice.removeAllListeners;
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        setTimeout(() => {
            Tts.speak('Hello '+ d.name + '\nHow are you?', {
                androidParams: {
                    // KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 1000)

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            setIsLoading(false);
        }
    }, [])

    const cancel = () => {
        setIsLoading(false);
        stopRecording();
        return true;
    };

    const stopRecording = async () => {
        try {
            await Voice.stop()
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const onSpeechStartHandler = (event) => {
        setIsLoading(true);
    }

    const onSpeechEndHandler = (event) => {
        setIsLoading(false);
        stopRecording().then(r => {});
    }

    const onSpeechResultsHandler = (event) => {
        setIsLoading(false);
        setInputText(event.value[0]);
        const d = [{
                _id: Date.now().toString(), createdAt: new Date(), text: event.value[0], user: {_id: 1}
            }]
        onSend(d);
    }

    const startRecording = async () => {
        try {
            await Voice.start('en-Us')
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const customtInputToolbar = props => {

        // if(isLoading){
        //     return (
        //         <TouchableOpacity onPress={() => cancel()}>
        //             <View style={{alignItems: 'center', justifyContent: 'center'}}>
        //                 {/*<ActivityIndicator size={25} color={colors.thirdColor} style={styles.mic}/>*/}
        //                 <Image source={mic} style={{
        //                     marginTop: 0,
        //                     paddingTop: 0,
        //                     width: 80, height: 80
        //                 }}/>
        //             </View>
        //         </TouchableOpacity>
        //     )
        // }

        return (

            <LinearGradient colors={['#d500ff', '#610272']} style={{
                height: (windowHeight)/2,
                justifyContent: "center",
                alignItems: 'center',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderWidth: 1,
                borderColor: colors.primaryColor,
                borderBottomWidth: 0
            }}>
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                }}>
                    {
                        isLoading ?
                            <TouchableOpacity onPress={cancel}>
                                <Image source={mic} style={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                    width: 150, height: 150
                                }}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={startRecording}>
                                <LinearGradient colors={gradientColors} style={styles.micBorder}>
                                    <Icon name={'microphone'} style={styles.mic} size={28} color={colors.secondaryColor}/>
                                </LinearGradient>
                            </TouchableOpacity>
                    }
                </View>
                <View style={styles.textContainer}>

                    {
                        isLoading ?
                            <Text style={{
                                color: colors.secondaryColor,
                                textAlign: 'center',
                                fontSize: 25,
                                fontFamily: 'BalsamiqSans-Regular',
                            }}>
                                Listening...  🤔
                            </Text> : inputText === '' ?
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: colors.secondaryColor,
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontFamily: 'BalsamiqSans-Regular',
                                }}>
                                    Tap on
                                </Text>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 25,
                                    borderWidth: 2,
                                    borderColor: colors.secondaryColor,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name={'microphone'} size={25} color={colors.secondaryColor}/>
                                </View>

                                <Text style={{
                                    color: colors.secondaryColor,
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontFamily: 'BalsamiqSans-Regular',
                                }}>
                                    to speak !
                                </Text>
                            </View>
                                :
                                <Text style={{
                                    color: colors.secondaryColor,
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontFamily: 'BalsamiqSans-Regular',
                                }}>
                                    🗣️ "{inputText}"
                                </Text>
                    }

                </View>
            </LinearGradient>
            // <InputToolbar
            //     {...props}
            //     containerStyle={{
            //         backgroundColor: colors.secondaryColor,
            //         padding: 7,
            //         paddingRight: 10,
            //         borderRadius: 50,
            //         margin: 5,
            //         minHeight: 50,
            //         marginBottom: 10
            //     }}
            // />
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: colors.secondaryColor
                    },
                    right: {
                        backgroundColor: colors.thirdColor,
                        colors: colors.thirdColor
                    }
                }}
                textStyle={{
                    left: {
                        color: colors.thirdColor
                    },
                    right: {
                        color: colors.primaryColor
                    }
                }}
            />
        )
    }

    const renderAvatar = () => {
        return (
            <Image
                source={require('../../assets/pp.png')}
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    shadowColor: colors.thirdColor,

                }}
            />
        )
    }

    const renderSend = (props) => {

        if(!props.text.trim()){
            if(isLoading){
                return <></>
            }return (
                <TouchableOpacity onPress={startRecording}>
                    <Icon name={'microphone'} style={styles.mic} size={28} color={colors.thirdColor}/>
                </TouchableOpacity>
            );
        }

        return (
            <Send
                {...props}
                containerStyle={{
                    padding: 0
                }}
            >
                <MaterialCommunityIcons
                    name={'send-circle'}
                    size={40}
                    style={styles.send}
                    color={colors.thirdColor}/>
            </Send>
        )
    }

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name={'angle-double-down'} size={25} color={colors.thirdColor}/>
        )
    }
    const onSend = React.useCallback( async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const reply = await ChatBot({
            text: messages[0].text,
            navigation: navigation,
            data: retrieveData,
            toDo: retrieveToDo
        });
        setTimeout(() => {
            let replyMsg = [
                {_id: Date.now().toString(), createdAt: new Date(), text: reply.text,
                    user: {
                        _id: 2,
                        name: 'React Native',
                    }
                }
            ]
            if (reply.video){
                replyMsg[0].video = reply.video;
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, replyMsg));
            Tts.speak(reply.text.slice(0, -1), {
                androidParams: {
                    KEY_PARAM_VOLUME: 1,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, 1000)

        if(reply.link){
            setTimeout(() => {
                let replyMsg = [
                    {_id: Date.now().toString(), createdAt: new Date(), text: reply.link,
                        user: {
                            _id: 2,
                            name: 'React Native',
                        }
                    }
                ]
                setMessages(previousMessages => GiftedChat.append(previousMessages, replyMsg));
            }, 1500)
        }

        if(reply.ans){
            setTimeout(() => {
                let replyMsg = [
                    {_id: Date.now().toString(), createdAt: new Date(), text: reply.ans,
                        user: {
                            _id: 2,
                            name: 'React Native',
                        }
                    }
                ]
                setMessages(previousMessages => GiftedChat.append(previousMessages, replyMsg));
                Tts.speak(reply.ans.slice(0, -1), {
                    androidParams: {
                        KEY_PARAM_VOLUME: 1,
                        KEY_PARAM_STREAM: 'STREAM_MUSIC',
                    },
                });
            }, 4000)
        }
        if(reply.ans2){
            setTimeout(() => {
                let replyMsg = [
                    {_id: Date.now().toString(), createdAt: new Date(), text: reply.ans2,
                        user: {
                            _id: 2,
                            name: 'React Native',
                        }
                    }
                ]
                setMessages(previousMessages => GiftedChat.append(previousMessages, replyMsg));
                Tts.speak(reply.ans2.slice(0, -1), {
                    androidParams: {
                        KEY_PARAM_VOLUME: 1,
                        KEY_PARAM_STREAM: 'STREAM_MUSIC',
                    },
                });
            }, 8000)
        }
    }, [])

    const renderMessageVideo = (props) => <MessageVideo props={props}/>;

    return (
        <View style={styles.container}>
            <View style={styles.result}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderSend={renderSend}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                    renderAvatar={renderAvatar}
                    renderInputToolbar={props => customtInputToolbar(props)}
                    minInputToolbarHeight={(windowHeight)/2}
                    renderMessageVideo={renderMessageVideo}
                />
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        justifyContent: 'flex-end'
    },
    textInputStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 48,
        borderRadius: 20,
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4,
        margin: 10
    },
    result: {
        flex: 1
    },
    send: {
        margin: 0.5,
        marginRight: 2
    },
    mic: {
        margin: 8,
        marginRight: 12,
    },
    micBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textContainer: {
        flex: 1,
        margin: 20,
    }
});
