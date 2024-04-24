import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-native-modal";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomNavigation from '../../Navigation/BottomNav';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const AddRoutine = ({ navigation }) => {

    const [routineName, setRoutineName] = useState('');
    const [routineTime, setRoutineTime] = useState();
    const [username, setUsername] = useState('');
    const [isAddStepModalVisible, setStepModalVisible] = useState(false);
    const [stepName, setStepName] = useState('');
    const [stepTime, setStepTime] = useState(null);
    const [routineObject, setRoutineObject] = useState();
    const [routineSteps, setRoutineSteps] = useState([]);
    const [open, setOpen] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    useEffect(() => {
        async function getCurrentUser() {
            if (username === '') {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser !== null) {
                    setUsername(currentUser.getUsername());
                }
            }
        }
        getCurrentUser();
    }, [username]);

    const showAddStepeModal = () => {
        setStepModalVisible(true);
    };

    const hideAddStepModal = () => {
        setStepModalVisible(false);
    };

    const handleNewStepConfirm = () => {
        const newStep = { stepName, stepTime };
        setRoutineSteps([...routineSteps, newStep]);
        setStepName('');
        setStepTime('');
        hideAddStepModal();

        Alert.alert('New step added!');
    };

    async function saveRoutine() {
        try {
            const currentUser = await Parse.User.currentAsync();
            const newRoutine = new Parse.Object('Routine');

            newRoutine.set('name', routineName);
            newRoutine.set('time', routineTime);
            newRoutine.set('user', currentUser);
            await newRoutine.save();
            routineSteps.forEach(item => saveStep(item.stepName, item.stepTime, currentUser, newRoutine))
            Alert.alert('A new routine has been added!')
            clearInput();
        } catch (error) {
            console.log('Error saving new routine: ', error);
        }



        navigation.navigate('Add task');
    }

    const handleStepChange = (text, index, fieldName) => {
        setRoutineSteps(prevSteps => {
            let updatedSteps = [...prevSteps];
            updatedSteps[index][fieldName] = text;
            console.log(updatedSteps); // Log updated steps
            return updatedSteps;
        });
    };

    const handleDeleteStep = (index) => {
        const newStepArray = [...routineSteps];
        const deletedStep = newStepArray.splice(index, 1);
        setRoutineSteps(newStepArray);
        Alert.alert(`${deletedStep} has been removed`);
    }

    async function saveStep(stepName, stepTime, currentUser, routineObject) {
        const newStep = new Parse.Object('Routine_step');
        newStep.set('name', stepName);
        newStep.set('time', stepTime);
        newStep.set('user', currentUser);
        newStep.set('routine', routineObject);
        await newStep.save();
    }

    function clearInput() {
        setRoutineName('');
        setRoutineTime();
        setRoutineSteps([]);
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date) => {
        // Change so only time is shown instead of date
        // There's an error so it chooses the wrong time (an hour less than chosen)
        setStepTime(date)
        hideTimePicker();
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TextInput
                style={{padding: 10, flex: 2, fontSize: 24, fontWeight: 'bold'}}
                onChangeText={newName => setRoutineName(newName)}></TextInput>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size={40}
                style={{flex: 1, marginVertical: 5, marginHorizontal: 5}}
              />
            </View>
          </View>
          <View style={{padding: 10}}>
            <ScrollView style={{height: 440}}>
              <View style={{backgroundColor: 'grey'}}>
                {routineSteps.map((item, index) => (
                  <View key={index} style={{padding: 10, flexDirection: 'row'}}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flex: 4,
                        alignItems: 'center',
                        marginRight: 10,
                      }}>
                      <Text
                        style={{fontSize: 16, flex: 3, padding: 2}}
                        name="stepName"
                        value={item.stepName}
                        onChange={text =>
                          handleStepChange(text, index, 'stepName')
                        }>
                        {`${item.stepName}`}{' '}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'lightblue',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        marginRight: 10,
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <FontAwesomeIcon icon={faStopwatch} size={20} />
                      <Text
                        style={{fontSize: 16, flex: 3, padding: 2}}
                        name="stepTime"
                        value={item.stepTime}
                        onChange={text =>
                          handleStepChange(text, index, 'stepTime')
                        }></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'lightblue',
                        justifyContent: 'center',
                        padding: 5,
                        marginRight: 10,
                      }}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size={20}
                        style={{marginHorizontal: 2}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'lightblue',
                        justifyContent: 'center',
                        padding: 5,
                      }}
                      onPress={() => handleDeleteStep(index)}>
                      <FontAwesomeIcon icon={faTrashCan} size={20} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={showAddStepeModal}
              style={{
                alignItems: 'center',
                backgroundColor: 'lightblue',
                flexDirection: 'row',
                padding: 5,
              }}>
              <FontAwesomeIcon
                icon={faPlusSquare}
                size={25}
                style={{marginHorizontal: 5}}
              />
              <Text style={{fontSize: 20}}> Add new step </Text>
            </TouchableOpacity>
            <View>
              <Modal
                isVisible={isAddStepModalVisible}
                onBackdropPress={() => setStepModalVisible(false)}
                style={{}}>
                <View style={{backgroundColor: 'lightgrey', padding: 10}}>
                  <View>
                    <Text style={{fontSize: 20}}>Add step name </Text>
                    <TextInput
                      style={{
                        backgroundColor: 'white',
                        fontSize: 16,
                        marginVertical: 10,
                      }}
                      onChangeText={text => setStepName(text)}></TextInput>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text style={{marginVertical: 10, fontSize: 20}}>
                      Do you want to add the time it takes to do the task?
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'lightblue',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={showTimePicker}>
                      <FontAwesomeIcon icon={faStopwatch} size={20} />
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {' '}
                        Add time{' '}
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        backgroundColor: 'white',
                        fontSize: 16,
                        marginVertical: 10,
                      }}
                      onChangeText={text =>
                        setStepTime(Number(text))
                      }></TextInput>
                    <Text>{`${stepTime}`}</Text>
                  </View>
                </View>
                <View style={{backgroundColor: 'lightgrey', height: 40}}></View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'lightblue',
                    padding: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={handleNewStepConfirm}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size={30}
                    style={{marginHorizontal: 5}}
                  />
                  <Text style={{fontSize: 26}}>Add new step</Text>
                </TouchableOpacity>
              </Modal>
            </View>
            <View style={{marginHorizontal: 5, padding: 10}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'lightblue',
                  padding: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  size={30}
                  style={{marginHorizontal: 5}}
                />
                <Text style={{fontSize: 26}} onPress={saveRoutine}>
                  Save routine
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <BottomNavigation />
      </SafeAreaView>
    );

}

export default AddRoutine;
