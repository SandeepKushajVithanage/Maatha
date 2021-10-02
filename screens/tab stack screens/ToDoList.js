import React from "react";
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button} from "react-native";
import {colors} from "../../assets/statics";
import Task from "../../components/Task";
import Icon from 'react-native-vector-icons/Ionicons'
import {StoreContext} from "../../components/context";
import * as Animatable from 'react-native-animatable';

const ToDoList = () => {

    const [input, setInput] = React.useState('');
    const [items, setItems] = React.useState([]);

    const {retrieveToDo, addToDo, updateToDo, clearToDo} = React.useContext(StoreContext);

    React.useEffect(async () => {
        const data = await retrieveToDo();
        if(data!==null){
            setItems(data);
        }else{
            addToDo([]);
        }
    }, [])

    const onDeleteItem = id => {
        const newList = items.filter((item) => item.id !== id);
        setItems(newList);
        updateToDo(newList);
    }

    const onAddItem = () => {
        if(input.trim()!==''){
            const newArray = [...items , {id : Date.now(), text: input, completed: false}];
            setItems(newArray);
            updateToDo(newArray);
            setInput('');
        }
    }

    const onCompleteItem = (id) => {
        const newList = items.map((item) => {
            if (item.id === id) {
                const updatedItem = {
                    ...item,
                    completed: true,
                };
                return updatedItem;
            }
            return item;
        });
        setItems(newList);
        updateToDo(newList);
    }

    const renderItem = ({item}) => {
        return <Task item={item} onDelete={onDeleteItem} onComplete={onCompleteItem}/>
    }

    return (
        <View style={styles.container}>
            {
                items.length === 0 ?
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text}>Tap on</Text>
                            <Icon name={'add-circle-outline'} size={35} color={colors.thirdColor}/>
                            <Text style={styles.text}>to add plans</Text>
                        </View>
                        <Animatable.View
                            animation={'bounceIn'}
                            iterationCount={'infinite'}
                            duration={4000}
                            easing={'ease-in-out'}
                            delay={1000}
                        >
                            <Icon name={'arrow-down'} size={100} color={colors.thirdColor}/>
                        </Animatable.View>
                    </View> :
                    <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} style={styles.list}/>
            }
            <View style={styles.input}>
                <View style={{ flex: 1, width: '90%' }}>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder={'Type your next task'}
                        onChangeText={text => setInput(text)}
                        value={input}
                    />
                </View>
                <TouchableOpacity onPress={onAddItem}>
                    <Icon name={'add-circle-outline'} size={40} color={colors.thirdColor}/>
                </TouchableOpacity>
            </View>
            {/*<Button onPress={() => clearToDo()} title={'Remove All'}/>*/}
        </View>
    );
}

export default ToDoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        alignItems: 'stretch',
    },
    list: {
        flex: 1,
        marginTop: 10
    },
    input: {
        backgroundColor: colors.secondaryColor,
        margin: 5,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 7,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: colors.thirdColor,
        fontSize: 25,
        margin: 10,
        fontWeight: 'bold'
    }
})
