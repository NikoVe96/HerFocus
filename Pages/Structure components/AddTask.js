import { View, TouchableOpacity, Image, Text, TextInput, Button, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const AddTask = ({ navigation }) => {

    const [taskName, setTaskName] = useState('');
    const [taskRoutine, setTaskRoutine] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskStartTime, setStartTime] = useState(null);
    const [taskEndTime, setEndTime] = useState(null);
    const [user, setUser] = useState('');
    // query routines in list from database
    const [routines, setRoutines] = useState([
        { label: 'Morning routine', value: 'morning routine' },
        { label: 'Evening routine', value: 'evening routine' },
        { label: 'Clean kitchen', value: 'clean kitchen' },
        { label: 'Shop for dinner', value: 'shop for dinner' },
        { label: <View style={{ marginHorizontal: 10, backgroundColor: 'lightblue', padding: 5, width: 330 }}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>+ Add a new routine</Text></View>, value: 'new routine' }
    ]);
    // + add button at the end to add new routine
    const [open, setOpen] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    async function newTask() {
        try {
            const newTask = new Parse.Object('Task');
            newTask.set('name', taskName);
            newTask.set('connectedRoutine', taskRoutine);
            newTask.set('date', taskDate);
            newTask.set('startTime', taskStartTime);
            newTask.set('endTime', taskEndTime);
            // Implement user data retrieval
            //newTask.set('user', user);
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
        setTaskDate(`${date}`)
        hideDatePicker();
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (date) => {
        // Change so only time is shown instead of date
        // There's an error so it chooses the wrong time (an hour less than chosen)
        setStartTime(date)
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleEndTimeConfirm = (date) => {
        // Change so only time is shown instead of date
        setEndTime(date)
        hideEndTimePicker();
    };

    function clearInput() {
        setTaskName('')
        setTaskRoutine('')
        setStartTime(null)
        setEndTime(null)
        setTaskDate('')
    }

    return (
        <>
            <View style={{ JustifyContent: 'center', backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Add new task </Text>
            </View>
            <View style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'space-around',
                padding: 16,
            }}>
                <View>
                    <Text style={{ marginVertical: 16 }}>
                        Name your task
                    </Text>
                    <TextInput
                        style={{ padding: 8, backgroundColor: 'white' }}
                        onChangeText={text => setTaskName(text)}
                        value={taskName}
                    // When editing text, everything is pushed together and makes an ugly layout
                    />
                </View>
                <View>
                    <Text style={{ marginVertical: 16 }}>
                        Connect a routine
                    </Text>
                    <DropDownPicker
                        open={open}
                        value={taskRoutine}
                        items={routines}
                        setOpen={setOpen}
                        setValue={(taskRoutine) => setTaskRoutine(taskRoutine)}
                        setItems={setRoutines}
                        placeholder='Choose a routine'
                        multiple={false}
                        onChangeValue={(value) => {
                            if (value === 'new routine') {
                                navigation.navigate('Add routine');
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
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
                <View style={{ flexDirection: 'row' }}>
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
                <View style={{ flexDirection: 'row' }}>
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
            <View style={{ flex: 0.3, justifyContent: 'flex-end', padding: 10, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, width: 350, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={newTask}>
                    <FontAwesomeIcon icon={faPlusSquare} size={30} style={{ marginHorizontal: 10 }} />
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Add new task</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default AddTask;