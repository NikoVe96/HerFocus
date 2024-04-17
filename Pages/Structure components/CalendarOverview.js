import React, { useEffect, useState, useMemo, Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Calendar, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk, faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan, faCircleArrowRight, faCakeCandles, faEgg } from '@fortawesome/free-solid-svg-icons';
import RadioGroup from 'react-native-radio-buttons-group';
import CalendarStrip from 'react-native-calendar-strip';
import BouncyCheckbox from "react-native-bouncy-checkbox";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const CalendarOverview = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [dayTasksArray, setDayTasksArray] = useState([]);
    const [selectedId, setSelectedId] = useState('month');
    const [username, setUsername] = useState('');

    const allDayArray = [
        { taskName: "Dad's birthday", icon: faCakeCandles, color: 'red' },
        { taskName: "Påske", icon: faEgg, color: 'yellow' },
    ];
    /*const marked = {
        '2024-03-22': { dots: [houseChores, birthday] },
        '2024-03-23': { dots: [houseChores, event, birthday] },
        '2024-03-24': { dots: [event, relaxing] },
    };*/
    const [markedDaysArray, setMarkedDaysArray] = useState([]);
    const width = Dimensions.get('window').width;
    const [checked, setChecked] = useState(false);
    const [chosenDate, setChosenDate] = useState('');
    const [ID, setID] = useState('');

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
        getMarkedDates();
    }, [username]);

    const showDayModal = (day) => {
        dayTasks(day);
        setModalVisible(true);

    }

    const hideDayModel = () => {
        setModalVisible(false);
    }

    async function dayTasks(day) {
        let month;

        switch (day.month) {
            case 1:
                month = 'Jan'
                break;
            case 2:
                month = 'Feb'
                break;
            case 3:
                month = 'Mar'
                break;
            case 4:
                month = 'Apr'
                break;
            case 5:
                month = 'May'
                break;
            case 6:
                month = 'Jun'
                break;
            case 7:
                month = 'Jul'
                break;
            case 8:
                month = 'Aug'
                break;
            case 9:
                month = 'Sep'
                break;
            case 10:
                month = 'Oct'
                break;
            case 11:
                month = 'Nov'
                break;
            case 12:
                month = 'Dec'
                break;
            default:
                break;
        }
        fullDay = day.day + ' ' + month + ' ' + day.year;
        setChosenDate(fullDay);

        let TaskQuery = new Parse.Query('Task');
        TaskQuery.contains('user', ID);
        TaskQuery.contains('date', chosenDate);
        TaskQuery.ascending('startTime')
        let Results = await TaskQuery.find();
        setDayTasksArray(Results);
    }

    const radioButtons = useMemo(() => ([
        {
            id: 'month',
            label: 'Month',
            value: 'month',
            size: 30,
        },
        {
            id: 'day',
            label: 'Day',
            value: 'day',
            size: 30,
        }
    ]), []);

    const handleCheckboxPress = () => {
        setChecked(prev => {
            return !prev
        })
    }

    async function getMarkedDates() {

        let taskDaysQuery = new Parse.Query('Task');
        taskDaysQuery.contains('user', ID);
        taskDaysQuery.ascending('date');
        const taskResults = await taskDaysQuery.find();

        let eventDaysQuery = new Parse.Query('Events');
        eventDaysQuery.contains('user', ID);
        eventDaysQuery.ascending('date');
        const eventResults = await eventDaysQuery.find();

        // might be a better way to do this, but can't get the query.filter to work
        let daysArray = [];
        taskResults.forEach(element => {
            if (!daysArray.includes(element.get('date'))) {
                daysArray.push(element.get('date'));
            }
        });
        eventResults.forEach(element => {
            if (!daysArray.includes(element.get('date'))) {
                daysArray.push(element.get('date'));
            }
        });

        let marked = new Set();
        daysArray.forEach(element => {
            const dayEvents = getDayEvents(element);
            marked.add({ element, dayEvents });
            console.log(marked);
        })

        console.log(daysArray);
    }

    async function getDayEvents(day) {
        let taskQuery = new Parse.Query('Task');
        let eventQuery = new Parse.Query('Events');

        taskQuery.contains('user', ID);
        taskQuery.contains('date', day);
        const tResult = await taskQuery.find();
        console.log('Tasks: ' + tResult);

        eventQuery.contains('user', ID);
        eventQuery.contains('date', day);
        const eResult = await eventQuery.find();
        console.log('Events: ' + eResult);

        let allEvents = [];
        console.log('All events: ' + allEvents);
        return allEvents;
    }

    function calendarLayout() {
        if (selectedId === 'month') {
            return (
                <Calendar
                    showWeekNumbers={true}
                    firstDay={1}
                    headerStyle={{ backgroundColor: 'lightblue' }}
                    enableSwipeMonths={true}
                    onDayPress={day => showDayModal(day)}
                    style={{ padding: 15, marginVertical: 20 }}
                    markingType='multi-dot'
                //markedDates={marked}
                >
                </Calendar>
            );
        } else if (selectedId === 'day') {
            return (
                <View>
                    <CalendarStrip
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                        style={{ height: 100, padding: 5, marginTop: 20, marginHorizontal: 10, borderWidth: 1, borderColor: 'lightblue', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                        calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
                        calendarColor={'lightblue'}
                        dateNumberStyle={{ color: 'white', fontSize: 18 }}
                        dateNameStyle={{ color: 'white', fontSize: 12 }}
                        highlightDateNumberStyle={{ color: 'blue', fontSize: 18 }}
                        highlightDateNameStyle={{ color: 'blue', fontSize: 12 }}
                        iconContainer={{ flex: 0.1 }}
                        onDateSelected={Date => dayTasks(Date)}
                        scrollable={true}>
                    </CalendarStrip>
                    <View style={{ backgroundColor: 'lightgrey', borderWidth: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderColor: 'lightgrey', marginHorizontal: 10 }}>
                        <View style={{ alignItems: 'center', marginVertical: 10, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }}>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>Plan of the day</Text>
                            </View>
                        </View>
                        <ScrollView style={{ height: 250 }}>
                            {dayTasksArray.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <BouncyCheckbox
                                        size={30}
                                        fillColor="black"
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "black" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                        onPress={(isChecked) => { }}
                                        style={{ marginHorizontal: 10, flex: 0.5 }}
                                    />
                                    <View style={{ flex: 7, alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.color }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faStopwatch} size={18} style={{ marginHorizontal: 5 }}></FontAwesomeIcon>
                                            <Text style={{ marginHorizontal: 1, fontSize: 14 }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                        </View>
                                        <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                        <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
                                    </View>
                                </View>
                            ))}
                            <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 20, backgroundColor: 'black', width: 250, alignSelf: 'center' }}></View>
                            {allDayArray.map((item, index) => (
                                <View key={index} style={{ alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.color }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faStopwatch} size={18} style={{ marginHorizontal: 5 }}></FontAwesomeIcon>
                                        <Text style={{ marginHorizontal: 1, fontSize: 18 }}>{item.taskTime}</Text>
                                    </View>
                                    <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                    <Text style={{ fontSize: 18 }}>{item.taskName}</Text>

                                </View>
                            ))}
                        </ScrollView>
                    </View >
                </View >
            );
        }
    }



    return (
        <SafeAreaView>
            <View style={{ alignContent: 'stretch', justifyContent: 'center' }}>
                <View style={{ alignContent: 'stretch', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Calendar page</Text>
                </View>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginBottom: 20, backgroundColor: 'black' }}></View>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='row'
                    containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    size={30}
                />
                <View>
                    {calendarLayout()}
                </View>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={{}}>
                    <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ fontSize: 24, }}>Tasks and events on</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{chosenDate}</Text>
                        </View>
                        <View style={{ borderWidth: 1, backgroundColor: 'black', borderRadius: 50, width: 300, marginBottom: 20 }}></View>
                        <View style={{ backgroundColor: 'lightgrey', borderWidth: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderColor: 'lightgrey', marginHorizontal: 10 }}>

                            <ScrollView style={{ maxHeight: 250 }}>
                                {dayTasksArray.map((item, index) => (
                                    <View key={index} style={{ alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.color }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faStopwatch} size={18} style={{ marginHorizontal: 5 }}></FontAwesomeIcon>
                                            <Text style={{ marginHorizontal: 1, fontSize: 14 }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                        </View>
                                        <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                        <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
                                    </View>
                                ))}
                                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 20, backgroundColor: 'black', width: 250, alignSelf: 'center' }}></View>
                                {allDayArray.map((item, index) => (
                                    <View key={index} style={{ alignItems: 'center', padding: 2, borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.color }}>
                                        <FontAwesomeIcon icon={item.icon} size={18} style={{ marginHorizontal: 5 }}></FontAwesomeIcon>
                                        <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                        <Text style={{ fontSize: 18 }}>{item.taskName}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View >
                        <View>
                            <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 5, marginVertical: 20 }} onPress={hideDayModel}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'lightblue', padding: 10, alignItems: 'center', marginHorizontal: 5 }} onPress={() => navigation.navigate('Add task')}>
                        <FontAwesomeIcon icon={faPlusSquare} size={26} style={{ marginRight: 10 }}></FontAwesomeIcon>
                        <Text style={{ fontSize: 18 }}>Add new task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'lightblue', padding: 10, alignItems: 'center', marginHorizontal: 5 }} onPress={() => navigation.navigate('Add event')}>
                        <FontAwesomeIcon icon={faPlusSquare} size={26} style={{ marginRight: 10 }}></FontAwesomeIcon>
                        <Text style={{ fontSize: 18 }}>Add new event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    slide5: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen'
    },
    image: {
        width: 50,
        height: 50,
        margin: 20
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default CalendarOverview;