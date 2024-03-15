import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-native-modal";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const AddRoutine = ({ navigation }) => {

    const [currentUser, setCurrentUser] = useState('');
    const [isAddStepModalVisible, setStepModalVisible] = useState(false);
    const [stepName, setStepName] = useState('');
    const [stepTime, setStepTime] = useState();
    const [steps, setSteps] = useState([
        { name: 'Get out of bed', time: null },
        { name: 'Put on clothes', time: 5 },
        { name: 'Eat breakfast', time: 20 },

    ]);

    /*useEffect(() => {
        async function fetchData() {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
                //doQueryByName();
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        }

        fetchData();
    },);

    const getCurrentUser = async function () {
        const user = Parse.User.current();
        if (!user) {
            Alert.alert('No user is logged in!');
        }
        return user;
    };
    */

    const showAddStepeModal = () => {
        setStepModalVisible(true);
    };

    const hideAddStepModal = () => {
        setStepModalVisible(false);
    };

    const handleNewStepConfirm = (name, time) => {

        hideAddStepModal();
    };

    const StepQuery = async function () {
        //if (!currentUser) {
        //    return false;
        //}

        const parseQuerySender = new Parse.Query('Routine');
        parseQuerySender.equalTo('sender', currentUser.get('username'));
        parseQuerySender.equalTo('receiver', contactName);

        const parseQueryReceiver = new Parse.Query('Messages');
        parseQueryReceiver.equalTo('sender', contactName);
        parseQueryReceiver.equalTo('receiver', currentUser.get('username'));

        const mainQuery = Parse.Query.or(parseQuerySender, parseQueryReceiver);
        mainQuery.ascending("createdAt");

        try {
            let messages = await mainQuery.find();
            setQueryResults(messages);
            return true;
        } catch (error) {

            return false;
        }
    };

    function stepRow({ step }) {
        <View style={{ padding: 10, flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', flex: 4, alignItems: 'center' }}>
                <TextInput style={{ fontSize: 16, flex: 3, padding: 2 }}> `${step.name}` </TextInput>
                <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ marginHorizontal: 2 }} />
            </View>
            <TouchableOpacity style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', padding: 5, marginHorizontal: 10, flexDirection: 'row', flex: 1 }}>
                <FontAwesomeIcon icon={faStopwatch} size={20} />
                <Text style={{ marginHorizontal: 2 }}>Time </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5 }}>
                <FontAwesomeIcon icon={faTrashCan} size={20} />
            </TouchableOpacity>
        </View>
    }

    function saveRoutine() {
        navigation.navigate('Add task');
    }

    return (
        <>
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <TextInput style={{ padding: 10, flex: 2, fontSize: 24, fontWeight: 'bold' }}></TextInput>
                    <FontAwesomeIcon icon={faPenToSquare} size={40} style={{ flex: 1, marginVertical: 5, marginHorizontal: 5 }} />
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View style={{ backgroundColor: 'grey' }}>
                    <View style={{ padding: 10, flexDirection: 'row' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', flex: 4, alignItems: 'center' }}>
                            <TextInput style={{ fontSize: 16, flex: 3, padding: 2 }}> Get out of bed </TextInput>
                            <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ marginHorizontal: 2 }} />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', padding: 5, marginHorizontal: 10, flexDirection: 'row', flex: 1 }}>
                            <FontAwesomeIcon icon={faStopwatch} size={20} />
                            <Text style={{ marginHorizontal: 2 }}>Time </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'lightblue', justifyContent: 'center', padding: 5 }}>
                            <FontAwesomeIcon icon={faTrashCan} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    onPress={showAddStepeModal}
                    style={{ alignItems: 'center', backgroundColor: 'lightblue', flexDirection: 'row', padding: 5 }}>
                    <FontAwesomeIcon icon={faPlusSquare} size={25} style={{ marginHorizontal: 5 }} />
                    <Text style={{ fontSize: 20 }}> Add new step </Text>
                </TouchableOpacity>
                <View>
                    <Modal
                        isVisible={isAddStepModalVisible}
                        onBackdropPress={() => setStepModalVisible(false)}
                        style={{}}>
                        <View style={{ backgroundColor: 'lightgrey', padding: 10 }}>
                            <View>
                                <Text style={{ fontSize: 20, }}>Add step name </Text>
                                <TextInput style={{ backgroundColor: 'white', fontSize: 16, marginVertical: 10 }}></TextInput>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ marginVertical: 10, fontSize: 20 }}>Do you want to add the time it takes to do the task?</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faStopwatch} size={20} />
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Add time </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'lightgrey', height: 40 }}>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faPlusSquare} size={30} style={{ marginHorizontal: 5 }} />
                            <Text style={{ fontSize: 26 }}>Add new step</Text>
                        </TouchableOpacity>
                    </Modal>
                </View >
                <View style={{ marginHorizontal: 5, padding: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faFloppyDisk} size={30} style={{ marginHorizontal: 5 }} />
                        <Text style={{ fontSize: 26 }} onPress={saveRoutine}>Save routine</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

}
export default AddRoutine;
