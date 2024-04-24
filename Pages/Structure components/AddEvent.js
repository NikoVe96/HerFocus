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
import { useTheme } from "@react-navigation/native";
import BottomNavigation from '../../Navigation/BottomNav';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const AddEvent = () => {

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
    const { colors } = useTheme();


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
        const formattedDate = date.toISOString().slice(0, 10);
        setEventDate(formattedDate);
        console.log('Selected date:', formattedDate);
        hideDatePicker();
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (date) => {
        if (date.getMinutes() < 10) {
            let minutes = '0' + date.getMinutes();
            setStartTime(date.getHours()
                + ':' + minutes)
            console.log(minutes);
        } else {
            setStartTime(date.getHours()
                + ':' + date.getMinutes());
        }
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleEndTimeConfirm = (date) => {
        if (date.getMinutes() < 10) {
            let minutes = '0' + date.getMinutes();
            setEndTime(date.getHours()
                + ':' + minutes)
            console.log(minutes);
        } else {
            setEndTime(date.getHours()
                + ':' + date.getMinutes());
        }
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
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              {' '}
              Tilføj et nyt event{' '}
            </Text>
            <View
              style={[
                styles.border,
                {backgroundColor: colors.border, borderColor: colors.border},
              ]}></View>
          </View>
          <View
            style={{
              alignContent: 'center',
              paddingHorizontal: 16,
            }}>
            <View>
              <Text style={styles.text}>Hvad skal dit event hedde?</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setEventName(text)}
                value={eventName}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <Text style={styles.text}>Vælg en farve</Text>
              <View style={styles.colorOptions}>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#FAEDCB' ? 1.5 : 1,
                    borderRadius: eventColor === '#FAEDCB' ? 30 : 20,
                    width: eventColor === '#FAEDCB' ? 45 : 40,
                    height: eventColor === '#FAEDCB' ? 45 : 40,
                    backgroundColor: '#FAEDCB',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#FAEDCB')}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#C9E4DE' ? 1.5 : 1,
                    borderRadius: eventColor === '#C9E4DE' ? 30 : 20,
                    width: eventColor === '#C9E4DE' ? 45 : 40,
                    height: eventColor === '#C9E4DE' ? 45 : 40,
                    backgroundColor: '#C9E4DE',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#C6DEF1' ? 1.5 : 1,
                    borderRadius: eventColor === '#C6DEF1' ? 30 : 20,
                    width: eventColor === '#C6DEF1' ? 45 : 40,
                    height: eventColor === '#C6DEF1' ? 45 : 40,
                    backgroundColor: '#C6DEF1',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#C6DEF1')}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#DBCDF0' ? 1.5 : 1,
                    borderRadius: eventColor === '#DBCDF0' ? 30 : 20,
                    width: eventColor === '#DBCDF0' ? 45 : 40,
                    height: eventColor === '#DBCDF0' ? 45 : 40,
                    backgroundColor: '#DBCDF0',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#DBCDF0')}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#FFADAD' ? 1.5 : 1,
                    borderRadius: eventColor === '#FFADAD' ? 30 : 20,
                    width: eventColor === '#FFADAD' ? 45 : 40,
                    height: eventColor === '#FFADAD' ? 45 : 40,
                    backgroundColor: '#FFADAD',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#FFADAD')}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: eventColor === '#FFD6A5' ? 1.5 : 1,
                    borderRadius: eventColor === '#FFD6A5' ? 30 : 20,
                    width: eventColor === '#FFD6A5' ? 45 : 40,
                    height: eventColor === '#FFD6A5' ? 45 : 40,
                    backgroundColor: '#FFD6A5',
                    borderColor: colors.border,
                  }}
                  onPress={() => handleColorPick('#FFD6A5')}></TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 5, flexDirection: 'row'}}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  onPress={showEmojiModal}
                  style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.border,
                    },
                  ]}>
                  <Text style={styles.buttonText}>Emoji</Text>
                </TouchableOpacity>
                <Modal
                  visible={emojiModalVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={hideEmojiModal}>
                  <View style={styles.modalContainer}>
                    <View
                      style={[
                        styles.emojiPickerContainer,
                        {backgroundColor: colors.background},
                      ]}>
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
                        backgroundColor={colors.background}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        {
                          backgroundColor: colors.mainButton,
                          borderColor: colors.mainButton,
                        },
                      ]}
                      onPress={hideEmojiModal}>
                      <Text style={{fontWeight: 'bold', fontSize: 24}}>
                        LUK
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Text style={{fontSize: 26}}> {emoji}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 2}}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={showStartTimePicker}>
                  <Text style={styles.buttonText}>Start tidspunkt</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={handleStartTimeConfirm}
                  onCancel={hideStartTimePicker}
                />
              </View>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {eventStartTime === null ? '' : `${eventStartTime}`}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 2}}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={showEndTimePicker}>
                  <Text style={styles.buttonText}>Slut tidspunkt</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleEndTimeConfirm}
                  onCancel={hideEndTimePicker}
                />
              </View>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {eventEndTime === null ? '' : `${eventEndTime}`}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={showDatePicker}>
                  <Text style={styles.buttonText}>Dato</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Text
                  style={[styles.text, {fontWeight: 'bold'}]}
                  // Insert if statement to test if value is null, if so, render text without variable
                >
                  {`${eventDate}`}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.Button, {backgroundColor: colors.mainButton}]}
            onPress={newEvent}>
            <Text style={{fontSize: 26, fontWeight: 'bold'}}>
              Tilføj nyt event
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomNavigation />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Button: {
        borderRadius: 8,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        marginTop: '25%',
        paddingHorizontal: 20,
    },
    buttonSmall: {
        justifyContent: 'center',
        padding: 5,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10
    },
    modalButton: {
        backgroundColor: 'lightgrey',
        width: '95%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
    },
    emojiPickerContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        width: '95%',
        height: '95%'
    },
    text: {
        marginVertical: 10,
        fontSize: 18
    },
    textInput: {
        padding: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16
    },
    border: {
        borderWidth: 1,
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    rowView: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    }
});

export default AddEvent;