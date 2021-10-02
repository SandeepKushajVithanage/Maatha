import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import img from "../assets/image.png";

const QuestionLayout = ({props}) => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={img}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.question}>
                    <Text style={styles.title}>Due Date?</Text>
                    <View style={styles.buttonContainer}>
                        {{ props }}
                    </View>
                    <View style={styles.navigateContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Name')}
                        >
                            <Text style={styles.next}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Name')}
                        >
                            <Text style={styles.next}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QuestionLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcc9ee',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        padding: 10,
    },
    title: {
        color: '#ff0094',
        fontWeight: 'bold',
        fontSize: 25
    },
    question: {
        margin: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    next: {
        width: 50,
        height: 20,
        paddingTop: 0,
        backgroundColor: '#ff0094',
        textAlign: 'center',
        color: '#fff',
        borderRadius: 10,
        alignItems: 'flex-end',
    },
    navigateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        margin: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        width: 250
    }
});
