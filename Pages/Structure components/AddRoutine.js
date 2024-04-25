import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
    }, []);

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
        const newStep = { stepName, stepTime };
        routineSteps.push(newStep);
        routineObject.set('routineSteps', routineSteps);
        routineObject.save();

        setStepName('');
        setStepTime('');
        await routines();
        hideAddStepModal();

        Alert.alert('New step added!');
    };

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
        }
    }

    const handleStepChange = (text, index, fieldName) => {
        setRoutineSteps(prevSteps => {
            let updatedSteps = [...prevSteps];
            updatedSteps[index][fieldName] = text;
            console.log(updatedSteps);
            return updatedSteps;
        });
    };

    const handleDeleteStep = (index, routine) => {
        const newStepArray = [...routineSteps];
        const deletedStep = newStepArray.splice(index, 1);
        setRoutineSteps(newStepArray);

        Alert.alert(`${deletedStep} has been removed`);
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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Rutiner</Text>
                    <View style={[styles.border, { backgroundColor: colors.border, borderColor: colors.border }]}></View>
                </View>
                <View>
                    {allRoutines.map((routine, index) => (
                        <AccordionItem
                            key={index}
                            title={routine.get('name')}
                            emoji={routine.get('emoji')}
                            icon={null}
                            emojiStyle={{ fontSize: 35 }}
                            titleStyle={{ fontSize: 24, color: colors.border }}>
                            <View style={{ backgroundColor: colors.mainButton, borderWidth: 1, borderRadius: 10, padding: 5, borderColor: colors.mainButton, elevation: 10 }}>
                                {routine.get('routineSteps').map((step, index) => (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'center' }}>
                                            <BouncyCheckbox
                                                size={30}
                                                fillColor={colors.mainButton}
                                                unfillColor="#FFFFFF"
                                                iconStyle={{ borderColor: "black" }}
                                                innerIconStyle={{ borderWidth: 2 }}
                                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                onPress={(isChecked) => { }}
                                                style={{ marginHorizontal: 10, flex: 0.5 }}
                                            />
                                        </View>
                                        <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: colors.subButton, borderColor: colors.subButton, elevation: 10, justifyContent: 'space-between', width: '80%' }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18 }}>{step.stepName}</Text>
                                            </View>
                                            {step.stepTime !== null ?
                                                <View style={{ flexDirection: 'row', width: '20%', alignItems: 'center', marginLeft: '45%' }}>
                                                    <FontAwesomeIcon icon={faStopwatch} style={{ marginHorizontal: 5 }} size={20} color={colors.border} />
                                                    <Text style={{ fontSize: 18 }}>{step.stepTime}</Text>
                                                </View>
                                                : <Text></Text>}
                                            <View style={{ justifyContent: 'center' }}>
                                                <FontAwesomeIcon icon={faTrashCan} size={20} color='#BF4C41' />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, marginHorizontal: 10, padding: 8, borderRadius: 10, backgroundColor: colors.border, borderColor: colors.border, flex: 1, alignItems: 'center' }}
                                        onPress={() => showAddStepeModal(routine, routine.get('routineSteps'))}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Tilføj et nyt step</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ borderWidth: 1, marginHorizontal: 10, padding: 8, borderRadius: 10, backgroundColor: colors.border, borderColor: colors.border, flex: 1, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Slet rutine</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </AccordionItem>

                    ))}
                </View>
                <Modal
                    isVisible={isAddStepModalVisible}
                    onBackdropPress={() => setStepModalVisible(false)}>
                    <View style={{ backgroundColor: colors.background, padding: 10, borderWidth: 1, borderColor: colors.background, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                        <View>
                            <Text style={{ fontSize: 20, }}>Tilføj et navn til dit step</Text>
                            <TextInput
                                style={{ backgroundColor: 'white', fontSize: 16, marginVertical: 10, borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 5 }}
                                onChangeText={text => setStepName(text)}
                            ></TextInput>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ marginVertical: 10, fontSize: 20 }}>Vil du tilføje hvor lang tid det tager at fuldføre steppet?</Text>
                            <TextInput
                                style={{ backgroundColor: 'white', fontSize: 16, marginVertical: 10, borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 5 }}
                                onChangeText={text => setStepTime(Number(text))}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.mainButton, padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: colors.mainButton, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                        onPress={handleNewStepConfirm}
                    >
                        <Text style={{ fontSize: 26 }}>Tilføj et nyt step</Text>
                    </TouchableOpacity>
                </Modal>
                <Modal
                    isVisible={isRoutineModalVisible}
                    onBackdropPress={() => setRoutineModalVisible(false)}>
                    <View style={{ backgroundColor: colors.background, padding: 10, borderWidth: 1, borderColor: colors.background, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                        <View>
                            <Text style={{ fontSize: 20, }}>Giv din rutine et navn</Text>
                            <TextInput
                                style={{ backgroundColor: 'white', fontSize: 16, marginVertical: 10, borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 5 }}
                                onChangeText={text => setRoutineName(text)}
                            ></TextInput>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 20, marginVertical: 5 }} >Vælg en farve</Text>
                                <View style={styles.colorOptions}>
                                    <TouchableOpacity
                                        style={{
                                            borderWidth: routineColor === '#FAEDCB' ? 1.5 : 1,
                                            borderRadius: routineColor === '#FAEDCB' ? 30 : 20,
                                            width: routineColor === '#FAEDCB' ? 45 : 40,
                                            height: routineColor === '#FAEDCB' ? 45 : 40,
                                            backgroundColor: '#FAEDCB',
                                            borderColor: colors.border,
                                        }}
                                        onPress={() => handleColorPick('#FAEDCB')}></TouchableOpacity>
                                    <TouchableOpacity style={{
                                        borderWidth: routineColor === '#C9E4DE' ? 1.5 : 1,
                                        borderRadius: routineColor === '#C9E4DE' ? 30 : 20,
                                        width: routineColor === '#C9E4DE' ? 45 : 40,
                                        height: routineColor === '#C9E4DE' ? 45 : 40,
                                        backgroundColor: '#C9E4DE',
                                        borderColor: colors.border,
                                    }}
                                        onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
                                    <TouchableOpacity style={{
                                        borderWidth: routineColor === '#C6DEF1' ? 1.5 : 1,
                                        borderRadius: routineColor === '#C6DEF1' ? 30 : 20,
                                        width: routineColor === '#C6DEF1' ? 45 : 40,
                                        height: routineColor === '#C6DEF1' ? 45 : 40,
                                        backgroundColor: '#C6DEF1',
                                        borderColor: colors.border,
                                    }}
                                        onPress={() => handleColorPick('#C6DEF1')}></TouchableOpacity>
                                    <TouchableOpacity style={{
                                        borderWidth: routineColor === '#DBCDF0' ? 1.5 : 1,
                                        borderRadius: routineColor === '#DBCDF0' ? 30 : 20,
                                        width: routineColor === '#DBCDF0' ? 45 : 40,
                                        height: routineColor === '#DBCDF0' ? 45 : 40,
                                        backgroundColor: '#DBCDF0',
                                        borderColor: colors.border,
                                    }}
                                        onPress={() => handleColorPick('#DBCDF0')}></TouchableOpacity>
                                    <TouchableOpacity style={{
                                        borderWidth: routineColor === '#FFADAD' ? 1.5 : 1,
                                        borderRadius: routineColor === '#FFADAD' ? 30 : 20,
                                        width: routineColor === '#FFADAD' ? 45 : 40,
                                        height: routineColor === '#FFADAD' ? 45 : 40,
                                        backgroundColor: '#FFADAD',
                                        borderColor: colors.border,
                                    }}
                                        onPress={() => handleColorPick('#FFADAD')}></TouchableOpacity>
                                    <TouchableOpacity style={{
                                        borderWidth: routineColor === '#FFD6A5' ? 1.5 : 1,
                                        borderRadius: routineColor === '#FFD6A5' ? 30 : 20,
                                        width: routineColor === '#FFD6A5' ? 45 : 40,
                                        height: routineColor === '#FFD6A5' ? 45 : 40,
                                        backgroundColor: '#FFD6A5',
                                        borderColor: colors.border,
                                    }}
                                        onPress={() => handleColorPick('#FFD6A5')}></TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginVertical: 5, flexDirection: 'row' }}>
                                <View style={styles.rowView}>
                                    <TouchableOpacity onPress={showEmojiModal} style={[styles.buttonSmall, { backgroundColor: colors.subButton, borderColor: colors.border }]}>
                                        <Text style={styles.buttonText}>Emoji</Text>
                                    </TouchableOpacity>
                                    <Modal
                                        visible={emojiModalVisible}
                                        animationType="slide"
                                        transparent={true}
                                        onRequestClose={hideEmojiModal}
                                    >
                                        <View style={styles.modalContainer}>
                                            <View style={[styles.emojiPickerContainer, { backgroundColor: colors.background }]}>
                                                <EmojiPicker
                                                    emojis={emojis}
                                                    recent={recent}
                                                    loading={false}
                                                    darkMode={false}
                                                    perLine={6}
                                                    onSelect={chosenEmoji => {
                                                        setRoutineEmoji(chosenEmoji.emoji);
                                                        hideEmojiModal();
                                                    }}
                                                    onChangeRecent={setRecent}
                                                    backgroundColor={colors.background}
                                                />
                                            </View>
                                            <TouchableOpacity style={[styles.modalButton, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]} onPress={hideEmojiModal}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>LUK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                </View>
                                <View style={[styles.rowView, { alignItems: 'center' }]}>
                                    <Text style={{ fontSize: 26 }}> {routineEmoji}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.mainButton, padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: colors.mainButton, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                        onPress={() => saveRoutine()}
                    >
                        <Text style={{ fontSize: 26 }}>Tilføj en ny rutine</Text>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity
                    onPress={() => showRoutineModal()}
                    style={{ backgroundColor: colors.mainButton, padding: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.mainButton, borderRadius: 10, alignSelf: 'center', padding: 10, paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 26, }} >Tilføj ny rutine</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
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
    buttonSmall: {
        justifyContent: 'center',
        padding: 5,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 10
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
})

export default AddRoutine;
