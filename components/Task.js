import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {colors} from "../assets/statics";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

const Task = ({item, onDelete, onComplete}) => {
    const [view, setView] = React.useState(false);

    const onTaskClick = () => {
        setView(!view);
    }

    return (
        <TouchableOpacity
            onPress={onTaskClick}
            style={[styles.container, {
                backgroundColor: item.completed ? colors.primaryColor : colors.secondaryColor,
                paddingBottom: view ? 5 : 15
            }]}
        >
            <View style={styles.task}>
                <Text style={styles.text}>{item.text}</Text>
                {
                    item.completed ?
                        <MaterialCommunityIcons name="checkbox-marked-circle-outline" color={colors.thirdColor} size={30} /> :
                        <MaterialCommunityIcons name="exclamation" color={colors.thirdColor} size={30} />
                }
            </View>
            <Text style={styles.time}>{moment.utc(new Date(item.id)).local().startOf('seconds').fromNow()}</Text>
            {view ?
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#f00'}]}
                                  onPress={() => onDelete(item.id)}
                >
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
                { item.completed ? <></> :
                    <>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: colors.thirdColor}]}
                            onPress={() => onComplete(item.id)}
                        >
                            <Text style={styles.btnText}>Complete</Text>
                        </TouchableOpacity>
                    </>
                }
            </View> : <></>
            }
        </TouchableOpacity>
    );
}
export default Task;

const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        padding: 15,
        borderColor: colors.secondaryColor,
        borderWidth: 1
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: colors.thirdColor,
        maxWidth: '90%'
    },
    button: {
        flex: 1,
        borderRadius: 50,
        margin: 5
    },
    buttonContainer: {
        // marginTop: 5,
        flexDirection: 'row'
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    time: {
        marginTop: 5,
        fontSize: 12
    }
});
