import { View, TouchableOpacity, Image, Text, TextInput, Button, Alert, List, SafeAreaView, ScrollView, StyleSheet, Modal, Switch } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusSquare, faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTheme } from "@react-navigation/native";
import BottomNavigation from '../../Navigation/BottomNav';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const AddTask = ({ navigation }) => {

  const { colors } = useTheme();
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskStartTime, setStartTime] = useState('');
  const [taskEndTime, setEndTime] = useState('');
  const [username, setUsername] = useState('');
  const [ID, setID] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [taskColor, setTaskColor] = useState('');
  const [recent, setRecent] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [emoji, setEmoji] = useState();
  const [description, setDescription] = useState('');

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

  async function newTask() {
    try {
      const newTask = new Parse.Object('Task');
      const currentUser = await Parse.User.currentAsync();

       const startDateTime = new Date(taskDate);
       const [startHours, startMinutes] = taskStartTime.split(':');
       startDateTime.setHours(startHours, startMinutes);

       const endDateTime = new Date(taskDate);
       const [endHours, endMinutes] = taskEndTime.split(':');
       endDateTime.setHours(endHours, endMinutes);

      newTask.set('name', taskName);
      newTask.set('date', taskDate);
      newTask.set('startTime', startDateTime); 
      newTask.set('endTime', endDateTime);  
      newTask.set('emoji', emoji);
      newTask.set('user', currentUser);
      newTask.set('color', taskColor);
      newTask.set('type', 'task');
      newTask.set('description', description);
      // If time, add recurring option
      await newTask.save();
      console.log('Success: task saved')
      Alert.alert('En ny to-do er blevet tilføjet til din kalender!');
      //clearInput();
    } catch (error) {
      console.log('Error saving new task: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du mangler at udfylde enten navn, dato, farve, start eller sluttidspunkt 😉')
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
    setTaskDate(formattedDate);
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
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setStartTime(hours 
      + ':' + minutes);
    hideStartTimePicker();
    console.log('Selected time:', hours + ':' + minutes);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setEndTime(hours 
      + ':' + minutes);
    console.log('Selected time:', hours + ':' + minutes);

    hideEndTimePicker();
  };

  function clearInput() {
    setTaskName('');
    setStartTime(null);
    setEndTime(null);
    setTaskDate('');
    setEmoji();
    setTaskColor('');
    setDescription('');
  }

  function showEmojiModal() {
    setEmojiModalVisible(true);
  }

  function hideEmojiModal() {
    setEmojiModalVisible(false);
  }

  function handleColorPick(color) {
    if (color == taskColor) {
      setTaskColor('');
    } else {
      setTaskColor(color);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 24, color: colors.text, marginTop: 15 }}>
            {' '}
            Tilføj en ny to-do{' '}
          </Text>
          <View
            style={[
              styles.border,
              { backgroundColor: colors.border, borderColor: colors.border },
            ]}></View>
        </View>
        <View
          style={{
            alignContent: 'center',
            paddingHorizontal: 16,
          }}>
          <View>
            <Text style={[styles.text, { color: colors.text }]}>
              Hvad skal din to-do hedde?
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setTaskName(text)}
              value={taskName}
            />
          </View>
          <View>
            <Text style={[styles.text, { color: colors.text }]}>
              Vælg en farve
            </Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#FAEDCB' ? 1.5 : 1,
                  borderRadius: taskColor === '#FAEDCB' ? 30 : 20,
                  width: taskColor === '#FAEDCB' ? 45 : 40,
                  height: taskColor === '#FAEDCB' ? 45 : 40,
                  backgroundColor: '#FAEDCB',
                  borderColor: '#FAEDCB',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#FAEDCB')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#C9E4DE' ? 1.5 : 1,
                  borderRadius: taskColor === '#C9E4DE' ? 30 : 20,
                  width: taskColor === '#C9E4DE' ? 45 : 40,
                  height: taskColor === '#C9E4DE' ? 45 : 40,
                  backgroundColor: '#C9E4DE',
                  borderColor: '#C9E4DE',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#C6DEF1' ? 1.5 : 1,
                  borderRadius: taskColor === '#C6DEF1' ? 30 : 20,
                  width: taskColor === '#C6DEF1' ? 45 : 40,
                  height: taskColor === '#C6DEF1' ? 45 : 40,
                  backgroundColor: '#C6DEF1',
                  borderColor: '#C6DEF1',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#C6DEF1')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#DBCDF0' ? 1.5 : 1,
                  borderRadius: taskColor === '#DBCDF0' ? 30 : 20,
                  width: taskColor === '#DBCDF0' ? 45 : 40,
                  height: taskColor === '#DBCDF0' ? 45 : 40,
                  backgroundColor: '#DBCDF0',
                  borderColor: '#DBCDF0',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#DBCDF0')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#FFADAD' ? 1.5 : 1,
                  borderRadius: taskColor === '#FFADAD' ? 30 : 20,
                  width: taskColor === '#FFADAD' ? 45 : 40,
                  height: taskColor === '#FFADAD' ? 45 : 40,
                  backgroundColor: '#FFADAD',
                  borderColor: '#FFADAD',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#FFADAD')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#FFD6A5' ? 1.5 : 1,
                  borderRadius: taskColor === '#FFD6A5' ? 30 : 20,
                  width: taskColor === '#FFD6A5' ? 45 : 40,
                  height: taskColor === '#FFD6A5' ? 45 : 40,
                  backgroundColor: '#FFD6A5',
                  borderColor: '#FFD6A5',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#FFD6A5')}></TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: '10%', flexDirection: 'row' }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                onPress={showEmojiModal}
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Emoji
                </Text>
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
                      { backgroundColor: colors.background },
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
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>LUK</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={{ fontSize: 26 }}> {emoji}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={showStartTimePicker}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Start tidspunkt
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
              />
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>
                {taskStartTime === null ? '' : `${taskStartTime}`}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={showEndTimePicker}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Slut tidspunkt
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
              />
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>
                {taskEndTime === null ? '' : `${taskEndTime}`}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={showDatePicker}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Dato
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>
                {`${taskDate}`}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Text style={[styles.text, { color: colors.text }]}>
            Tilføj en beskrivelse
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setDescription(text)}
            value={description}
            multiline={true}
            numberOfLines={8}
            textAlignVertical={'top'}>
          </TextInput>
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            {
              backgroundColor: colors.mainButton,
              borderColor: colors.mainButton,
            },
          ]}
          onPress={newTask}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.text }}>
            Tilføj ny to-do
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderRadius: 10,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: '4%',
    paddingHorizontal: '3%',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: '2%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginBottom: 8,
  },
  modalButton: {
    backgroundColor: 'lightgrey',
    width: '95%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    height: '95%',
  },
  text: {
    marginVertical: 10,
    fontSize: 18,
  },
  textInput: {
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    fontSize: 16,
    borderColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  border: {
    borderWidth: 1,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowView: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default AddTask;