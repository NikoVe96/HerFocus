import { View, TouchableOpacity, Image, Text, TextInput, Button, Alert, List, SafeAreaView, ScrollView, StyleSheet, Modal } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusSquare, faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const AddTask = ({ navigation }) => {

    const [taskName, setTaskName] = useState('');
    const [taskRoutine, setTaskRoutine] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskStartTime, setStartTime] = useState('');
    const [taskEndTime, setEndTime] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [username, setUsername] = useState('');
    const [ID, setID] = useState('');
    // query routines in list from database
    const [routines, setRoutines] = useState([]);
    // + add button at the end to add new routine
    const [openRoutine, setOpenRoutine] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [newRoutine, setNewRoutine] = useState('');
    const [color, setColor] = useState('');
    const [recent, setRecent] = useState([]);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [emoji, setEmoji] = useState();
    const taskCategories = [
        { label: 'Mental health', value: 'mental health', color: 'lightgreen' },
        { label: 'House chore', value: 'house chores', color: 'pink' },
        { label: 'Personal chore', value: 'personal chore', color: 'lightyellow' },
        { label: 'Work related chores', value: 'work related chores', color: 'lavender' },
    ]

    useEffect(() => {
        async function getCurrentUser() {
            if (username === '') {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser !== null) {
                    setUsername(currentUser.getUsername());
                    setID(currentUser.id);
                    routineList();
                }
            }
        }
        getCurrentUser();
    }, [username]);

    async function routineList() {
        let UserRoutineQuery = new Parse.Query('Routine');
        UserRoutineQuery.contains('user', ID);
        let Results = await UserRoutineQuery.find();

        const routinesData = Results.map(result => ({
            key: result.id,
            label: result.get('name'),
            value: result.get('name')
        }));

        routinesData.push({
            label: '+ Add a new routine',
            value: 'new routine',
        });
        setRoutines(routinesData);
    }

    async function NewRoutineAdded() {
        let UserRoutineQuery = new Parse.Query('Routine');
        UserRoutineQuery.contains('user', ID);
        UserRoutineQuery.descending('createdAt')
        UserRoutineQuery.first();
        let Results = await UserRoutineQuery.find();
        setNewRoutine(Results);
    }

    async function newTask() {
        try {
            const newTask = new Parse.Object('Task');
            const currentUser = await Parse.User.currentAsync();

            //If routine chosen, fill

            newTask.set('name', taskName);
            newTask.set('connectedRoutine', taskRoutine);
            newTask.set('date', taskDate);
            newTask.set('startTime', taskStartTime);
            newTask.set('endTime', taskEndTime);
            newTask.set('emoji', emoji);
            newTask.set('user', currentUser);
            // If time, add recurring option
            await newTask.save();
            console.log('Success: task saved')
            Alert.alert('A new task has been added to your calendar!')
            clearInput();
        } catch (error) {
            console.log('Error saving new task: ', error);
        }
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        let month;

        switch (date.getMonth()) {
            case 0:
                month = 'Jan'
                break;
            case 1:
                month = 'Feb'
                break;
            case 2:
                month = 'Mar'
                break;
            case 3:
                month = 'Apr'
                break;
            case 4:
                month = 'May'
                break;
            case 5:
                month = 'Jun'
                break;
            case 6:
                month = 'Jul'
                break;
            case 7:
                month = 'Aug'
                break;
            case 8:
                month = 'Sep'
                break;
            case 9:
                month = 'Oct'
                break;
            case 10:
                month = 'Nov'
                break;
            case 11:
                month = 'Dec'
                break;
            default:
                break;
        }
        setTaskDate(date.getDate()
            + ' ' + month
            + ' ' + date.getFullYear())
        hideDatePicker();
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (date) => {
        setStartTime(date.getHours()
            + ':' + date.getMinutes())
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleEndTimeConfirm = (date) => {
        setEndTime(date.getHours()
            + ':' + date.getMinutes())
        hideEndTimePicker();
    };

    function clearInput() {
        setTaskName('');
        setTaskRoutine('');
        setStartTime(null);
        setEndTime(null);
        setTaskDate('');
    }

    function showEmojiModal() {
        setEmojiModalVisible(true);
    }

    function hideEmojiModal() {
        setEmojiModalVisible(false);
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Add new task </Text>
                <View style={{ borderWidth: 1, borderColor: 'black', width: 300, alignSelf: 'center', marginTop: 10 }}></View>
            </View>
            <View style={{
                alignContent: 'center',

                paddingHorizontal: 16,
            }}>
                <View>
                    <Text style={{ marginVertical: 16 }}>
                        Name your task
                    </Text>
                    <TextInput
                        style={{ padding: 8, backgroundColor: 'white' }}
                        onChangeText={text => setTaskName(text)}
                        value={taskName}
                    />
                </View>
                <View>
                    <Text style={{ marginVertical: 16 }} >Choose a color</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#FAEDCB' }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#C9E4DE' }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#C6DEF1' }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#DBCDF0' }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#FFADAD' }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, width: 40, height: 40, backgroundColor: '#FFD6A5' }}></TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <Text style={{ marginVertical: 10 }}>
                            Connect a routine
                        </Text>
                        <DropDownPicker
                            // Consider using a select list instead, to get a search function
                            style={{ marginVertical: 5 }}
                            open={openRoutine}
                            value={taskRoutine}
                            items={routines}
                            setOpen={setOpenRoutine}
                            // Make a query that retrieves the latest routine to display
                            setValue={(value) => setTaskRoutine(value)}
                            placeholder='Choose a routine'
                            onChangeValue={(value) => {
                                if (value === 'new routine') {
                                    navigation.navigate('Add routine');
                                    NewRoutineAdded();
                                }
                                setTaskRoutine(value)
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <Text style={{ marginVertical: 10 }}>
                            Task category
                        </Text>
                        <DropDownPicker
                            style={{ marginVertical: 5 }}
                            open={openCategory}
                            value={taskCategory}
                            items={taskCategories}
                            setOpen={setOpenCategory}
                            setValue={(value) => setTaskCategory(value)}
                            placeholder='Choose a category'
                            onChangeValue={(value) => {
                                setTaskCategory(value)
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 5, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={showEmojiModal} style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5, width: 150, height: 40, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Emoji picker</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={emojiModalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={hideEmojiModal} // This is to handle the hardware back button on Android
                    >
                        <View style={styles.modalContainer}>
                            <EmojiPicker
                                emojis={emojis}
                                recent={recent}
                                loading={false}
                                darkMode={false}
                                perLine={6}
                                onSelect={chosenEmoji => {
                                    console.log(chosenEmoji);
                                    setEmoji(chosenEmoji.emoji);
                                    hideEmojiModal(); // Optionally close modal upon selection
                                }}
                                onChangeRecent={setRecent}
                            // Add any additional props you need for EmojiPicker here
                            />
                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: '100%', height: '8%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={{ padding: 10 }}></View>
                    <Text>Emoji: {emoji}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5, width: 150, height: 40, alignItems: 'center' }}
                        onPress={showStartTimePicker}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select start time</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        onConfirm={handleStartTimeConfirm}
                        onCancel={hideStartTimePicker}
                    />
                    <View style={{ padding: 10 }}></View>
                    <Text style={{ flex: 1 }}>
                        {taskStartTime === null ? 'Start time: ' : `Start time: ${taskStartTime}`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5, width: 150, height: 40, alignItems: 'center' }}
                        onPress={showEndTimePicker}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select end time</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleEndTimeConfirm}
                        onCancel={hideEndTimePicker}
                    />
                    <View style={{ padding: 10 }}></View>
                    <Text style={{ flex: 1 }} >
                        {taskEndTime === null ? 'End time: ' : `End time: ${taskEndTime}`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5, width: 150, height: 40, alignItems: 'center' }}
                        onPress={showDatePicker}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select date</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                    />
                    <View style={{ padding: 10 }}></View>
                    <Text style={{ flex: 1 }}
                    // Insert if statement to test if value is null, if so, render text without variable
                    >
                        {`Date: ${taskDate}`}
                    </Text>
                </View>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, width: 350, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={newTask}>
                    <FontAwesomeIcon icon={faPlusSquare} size={30} style={{ marginHorizontal: 10 }} />
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Add new task</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pickerButton: {
        backgroundColor: "#007bff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 30
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        width: "150",
        maxHeight: "100",
    },
});

export default AddTask;