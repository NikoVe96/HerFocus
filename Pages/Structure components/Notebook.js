import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import AccordionItem from "../../Components/AccordionItem";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faAngleRight,
    faAngleLeft,
    faPencil,
    faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
    faNoteSticky,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import AddTask from "./AddTask";
import Parse from 'parse/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TextInput } from "react-native-gesture-handler";
import { icon } from "@fortawesome/fontawesome-svg-core";

export const Notebook = () => {

    const { colors } = useTheme();
    const [page, setPage] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [toDoList, setToDoList] = useState([]);
    const [notes, setNotes] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isToDoModalVisible, setToDoModalVisible] = useState(false);
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [updatedNoteContent, setUpdatedNoteContent] = useState({});

    useEffect(() => {

        notesQuery();
        ToDoQuery();
    }, []);

    function handleMenuClick(page) {
        setPage(page);
    }

    function toggleMenu() {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const showToDoModal = () => {
        setToDoModalVisible(true);
    }

    const hideToDoModal = () => {
        setToDoModalVisible(false);
    }


    async function ToDoQuery() {
        const currentUser = await Parse.User.currentAsync();

        let todoQuery = new Parse.Query('Notebook');
        todoQuery.equalTo('user', currentUser);
        todoQuery.include('todo');
        const todoResult = await todoQuery.find();
        console.log('todos: ' + todoResult[0].get('todo'));

        setToDoList(todoResult[0].get('todo'));
    }

    async function notesQuery() {
        const currentUser = await Parse.User.currentAsync();

        let notesQuery = new Parse.Query('Notebook');
        notesQuery.equalTo('user', currentUser);
        notesQuery.include('notes');
        const notesResult = await notesQuery.find();
        console.log('notes: ' + notesResult[0].get('notes'));

        setNotes(notesResult[0].get('notes'));
    }

    async function saveNewNote() {
        try {
            const newNote = new Parse.Object('Note');
            newNote.set('name', noteName);
            newNote.set('content', noteContent);
            await newNote.save();

            const currentUser = await Parse.User.currentAsync();
            let notebook = new Parse.Query('Notebook');
            notebook.equalTo('user', currentUser);
            const notebookResult = await notebook.first();


            let newNotesList = notebookResult.get('notes');
            newNotesList.push(newNote);
            console.log('New list: ' + newNotesList);
            notebookResult.set('notes', newNotesList);
            await notebookResult.save();

            await notesQuery();

            console.log('Success: note saved')
            Alert.alert('Din note er blevet gemt!');
            setNoteContent('');
            setNoteName('');
            setNotesModalVisible(false);
        } catch (error) {
            console.log('Error saving new note: ', error);
        }
    }

    async function updateNote(note, content) {
        note.set('content', content);
        try {
            await note.save();
            Alert.alert('Din note er blevet gemt!');
            notesQuery();
        } catch (error) {
            console.error('Failed to save note:', error);
            Alert.alert('Fejl. Noten kunne ikke gemmes');
        }
    }

    const pages = () => {
        switch (page) {
            case '':

                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, textAlign: 'center' }}>Hvad vil du lave i dag?</Text>
                    </View>
                );
            case 'exercises':
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Udførte øvelser</Text>
                        <Text>Her kan du finde de øvelser du har fuldført i læringsmodulet</Text>
                    </View>
                );
                break;
            case 'to-do':
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                        <Text style={{ fontSize: 26, marginBottom: '5%' }}>Fremtidige to-dos</Text>
                        {toDoList.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
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
                                <View style={{ flex: 7, alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, marginRight: 10, }}>{item.get('emoji')}</Text>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14 }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                    </View>
                                    <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                    <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
                                </View>
                            </View>
                        ))}
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                backgroundColor: colors.subButton,
                                borderColor: colors.subButton,
                                borderRadius: 10,
                                padding: 10,
                                elevation: 10,
                                marginVertical: '20%',

                            }}
                            onPress={() => setToDoModalVisible(true)}>
                            <Text style={{ fontSize: 18 }}>Tilføj en ny to-do</Text>
                        </TouchableOpacity>
                        <Modal
                            isVisible={isToDoModalVisible}
                            onBackdropPress={() => setToDoModalVisible(false)}>
                            <View style={{ backgroundColor: colors.background, padding: 10, borderWidth: 1, borderColor: colors.background, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                                <AddTask />
                            </View>
                            <TouchableOpacity
                                style={{ backgroundColor: colors.border, alignItems: 'center', height: '7%', justifyContent: 'center', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                                onPress={() => setToDoModalVisible(false)}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>LUK</Text>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                );
                break;
            case 'notes':
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                        <Text style={{ fontSize: 26, marginBottom: '5%' }}>Noter</Text>
                        {notes.map((item, index) => (
                            <AccordionItem key={item.id || index} title={item.get('name')} icon={null}>
                                <TextInput
                                    style={{
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 10,
                                        fontSize: 16,
                                        padding: '2%',
                                    }}
                                    value={updatedNoteContent[item.id] || item.get('content')}
                                    onChangeText={text => setUpdatedNoteContent({ ...updatedNoteContent, [item.id]: text })}
                                    multiline={true}
                                    numberOfLines={12}
                                    textAlignVertical={'top'}>
                                </TextInput>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        backgroundColor: colors.subButton,
                                        borderColor: colors.subButton,
                                        borderRadius: 10,
                                        padding: 10,
                                        elevation: 10,
                                        marginVertical: '5%',
                                        alignItems: 'center',
                                        width: '40%',
                                        alignSelf: 'flex-end'

                                    }}
                                    onPress={() => updateNote(item, updatedNoteContent[item.id])}>
                                    <Text style={{ fontSize: 16 }}>Opdater note</Text>
                                </TouchableOpacity>
                            </AccordionItem>
                        ))}
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                backgroundColor: colors.subButton,
                                borderColor: colors.subButton,
                                borderRadius: 10,
                                padding: 10,
                                elevation: 10,
                                marginVertical: '20%',
                                alignItems: 'center',
                                width: '50%'

                            }}
                            onPress={() => setNotesModalVisible(true)}>
                            <Text style={{ fontSize: 18 }}>Tilføj en ny note</Text>
                        </TouchableOpacity>
                        <Modal
                            isVisible={isNotesModalVisible}
                            onBackdropPress={() => setNotesModalVisible(false)}>
                            <View
                                style={{
                                    backgroundColor: colors.background,
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.background,
                                    borderRadius: 10,
                                }}>
                                <View style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{ fontSize: 24, marginLeft: '20%', marginBottom: '10%' }}> Tilføj en ny note</Text>
                                    <TouchableOpacity onPress={() => setNotesModalVisible(false)}>
                                        <FontAwesomeIcon icon={faCircleXmark} size={25} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 18 }}>Hvad skal din note hedde?</Text>
                                <TextInput
                                    style={{
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 10,
                                        fontSize: 20,
                                        padding: '2%',
                                        marginVertical: '5%'
                                    }}
                                    onChangeText={text => setNoteName(text)}
                                    value={noteName}>
                                </TextInput>
                                <TextInput
                                    style={{
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 10,
                                        fontSize: 16,
                                        padding: '2%',
                                    }}
                                    onChangeText={text => setNoteContent(text)}
                                    value={noteContent}
                                    multiline={true}
                                    numberOfLines={12}
                                    textAlignVertical={'top'}>
                                </TextInput>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        backgroundColor: colors.subButton,
                                        borderColor: colors.subButton,
                                        borderRadius: 10,
                                        padding: 10,
                                        elevation: 10,
                                        marginVertical: '10%',
                                        alignItems: 'center',
                                        width: '50%',
                                        alignSelf: 'center'

                                    }}
                                    onPress={() => saveNewNote()}>
                                    <Text style={{ fontSize: 18 }}>Gem note</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                );
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: colors.mainButton,
                    width: isOpen ? '40%' : '15%'
                }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: 'flex-end', alignSelf: 'flex-end', marginBottom: '50%', flex: 0.5 }}>
                    {isOpen ?
                        <TouchableOpacity onPress={() => toggleMenu()}>
                            <FontAwesomeIcon icon={faAngleLeft} size={30} />
                        </TouchableOpacity >
                        : <TouchableOpacity onPress={() => toggleMenu()}>
                            <FontAwesomeIcon icon={faAngleRight} size={30} />
                        </TouchableOpacity>}
                </View>
                <View style={{ justifyContent: 'space-evenly', flex: 6 }}>
                    <TouchableOpacity onPress={() => handleMenuClick('notes')}>
                        {isOpen ?
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-evenly' }}>
                                <FontAwesomeIcon icon={faNoteSticky} size={30} style={{ flex: 1, marginRight: 15 }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>Noter</Text>
                            </View>
                            : <View style={{ alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faNoteSticky} size={30} />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMenuClick('exercises')}>
                        {isOpen ?
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-evenly' }}>
                                <FontAwesomeIcon icon={faPencil} size={30} style={{ flex: 1, marginRight: 15 }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>Udførte øvelser</Text>
                            </View>
                            : <View style={{ alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faPencil} size={30} />
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMenuClick('to-do')}>
                        {isOpen ?
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-evenly' }}>
                                <FontAwesomeIcon icon={faListCheck} size={30} style={{ flex: 1, marginRight: 15 }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>To-do</Text>
                            </View>
                            : <View style={{ alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faListCheck} size={30} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {pages()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    menu: {


    }
})
export default Notebook;


