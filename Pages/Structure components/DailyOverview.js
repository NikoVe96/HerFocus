import React, { useEffect, useState, useMemo, Component } from 'react';
import { SafeAreaView, Text, View, Dimensions, ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk, faFaceTired, faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan, faCircleArrowRight, faSpinner, faShoppingCart, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const DailyOverview = () => {

    const testArray = [
        { taskName: 'Make breakfast', taskTime: 5, taskType: 'Personal chore', icon: faStopwatch },
        { taskName: 'Brush teeth', taskTime: 2, taskType: 'Personal chore', icon: faStopwatch },
        { taskName: 'Bike to work', taskTime: 20, taskType: 'Work', icon: faStopwatch },
        { taskName: 'Meet with Julie', taskTime: null, taskType: 'Event', icon: faStopwatch },
        { taskName: "Dad's birthday", taskTime: null, taskType: 'Birthday', icon: faStopwatch },
        { taskName: 'Clean kicthen', taskTime: 30, taskType: 'House chore', icon: faStopwatch },
    ];
    const width = Dimensions.get('window').width;
    const [username, setUsername] = useState('');
    const [taskProgress, setTaskProgress] = useState();
    const [currentDate, setCurrentDate] = useState('');
    const [ID, setID] = useState('');
    const [remainingTasksArray, setRemainingTasks] = useState([]);
    const [completedTasksArray, setCompletedTasks] = useState([]);
    const [bouncyCheck, setBouncyCheck] = useState(false);

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
        todayDate();
        remainingTasks();
        completedTasks();
        taskPercentage();
    }, [username]);

    const taskCompleted = async function (task) {
        task.set('completed', true);
        await task.save();
        remainingTasks();
        completedTasks();
        setBouncyCheck(false);
    }

    const taskPercentage = async function () {
        if (completedTasksArray.length == 0) {
            setTaskProgress(0);
        } else {
            setTaskProgress(((completedTasksArray.length / (remainingTasksArray.length + completedTasksArray.length)) * 100).toFixed(0))
        }
    }

    function timeInHours(taskTime) {
        const remainder = taskTime % 60;
        const divide = (taskTime - remainder) / 60;
        if (divide == 1) {
            return <Text style={{ fontSize: 18 }}>{divide} hour and {remainder} minutes</Text>
        } else {
            return <Text style={{ fontSize: 18 }}>{divide} hours and {remainder} minutes</Text>
        }
    }

    function todayDate() {
        const today = new Date;
        const day = today.getDate();
        let month;

        switch (today.getMonth()) {
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
        const year = today.getFullYear();
        fullDay = day + ' ' + month + ' ' + year;
        setCurrentDate(fullDay);
    }

    async function remainingTasks() {
        let TaskQuery = new Parse.Query('Task');
        TaskQuery.contains('user', ID);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', false);
        TaskQuery.ascending('startTime')
        let Results = await TaskQuery.find();
        setRemainingTasks(Results);
    }

    async function completedTasks() {
        let TaskQuery = new Parse.Query('Task');
        TaskQuery.contains('user', ID);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', true);
        TaskQuery.ascending('startTime')
        let Results = await TaskQuery.find();
        setCompletedTasks(Results);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 10 }}>How are you today {username}?</Text>
                <View style={{ alignItems: 'center' }}>
                    <CircularProgress
                        value={taskProgress}
                        inActiveStrokeColor={'#2ecc71'}
                        inActiveStrokeOpacity={0.2}
                        progressValueColor={'black'}
                        valueSuffix={'%'}
                        activeStrokeColor={'#2465FD'}
                        activeStrokeSecondaryColor={'#C25AFF'}
                        radius={90}
                    />
                </View>
                <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>You've completed {taskProgress}% of your tasks today. Keep going!</Text>
                <View style={{ borderWidth: 1, borderColor: 'black', width: 300, alignSelf: 'center', marginVertical: 10 }}></View>
            </View>
            <View style={{ flex: 1, margin: 10, backgroundColor: 'grey' }}>
                <Swiper
                    loop={false}
                    showsPagination={true}
                    dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 150, height: 8, borderRadius: 4, marginHorizontal: 4 }}
                    activeDotStyle={{ backgroundColor: '#000', width: 150, height: 8, borderRadius: 4, marginHorizontal: 4 }}
                    paginationStyle={{ bottom: 10 }}
                >
                    <View style={{
                        flex: 1,
                    }}>
                        {remainingTasksArray.length === 0 ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Loading...</Text>
                            </View>
                        ) : (
                            <>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, marginBottom: 30 }}>Up next 1</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesomeIcon icon={faFaceSmileBeam} size={35} />
                                    <Text style={{ fontSize: 24, marginHorizontal: 10 }}>{remainingTasksArray[0].get('name')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                                    <FontAwesomeIcon icon={faStopwatch} size={20} style={{ marginHorizontal: 5 }} />
                                    <Text>From {remainingTasksArray[0].get('startTime')} to {remainingTasksArray[0].get('endTime')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                                        <BouncyCheckbox
                                            size={25}
                                            fillColor="black"
                                            unfillColor="#FFFFFF"
                                            iconStyle={{ borderColor: "black" }}
                                            innerIconStyle={{ borderWidth: 2 }}
                                            onPress={(isChecked) => { taskCompleted(remainingTasksArray[0]) }}
                                            isChecked={bouncyCheck}
                                        />
                                        <Text style={{ fontSize: 18 }}>Completed?</Text>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faFaceTired} size={25} />
                                        <Text style={{ fontSize: 18, marginLeft: 12 }}>Hit the wall?</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                    </View>
                    <View style={{
                        flex: 1,

                    }}>
                        {remainingTasksArray.length === 0 ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Loading...</Text>
                            </View>
                        ) : (
                            <>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, marginBottom: 30 }}>Up next 2</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesomeIcon icon={faFaceSmileBeam} size={35} />
                                    <Text style={{ fontSize: 24, marginHorizontal: 10 }}>{remainingTasksArray[1].get('name')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                                    <FontAwesomeIcon icon={faStopwatch} size={20} />
                                    <Text>From {remainingTasksArray[1].get('startTime')} to {remainingTasksArray[1].get('endTime')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                                        <BouncyCheckbox
                                            size={25}
                                            fillColor="black"
                                            unfillColor="#FFFFFF"
                                            iconStyle={{ borderColor: "black" }}
                                            innerIconStyle={{ borderWidth: 2 }}
                                            onPress={(isChecked) => { taskCompleted(remainingTasksArray[1]) }}
                                            style={{}}
                                        />
                                        <Text style={{ fontSize: 18 }}>Completed?</Text>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faFaceTired} size={25} />
                                        <Text style={{ fontSize: 18, marginLeft: 12 }}>Hit the wall?</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                    </View>
                </Swiper>
            </View>
        </SafeAreaView>
    );

}

export default DailyOverview;