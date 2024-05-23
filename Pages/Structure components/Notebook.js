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
import {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Modal from "react-native-modal";
import AddTask from "./AddTask";
import Parse from 'parse/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TextInput } from "react-native-gesture-handler";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";

export const Notebook = () => {

    const { colors } = useTheme();
    const [page, setPage] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [toDoList, setToDoList] = useState([]);
    const [toDoDate, setToDoDate] = useState('');
    const [todoStartTime, setTodoStartTime] = useState('');
    const [todoEndTime, setTodoEndTime] = useState('');
    const [todo, setTodo] = useState('');
    const [notes, setNotes] = useState([]);
    const [moduleAnswers, setModuleAnswers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isToDoModalVisible, setToDoModalVisible] = useState(false);
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
    const [isToCalendarModalVisible, setToCalendarModalVisible] = useState(false);
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [updatedNoteContent, setUpdatedNoteContent] = useState({});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    useEffect(() => {
        notesQuery();
        ToDoQuery();
    }, []);

    useFocusEffect(
      useCallback(() => {
         fetchModuleAnswers();
        return () => {};
      }, []),
    );

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

    async function getCompletedModules(){
        const currentUser = await Parse.User.currentAsync(); 
        
    }


    async function ToDoQuery() {
        const currentUser = await Parse.User.currentAsync();

        let todoQuery = new Parse.Query('Task');
        todoQuery.equalTo('user', currentUser);
        todoQuery.equalTo('futureTask', true);
        const todoResult = await todoQuery.find();
        console.log('todos: ' + todoResult);

        setToDoList(todoResult);
    }

    async function notesQuery() {
      const currentUser = await Parse.User.currentAsync();

      let notesQuery = new Parse.Query('Notebook');
      notesQuery.equalTo('user', currentUser);
      notesQuery.include('notes');
      const notesResult = await notesQuery.find();
     
      if (notesResult.length > 0 && notesResult[0].get('notes')) {
        console.log('notes: ' + notesResult[0].get('notes'));
        setNotes(notesResult[0].get('notes'));
      } else {
        setNotes([]);
      }
    }

       async function fetchModuleAnswers() {
           const currentUser = await Parse.User.currentAsync();
           let ModuleAnswers = new Parse.Query('ModuleAnswers');
           ModuleAnswers.equalTo('user', currentUser);
           try {
             const result = await ModuleAnswers.find();
             setModuleAnswers(result);
             console.log('exercises:' + result);
           } catch (error) {
             console.log('Error while fecthing answers');
           }
         }


    async function saveNewNote() {
      try {
        const newNote = new Parse.Object('Note');
        newNote.set('name', noteName);
        newNote.set('content', noteContent);
        await newNote.save();
        console.log('New note saved:', newNote);

        const currentUser = await Parse.User.currentAsync();
        console.log('Current user:', currentUser);

        let notebookQuery = new Parse.Query('Notebook');
        notebookQuery.equalTo('user', currentUser);
        const notebookResults = await notebookQuery.find();
        console.log('Notebook results:', notebookResults);

        if (notebookResults.length > 0) {
          let notebookResult = notebookResults[0];
          let newNotesList = notebookResult.get('notes');
          console.log('Current notes list:', newNotesList);

          newNotesList.push(newNote);
          console.log('Updated notes list:', newNotesList);
          notebookResult.set('notes', newNotesList);
          await notebookResult.save();
          console.log('Notebook updated:', notebookResult);

          await notesQuery();

          console.log('Success: note saved');
          Alert.alert('Din note er blevet gemt!');
          setNoteContent('');
          setNoteName('');
          setNotesModalVisible(false);
        } else {
          Alert.alert('Notesbog ikke fundet');
        }
      } catch (error) {
        console.log('Error saving new note:', error);
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

    const handleDateConfirm = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        setToDoDate(formattedDate);
        console.log('Selected date:', formattedDate);
        setDatePickerVisibility(false);
    };

    const toCalendarModal = (task) => {
        console.log(task);
        setTodo(task);
        setToCalendarModalVisible(true);
    }

    async function moveToCalendar() {
        todo.set('startTime', todoStartTime);
        todo.set('endTime', todoEndTime);
        todo.set('date', toDoDate);
        todo.set('futureTask', false);
        await todo.save();

        ToDoQuery();

        setToCalendarModalVisible(false);
        Alert.alert(todo.get('name') + ' er blevet rykket til din kalender!');
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

        setTodoStartTime(hours
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

        setTodoEndTime(hours
            + ':' + minutes);

        setEndTimePickerVisibility(false);
    };

 

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
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 26,
                        textAlign: 'center',
                        marginBottom: '5%',
                        marginTop: '10%',
                      }}>
                      Udførte øvelser
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: 'center',
                        marginBottom: '5%',
                      }}>
                      Her kan du finde de øvelser du har fuldført i
                      læringsmodulet
                    </Text>
                    {moduleAnswers.map((moduleAnswer, index) => (
                      <View key={index}>
                        <Text style={{fontSize: 20, marginBottom: '2%'}}>
                          {moduleAnswer.get('module')}
                        </Text>
                        <View
                          style={[
                            styles.seperator,
                            {backgroundColor: colors.text},
                          ]}></View>
                        {moduleAnswer.get('answers').map((answer, idx) => (
                          <View key={idx}>
                            <Text style={{fontWeight: 'bold'}}>{answer.exercise}</Text>
                            <Text style={{marginBottom: 10}}>{answer.answer}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
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
                                <TouchableOpacity style={{ flex: 7, alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 10 }}
                                    onLongPress={() => toCalendarModal(item)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, marginRight: 10, }}>{item.get('emoji')}</Text>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14 }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                    </View>
                                    <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                    <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
                                </TouchableOpacity>
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
                        <Modal
                            isVisible={isToCalendarModalVisible}
                            onBackdropPress={() => setToCalendarModalVisible(false)}>
                            <View style={{ backgroundColor: colors.background, padding: 10, borderWidth: 1, borderColor: colors.background, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                                <View>

                                    <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                        <View style={styles.rowView}>
                                            <TouchableOpacity
                                                style={[styles.buttonSmall, { backgroundColor: colors.subButton, borderColor: colors.subButton }]}
                                                onPress={() => setStartTimePickerVisibility(true)}>
                                                <Text style={styles.buttonText}>Start tidspunkt</Text>
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isStartTimePickerVisible}
                                                mode="time"
                                                onConfirm={(date) => handleStartTimeConfirm(date)}
                                                onCancel={() => setStartTimePickerVisibility(false)}
                                            />
                                        </View>
                                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                                            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                                                {todoStartTime}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                        <View style={styles.rowView}>
                                            <TouchableOpacity
                                                style={[styles.buttonSmall, { backgroundColor: colors.subButton, borderColor: colors.subButton }]}
                                                onPress={() => setEndTimePickerVisibility(true)}>
                                                <Text style={styles.buttonText}>Slut tidspunkt</Text>
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isEndTimePickerVisible}
                                                mode="time"
                                                onConfirm={(date) => handleEndTimeConfirm(date)}
                                                onCancel={() => setEndTimePickerVisibility(false)}
                                            />
                                        </View>
                                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                                            <Text style={[styles.text, { fontWeight: 'bold' }]} >
                                                {todoEndTime}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                        <View style={styles.rowView}>
                                            <TouchableOpacity
                                                style={[styles.buttonSmall, { backgroundColor: colors.subButton, borderColor: colors.subButton }]}
                                                onPress={() => setDatePickerVisibility(true)}>
                                                <Text style={styles.buttonText}>Dato</Text>
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={(date) => handleDateConfirm(date)}
                                                onCancel={() => setDatePickerVisibility(false)}
                                            />
                                        </View>
                                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                                            <Text style={[styles.text, { fontWeight: 'bold' }]}
                                            >
                                                {toDoDate}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.buttonSmall, { backgroundColor: colors.subButton, borderColor: colors.subButton }]}
                                        onPress={() => moveToCalendar()}>
                                        <Text style={styles.buttonText}>Tilføj til kalender</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{ backgroundColor: colors.border, alignItems: 'center', height: '7%', justifyContent: 'center', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                                onPress={() => setToCalendarModalVisible(false)}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>LUK</Text>
                            </TouchableOpacity>
                        </Modal>

                    </View>
                );
                break;
            case 'notes':
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '5%',
                    }}>
                    <Text style={{fontSize: 26, marginBottom: '5%'}}>
                      Noter
                    </Text>
                    {notes && notes.length > 0 ? (
                      notes.map((item, index) => (
                        <AccordionItem
                          key={item.id || index}
                          title={item.get('name')}
                          icon={null}>
                          <TextInput
                            style={{
                              backgroundColor: 'white',
                              borderWidth: 1,
                              borderColor: 'white',
                              borderRadius: 10,
                              fontSize: 16,
                              padding: '2%',
                            }}
                            value={
                              updatedNoteContent[item.id] || item.get('content')
                            }
                            onChangeText={text =>
                              setUpdatedNoteContent({
                                ...updatedNoteContent,
                                [item.id]: text,
                              })
                            }
                            multiline={true}
                            numberOfLines={12}
                            textAlignVertical={'top'}></TextInput>
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
                              alignSelf: 'flex-end',
                            }}
                            onPress={() =>
                              updateNote(item, updatedNoteContent[item.id])
                            }>
                            <Text style={{fontSize: 16}}>Opdater note</Text>
                          </TouchableOpacity>
                        </AccordionItem>
                      ))
                    ) : (
                      <Text>
                      </Text>
                    )}
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
                        width: '50%',
                      }}
                      onPress={() => setNotesModalVisible(true)}>
                      <Text style={{fontSize: 18}}>Tilføj en ny note</Text>
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
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              marginLeft: '20%',
                              marginBottom: '10%',
                            }}>
                            {' '}
                            Tilføj en ny note
                          </Text>
                          <TouchableOpacity
                            onPress={() => setNotesModalVisible(false)}>
                            <FontAwesomeIcon icon={faCircleXmark} size={25} />
                          </TouchableOpacity>
                        </View>
                        <Text style={{fontSize: 18}}>
                          Hvad skal din note hedde?
                        </Text>
                        <TextInput
                          style={{
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'white',
                            borderRadius: 10,
                            fontSize: 20,
                            padding: '2%',
                            marginVertical: '5%',
                          }}
                          onChangeText={text => setNoteName(text)}
                          value={noteName}></TextInput>
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
                          textAlignVertical={'top'}></TextInput>
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
                            alignSelf: 'center',
                          }}
                          onPress={() => saveNewNote()}>
                          <Text style={{fontSize: 18}}>Gem note</Text>
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
    justifyContent: 'center',
  },
  menu: {},
  rowView: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: 5,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  seperator: {
    width: 250,
    height: 1,
    marginBottom: 5,
    marginTop: 5,
  },
});
export default Notebook;


