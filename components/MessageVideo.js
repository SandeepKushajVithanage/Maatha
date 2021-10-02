import React from "react";
import {TouchableOpacity, View} from "react-native";
import Video from "react-native-video";
import AntDesign from "react-native-vector-icons/AntDesign";
import {colors} from "../assets/statics";

const MessageVideo = ({props}) => {
    const videoPlayer = React.useRef(null);
    const [isPlay, setIsPlay] = React.useState(false);

    const { currentMessage } = props;
    return (
        <View style={{ padding: 5 }}>
            {
                isPlay ?
                    <TouchableOpacity onPress={() => setIsPlay(false)}>
                        <Video
                            style={{ height: 140, width: 280, borderRadius: 5}}
                            source={currentMessage.video}
                            ref={(ref) => {
                                videoPlayer.current = ref
                            }}
                            resizeMode={'cover'}// Store reference
                        />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => setIsPlay(true)}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                            backgroundColor: colors.thirdColor,
                            height: 140, width: 280, borderRadius: 5
                        }}>
                            <AntDesign name={'caretright'} size={40} color={colors.primaryColor}/>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    );
};

export default MessageVideo;
