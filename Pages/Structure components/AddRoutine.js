import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faRotateRight, faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-native-modal";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';
import AccordionItem from '../../Components/AccordionItem';
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import BouncyCheckbox from "react-native-bouncy-checkbox";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const AddRoutine = ({ navigation }) => {

  const [routineName, setRoutineName] = useState('');
  const [routineColor, setRoutineColor] = useState('');
  const [routineEmoji, setRoutineEmoji] = useState('');
  const [username, setUsername] = useState('');
  const [isAddStepModalVisible, setStepModalVisible] = useState(false);
  const [isRoutineModalVisible, setRoutineModalVisible] = useState(false);
  const [stepName, setStepName] = useState('');
  const [stepTime, setStepTime] = useState(null);
  const [routineSteps, setRoutineSteps] = useState([]);
  const [routineObject, setRoutineObject] = useState();
  const { colors } = useTheme();
  const [ID, setID] = useState('');
  const [allRoutines, setAllRoutines] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [recent, setRecent] = useState([]);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isToCalendarModalVisible, setToCalendarModalVisible] = useState(false);
  const [routineDate, setRoutineDate] = useState('');
  const [routineStartTime, setRoutineStartTime] = useState('');
  const [routineEndTime, setRoutineEndTime] = useState('');
  const [checked, setChecked] = useState(true);

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
    routines();
  }, [checked]);

  const showAddStepeModal = (routine, steps) => {
    setRoutineSteps(steps);
    setRoutineObject(routine);
    setStepModalVisible(true);
  };

  const hideAddStepModal = () => {
    setStepModalVisible(false);
  };

  const showRoutineModal = () => {
    setRoutineModalVisible(true);
  }

  const hideRoutineModal = () => {
    setRoutineModalVisible(false);
  }

  function showEmojiModal() {
    setEmojiModalVisible(true);
  }

  function hideEmojiModal() {
    setEmojiModalVisible(false);
  }

  async function handleNewStepConfirm() {
    const newStep = { stepName, stepTime, checked: false };
    routineSteps.push(newStep);
    routineObject.set('routineSteps', routineSteps);
    await routineObject.save();

    setStepName('');
    setStepTime('');
    await routines();
    hideAddStepModal();
  };

  async function resetSteps(routine) {
    const steps = routine.get('routineSteps');
    const updatedSteps = steps.map(step => ({ ...step, checked: false }));
    routine.set('routineSteps', updatedSteps);
    await routine.save();
    await routines();
  }

  async function updateStepCheck(index, routine) {
    const steps = routine.get('routineSteps');
    steps[index].checked = !steps[index].checked;
    routine.set('routineSteps', steps);
    await routine.save();
    await routines();
  }

  function isStepChecked(index, routine) {
    const steps = routine.get('routineSteps');
    steps[index].checked ? true : false;
  }

  async function saveRoutine() {
    try {
      const currentUser = await Parse.User.currentAsync();
      const newRoutine = new Parse.Object('Routine');

      newRoutine.set('name', routineName);
      newRoutine.set('user', currentUser);
      newRoutine.set('emoji', routineEmoji);
      newRoutine.set('color', routineColor);
      newRoutine.set('routineSteps', []);
      newRoutine.set('type', 'routine');
      await newRoutine.save();

      routines();
      hideRoutineModal();

      Alert.alert('En ny rutine er blevet tilføjet!')
      clearInput();
    } catch (error) {
      console.log('Error saving new routine: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du har glemt at udfylde enten navn eller farve 😉')
    }
  }

  const handleDeleteStep = async (index, routine) => {

    const routinesArray = routine.get('routineSteps');
    const newStepsArray = routinesArray.splice(index, 1);
    routine.set('stepsArray', newStepsArray);
    await routine.save();

    routines();

    Alert.alert('Dit rutine step er blevet fjernet!');
  }

  const deleteRoutine = async (routine) => {
    const name = routine.get('name');
    try {
      routine.destroy();
      await routines();
      Alert.alert(name + ' er blevet slettet.');
    } catch (error) {
      Alert.alert('Hovsa!',
        'Der opstod desværre en fejl.');
    }

  }

  function clearInput() {
    setRoutineName('');
    setRoutineSteps([]);
    setRoutineColor('');
    setRoutineEmoji('');
  }

  async function routines() {
    console.log('User: ' + ID)
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Routine');
    query.equalTo('user', currentUser);
    const results = await query.find();
    setAllRoutines(results);

  }

  function handleColorPick(color) {
    if (color == routineColor) {
      setRoutineColor('');
    } else {
      setRoutineColor(color);
    }
  }

  async function moveToCalendar() {

    try {
      routineObject.set('startTime', routineStartTime);
      routineObject.set('endTime', routineEndTime);
      routineObject.set('calendarDate', routineDate);
      await routineObject.save();

      setToCalendarModalVisible(false);
      Alert.alert(routineObject.get('name') + ' er blevet tilføjet til din kalender!');

    } catch (error) {
      console.log(error);
      Alert.alert('Hovsa!',
        'Der opstod en fejl');
    }
  }

  const handleStartTimeConfirm = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setRoutineStartTime(hours
      + ':' + minutes);
    setStartTimePickerVisibility(false);
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

    setRoutineEndTime(hours
      + ':' + minutes);

    setEndTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setRoutineDate(formattedDate);
    console.log('Selected date:', formattedDate);
    setDatePickerVisibility(false);
  };

  const toCalendarModal = (routine) => {
    console.log(routine);
    setRoutineObject(routine);
    setToCalendarModalVisible(true);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text
            style={{
              fontSize: 24 * scaleFactor,
              color: colors.text,
              marginTop: 15,
            }}>
            Rutiner
          </Text>
          <View
            style={[
              styles.border,
              { backgroundColor: colors.border, borderColor: colors.border },
            ]}></View>
        </View>
        <TouchableOpacity
          onPress={() => showRoutineModal()}
          style={[
            styles.plusBtn,
            {
              backgroundColor: colors.mainButton,
              borderColor: colors.mainButton,
            },
          ]}>
          <FontAwesomeIcon
            icon={faPlus}
            size={35 * scaleFactor}
            color={colors.text}
          />
        </TouchableOpacity>
        <View>
          {allRoutines.map((routine, index) => (
            <AccordionItem
              key={index}
              title={routine.get('name')}
              emoji={routine.get('emoji')}
              icon={null}
              emojiStyle={{ fontSize: 35 * scaleFactor }}
              titleStyle={{ fontSize: 24 * scaleFactor, color: colors.border }}>
              <View
                style={[styles.outerView, {
                  backgroundColor: colors.mainButton,
                  borderColor: colors.mainButton,

                }]}>
                <View
                  style={styles.icons}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => toCalendarModal(routine)}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={28 * scaleFactor}
                      color="#2F5233"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => resetSteps(routine)}>
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      size={24 * scaleFactor}
                      color={colors.background}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => deleteRoutine(routine)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size={24 * scaleFactor}
                      color="#BF4C41"
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  style={{
                    height:
                      routine.get('routineSteps').length > 4
                        ? 250 * scaleFactor
                        : null,
                  }}>
                  {routine.get('routineSteps').map((step, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <BouncyCheckbox
                          size={30 * scaleFactor}
                          fillColor={colors.subButton}
                          unfillColor="#FFFFFF"
                          iconStyle={{ borderColor: 'black' }}
                          innerIconStyle={{ borderWidth: 2 }}
                          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                          style={{ marginLeft: '2%' }}
                          isChecked={isStepChecked(index, routine)}
                          onPress={() => updateStepCheck(index, routine)}
                        />
                      </View>
                      <View
                        style={[styles.taskView, {
                          backgroundColor: colors.subButton,
                          borderColor: colors.subButton,
                        }]}>
                        <View style={{ justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontSize: 18 * scaleFactor,
                              color: colors.text,
                            }}>
                            {step.stepName}
                          </Text>
                        </View>
                        {step.stepTime == (null || ' ' || '') ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '20%',
                              alignItems: 'center',
                              marginLeft: '45%',
                            }}>
                            <FontAwesomeIcon
                              icon={faStopwatch}
                              style={{ marginHorizontal: 5 }}
                              size={20 * scaleFactor}
                              color={colors.border}
                            />
                            <Text
                              style={{
                                fontSize: 18 * scaleFactor,
                                color: colors.text,
                              }}>
                              {step.stepTime}
                            </Text>
                          </View>
                        ) : null}
                        <TouchableOpacity
                          style={{ justifyContent: 'center' }}
                          onPress={() => handleDeleteStep(index, routine)}>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size={20 * scaleFactor}
                            color="#BF4C41"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: '2%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      marginHorizontal: '2%',
                      padding: 8,
                      borderRadius: 10,
                      backgroundColor: colors.border,
                      borderColor: colors.border,
                      flex: 1,
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      showAddStepeModal(routine, routine.get('routineSteps'))
                    }>
                    <Text
                      style={{
                        fontSize: 18 * scaleFactor,
                        fontWeight: 'bold',
                        color: colors.text,
                      }}>
                      Tilføj et nyt step
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AccordionItem>
          ))}
        </View>
        <Modal
          isVisible={isAddStepModalVisible}
          onBackdropPress={() => setStepModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
              <Text style={{ fontSize: 20 * scaleFactor, color: colors.text }}>
                Tilføj et navn til dit step
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                }}
                onChangeText={text => setStepName(text)}></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 20 * scaleFactor,
                  color: colors.text,
                }}>
                Vil du tilføje hvor lang tid det tager at fuldføre steppet?
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                }}
                onChangeText={text => setStepTime(Number(text))}></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainButton,
              padding: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.mainButton,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={handleNewStepConfirm}>
            <Text style={{ fontSize: 26 * scaleFactor, color: colors.text }}>
              Tilføj et nyt step
            </Text>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isRoutineModalVisible}
          onBackdropPress={() => setRoutineModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
              <Text style={{ fontSize: 20 * scaleFactor, color: colors.text }}>
                Giv din rutine et navn
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                }}
                onChangeText={text => setRoutineName(text)}></TextInput>
              <View style={{ marginVertical: '3%' }}>
                <Text
                  style={{
                    fontSize: 20 * scaleFactor,
                    marginVertical: '1%',
                    color: colors.text,
                  }}>
                  Vælg en farve
                </Text>
                <View style={styles.colorOptions}>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FAEDCB' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FAEDCB'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FAEDCB'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FAEDCB'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FAEDCB',
                      borderColor: '#FAEDCB',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#FAEDCB')
                    }></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#C9E4DE' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#C9E4DE'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#C9E4DE'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#C9E4DE'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#C9E4DE',
                      borderColor: '#C9E4DE',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#C9E4DE')
                    }></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#C6DEF1' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#C6DEF1'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#C6DEF1'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#C6DEF1'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#C6DEF1',
                      borderColor: '#C6DEF1',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#C6DEF1')
                    }></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#DBCDF0' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#DBCDF0'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#DBCDF0'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#DBCDF0'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#DBCDF0',
                      borderColor: '#DBCDF0',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#DBCDF0')
                    }></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FFADAD' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FFADAD'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FFADAD'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FFADAD'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FFADAD',
                      borderColor: '#FFADAD',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#FFADAD')
                    }></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FFD6A5' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FFD6A5'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FFD6A5'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FFD6A5'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FFD6A5',
                      borderColor: '#FFD6A5',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() =>
                      handleColorPick('#FFD6A5')
                    }></TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: '1%', flexDirection: 'row' }}>
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
                    <Text
                      style={{
                        fontSize: 18 * scaleFactor,
                        color: colors.text,
                      }}>
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
                          perLine={6 * scaleFactor}
                          onSelect={chosenEmoji => {
                            setRoutineEmoji(chosenEmoji.emoji);
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
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 24 * scaleFactor,
                            color: colors.text,
                          }}>
                          LUK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={{ fontSize: 30 * scaleFactor, color: colors.text }}>
                    {' '}
                    {routineEmoji}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainButton,
              padding: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.mainButton,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => saveRoutine()}>
            <Text style={{ fontSize: 26 * scaleFactor, color: colors.text }}>
              Tilføj en ny rutine
            </Text>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isToCalendarModalVisible}
          onBackdropPress={() => setToCalendarModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
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
                    onPress={() => setStartTimePickerVisibility(true)}>
                    <Text style={[styles.buttonText, { color: colors.text }]}>
                      Start tidspunkt
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={date => handleStartTimeConfirm(date)}
                    onCancel={() => setStartTimePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.text },
                    ]}>
                    {routineStartTime}
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
                    onPress={() => setEndTimePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Slut tidspunkt</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={date => handleEndTimeConfirm(date)}
                    onCancel={() => setEndTimePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.text },
                    ]}>
                    {routineEndTime}
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
                    onPress={() => setDatePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Dato</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={date => handleDateConfirm(date)}
                    onCancel={() => setDatePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.text },
                    ]}>
                    {routineDate}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={() => moveToCalendar()}>
                <Text style={styles.buttonText}>Tilføj til kalender</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.border,
              alignItems: 'center',
              height: '7%',
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => setToCalendarModalVisible(false)}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
              LUK
            </Text>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowView: {
    flex: 1,
    justifyContent: 'center',
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
  buttonSmall: {
    justifyContent: 'center',
    padding: '2%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
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
  plusBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-end',
    padding: 10,
    marginVertical: '5%',
    marginHorizontal: '5%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  outerView: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  icons:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  taskView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AddRoutine;
