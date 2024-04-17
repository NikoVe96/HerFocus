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


export const AddEvent = ({ navigation }) => {

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStartTime, setStartTime] = useState('');
    const [eventEndTime, setEndTime] = useState('');
    const [username, setUsername] = useState('');
    const [ID, setID] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [recent, setRecent] = useState([]);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [emoji, setEmoji] = useState();
    const [eventColor, setEventColor] = useState('');


    useEffect(() => {
        async function getCurrentUser() {
            if (username === '') {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser !== null) {
                    setUsername(currentUser.getUsername());
                    setID(currentUser.id);
                }
            }
        }
        getCurrentUser();
    }, [username]);

    async function newEvent() {
        try {
            const newEvent = new Parse.Object('Events');
            const currentUser = await Parse.User.currentAsync();

            newEvent.set('name', eventName);
            newEvent.set('date', eventDate);
            newEvent.set('startTime', eventStartTime);
            newEvent.set('endTime', eventEndTime);
            newEvent.set('emoji', emoji);
            newEvent.set('user', currentUser);
            newEvent.set('color', eventColor);
            // If time, add recurring option
            await newEvent.save();
            console.log('Success: event saved')
            Alert.alert('A new event has been added to your calendar!')
            clearInput();
        } catch (error) {
            console.log('Error saving new event: ', error);
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
        setEventDate(date.getDate()
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
        setEventName('');
        setStartTime(null);
        setEndTime(null);
        setEventDate('');
        setEmoji('');
        setEventColor('');
    }

    function showEmojiModal() {
        setEmojiModalVisible(true);
    }

    function hideEmojiModal() {
        setEmojiModalVisible(false);
    }

    function handleColorPick(color) {
        if (color == eventColor) {
            setEventColor('');
        } else {
            setEventColor(color);
        }
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Add new event </Text>
                <View style={{ borderWidth: 1, borderColor: 'black', width: 300, alignSelf: 'center', marginTop: 10 }}></View>
            </View>
            <View style={{
                alignContent: 'center',

                paddingHorizontal: 16,
            }}>
                <View>
                    <Text style={{ marginVertical: 16 }}>
                        Name your event
                    </Text>
                    <TextInput
                        style={{ padding: 8, backgroundColor: 'white' }}
                        onChangeText={text => setEventName(text)}
                        value={eventName}
                    />
                </View>
                <View>
                    <Text style={{ marginVertical: 16 }} >Choose a color</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: eventColor === 'yellow' ? 1.5 : 1,
                                borderRadius: eventColor === 'yellow' ? 30 : 20,
                                width: eventColor === 'yellow' ? 45 : 40,
                                height: eventColor === 'yellow' ? 45 : 40,
                                backgroundColor: '#FAEDCB'
                            }}
                            onPress={() => handleColorPick('yellow')}></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: eventColor === 'green' ? 1.5 : 1,
                            borderRadius: eventColor === 'green' ? 30 : 20,
                            width: eventColor === 'green' ? 45 : 40,
                            height: eventColor === 'green' ? 45 : 40,
                            backgroundColor: '#C9E4DE'
                        }}
                            onPress={() => handleColorPick('green')}></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: eventColor === 'blue' ? 1.5 : 1,
                            borderRadius: eventColor === 'blue' ? 30 : 20,
                            width: eventColor === 'blue' ? 45 : 40,
                            height: eventColor === 'blue' ? 45 : 40,
                            backgroundColor: '#C6DEF1'
                        }}
                            onPress={() => handleColorPick('blue')}></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: eventColor === 'purple' ? 1.5 : 1,
                            borderRadius: eventColor === 'purple' ? 30 : 20,
                            width: eventColor === 'purple' ? 45 : 40,
                            height: eventColor === 'purple' ? 45 : 40,
                            backgroundColor: '#DBCDF0'
                        }}
                            onPress={() => handleColorPick('purple')}></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: eventColor === 'red' ? 1.5 : 1,
                            borderRadius: eventColor === 'red' ? 30 : 20,
                            width: eventColor === 'red' ? 45 : 40,
                            height: eventColor === 'red' ? 45 : 40,
                            backgroundColor: '#FFADAD'
                        }}
                            onPress={() => handleColorPick('red')}></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: eventColor === 'orange' ? 1.5 : 1,
                            borderRadius: eventColor === 'orange' ? 30 : 20,
                            width: eventColor === 'orange' ? 45 : 40,
                            height: eventColor === 'orange' ? 45 : 40,
                            backgroundColor: '#FFD6A5'
                        }}
                            onPress={() => handleColorPick('orange')}></TouchableOpacity>
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
                        onRequestClose={hideEmojiModal}
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
                                    hideEmojiModal();
                                }}
                                onChangeRecent={setRecent}
                            />
                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: '100%', height: '8%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={hideEmojiModal}>
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
                        {eventStartTime === null ? 'Start time: ' : `Start time: ${eventStartTime}`}
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
                        {eventEndTime === null ? 'End time: ' : `End time: ${eventEndTime}`}
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
                        {`Date: ${eventDate}`}
                    </Text>
                </View>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, width: 350, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={newEvent}>
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

export default AddEvent;