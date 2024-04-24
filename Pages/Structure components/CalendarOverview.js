import React, { useEffect, useState, useMemo, Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions, Pressable, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk, faFaceSmileBeam, faCircleCheck, faCalendarXmark } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan, faCircleArrowRight, faCakeCandles, faEgg, faPlus, faListCheck, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import RadioGroup from 'react-native-radio-buttons-group';
import CalendarStrip from 'react-native-calendar-strip';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '@react-navigation/native';
import PopUpMenu from '../../Components/PopUpMenu';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import BottomNavigation from '../../Navigation/BottomNav';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const CalendarOverview = ({ navigation }) => {

    const { colors } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [dayTasksArray, setDayTasksArray] = useState([]);
    const [selectedId, setSelectedId] = useState('month');
    const [username, setUsername] = useState('');

    const allDayArray = [
        { taskName: "Dad's birthday", color: 'lightblue', emoji: '😝' },
        { taskName: "Påske", color: 'lightyellow', emoji: '😝' },
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
    LocaleConfig.locales['da'] = {
        monthNames: [
            'Januar',
            'Februar',
            'Marts',
            'April',
            'Maj',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
        dayNames: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
        dayNamesShort: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'],
        today: "I dag"
    }

    LocaleConfig.defaultLocale = 'da';

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
    }, [chosenDate]);

    async function showDayModal(day) {
        const formattedDate = `${day.year}-${day.month.toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`;
        setChosenDate(formattedDate);
        console.log('Formatted date set for modal:', formattedDate);

        await getDayEvents();
        setModalVisible(true);

    }

    async function getDayEvents() {
        let taskQuery = new Parse.Query('Task');
        let eventQuery = new Parse.Query('Events');
        taskQuery.contains('user', ID);
        taskQuery.equalTo('date', chosenDate);
        taskQuery.ascending('startTime');
        const tResult = await taskQuery.find();
        //console.log(tResult)

        eventQuery.contains('user', ID);
        eventQuery.contains('date', chosenDate);
        const eResult = await eventQuery.find();
        //console.log(eResult);

        let allEvents = tResult.concat(eResult);
        setDayTasksArray(allEvents);

        return allEvents;
    }

    const hideDayModel = () => {
        setModalVisible(false);
    }

    async function dayTasks(day) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[day.getMonth()];
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
            color: colors.bars
        },
        {
            id: 'day',
            label: 'Day',
            value: 'day',
            size: 30,
            color: colors.bars
        }
    ]), []);

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

        })


    }

    function calendarLayout() {
        if (selectedId === 'month') {
            return (
                <Calendar
                    showWeekNumbers={true}
                    firstDay={1}
                    headerStyle={{ backgroundColor: colors.mainButton, borderWidth: 1, borderColor: colors.divider, borderRadius: 10, }}
                    enableSwipeMonths={true}
                    onDayPress={(day) => showDayModal(day)}
                    style={{ padding: 20, marginVertical: 20, borderWidth: 1, marginHorizontal: 5, borderRadius: 10, borderColor: colors.border, shadowOffset: { width: 20, height: 20 } }}
                    markingType='multi-dot'
                    theme={{ selectedDayBackgroundColor: colors.mainButton, arrowColor: colors.bars, textSectionTitleColor: 'white', selectedDayTextColor: colors.background, dayTextColor: colors.border, monthTextColor: 'white', indicatorColor: colors.border, todayTextColor: colors.background, textMonthFontSize: 24, textDayFontSize: 18, textDayHeaderFontSize: 16, todayBackgroundColor: colors.mainButton }}
                //markedDates={marked}
                >
                </Calendar>
            );
        } else if (selectedId === 'day') {
            return (
              <View>
                <CalendarStrip
                  calendarAnimation={{type: 'sequence', duration: 30}}
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: colors.border,
                  }}
                  style={{
                    height: 100,
                    padding: 5,
                    marginTop: 20,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                  calendarHeaderStyle={{color: 'white', fontSize: 20}}
                  calendarColor={colors.mainButton}
                  dateNumberStyle={{color: 'white', fontSize: 18}}
                  dateNameStyle={{color: 'white', fontSize: 12}}
                  highlightDateNumberStyle={{color: colors.bars, fontSize: 16}}
                  highlightDateNameStyle={{color: colors.bars, fontSize: 9}}
                  iconContainer={{flex: 0.1}}
                  onDateSelected={Date => dayTasks(Date)}
                  scrollable={true}></CalendarStrip>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderColor: colors.border,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}>
                    <View style={{flex: 6}}>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'center',
                          color: colors.bars,
                        }}>
                        Dagens planer
                      </Text>
                    </View>
                  </View>
                  <ScrollView style={{height: 250}}>
                    {dayTasksArray.length == 0 && allDayArray == 0 ? (
                      <View
                        style={{
                          marginHorizontal: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{textAlign: 'center', fontSize: 18}}>
                          Der er ingen opgaver eller begivenheder i din kalender
                          i dag!
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <View>
                          {allDayArray.map((item, index) => (
                            <View
                              key={index}
                              style={{
                                flex: 7,
                                alignItems: 'center',
                                borderWidth: 1,
                                padding: 5,
                                marginVertical: 5,
                                marginHorizontal: 15,
                                flexDirection: 'row',
                                backgroundColor: item.color,
                                borderRadius: 10,
                                borderColor: colors.border,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  marginRight: 10,
                                  marginLeft: 5,
                                }}>
                                {item.emoji}
                              </Text>
                              <Text style={{fontSize: 18}}>
                                {item.taskName}
                              </Text>
                            </View>
                          ))}
                          {dayTasksArray.length == 0 ? (
                            <Text></Text>
                          ) : (
                            <View
                              style={{
                                borderWidth: 1,
                                marginHorizontal: 15,
                                marginVertical: 20,
                                backgroundColor: colors.border,
                                width: 250,
                                alignSelf: 'center',
                                borderColor: colors.border,
                                borderRadius: 10,
                              }}></View>
                          )}
                        </View>
                        <View>
                          {dayTasksArray.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <BouncyCheckbox
                                size={30}
                                fillColor={colors.subButton}
                                unfillColor="#FFFFFF"
                                iconStyle={{borderColor: 'black'}}
                                innerIconStyle={{borderWidth: 2}}
                                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                                onPress={isChecked => {}}
                                style={{marginHorizontal: 10, flex: 0.5}}
                              />
                              <View
                                style={{
                                  flex: 7,
                                  alignItems: 'center',
                                  padding: 2,
                                  borderWidth: 1,
                                  padding: 5,
                                  marginVertical: 5,
                                  marginHorizontal: 15,
                                  flexDirection: 'row',
                                  backgroundColor: item.get('color'),
                                  borderRadius: 10,
                                  borderColor: colors.border,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      marginRight: 10,
                                      marginLeft: 5,
                                    }}>
                                    {item.get('emoji')}
                                  </Text>
                                  <Text
                                    style={{marginHorizontal: 1, fontSize: 14}}>
                                    {item.get('startTime')} -{' '}
                                    {item.get('endTime')}
                                  </Text>
                                </View>
                                <Text
                                  style={{fontSize: 24, marginHorizontal: 5}}>
                                  |
                                </Text>
                                <Text style={{fontSize: 18}}>
                                  {item.get('name')}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </View>
              </View>
            );
        }
    }



    return (
      <MenuProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{alignContent: 'stretch', justifyContent: 'center'}}>
              <View
                style={{
                  alignContent: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                  Calendar page
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginHorizontal: 15,
                  marginBottom: 20,
                  backgroundColor: 'black',
                }}></View>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout="row"
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                size={30}
              />
              <View>{calendarLayout()}</View>
              <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}>
                <View
                  style={{
                    backgroundColor: colors.background,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: colors.background,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Text style={{fontSize: 24}}>Tasks and events on</Text>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      {chosenDate}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'white',
                      marginHorizontal: 10,
                      width: '90%',
                    }}>
                    <ScrollView style={{height: 250}}>
                      {dayTasksArray.length == 0 && allDayArray == 0 ? (
                        <View
                          style={{
                            marginHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{textAlign: 'center', fontSize: 18}}>
                            Der er ingen opgaver eller begivenheder i din
                            kalender i dag!
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <View>
                            {allDayArray.map((item, index) => (
                              <View
                                key={index}
                                style={{
                                  flex: 7,
                                  alignItems: 'center',
                                  borderWidth: 1,
                                  padding: 5,
                                  marginVertical: 5,
                                  marginHorizontal: 15,
                                  flexDirection: 'row',
                                  backgroundColor: item.color,
                                  borderRadius: 10,
                                  borderColor: colors.border,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    marginRight: 10,
                                    marginLeft: 5,
                                  }}>
                                  {item.emoji}
                                </Text>
                                <Text style={{fontSize: 18}}>
                                  {item.taskName}
                                </Text>
                              </View>
                            ))}
                            {dayTasksArray.length == 0 ? (
                              <Text></Text>
                            ) : (
                              <View
                                style={{
                                  borderWidth: 1,
                                  marginHorizontal: 15,
                                  marginVertical: 20,
                                  backgroundColor: colors.border,
                                  width: 250,
                                  alignSelf: 'center',
                                  borderColor: colors.border,
                                  borderRadius: 10,
                                }}></View>
                            )}
                          </View>
                          <View>
                            {dayTasksArray.map((item, index) => (
                              <View key={index} style={{flexDirection: 'row'}}>
                                <View
                                  style={{
                                    flex: 7,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    padding: 5,
                                    marginVertical: 5,
                                    marginHorizontal: 15,
                                    flexDirection: 'row',
                                    backgroundColor: item.get('color'),
                                    borderRadius: 10,
                                    borderColor: colors.border,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        marginRight: 10,
                                        marginLeft: 5,
                                      }}>
                                      {item.get('emoji')}
                                    </Text>
                                    <Text
                                      style={{
                                        marginHorizontal: 1,
                                        fontSize: 14,
                                      }}>
                                      {item.get('startTime')} -{' '}
                                      {item.get('endTime')}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{fontSize: 24, marginHorizontal: 5}}>
                                    |
                                  </Text>
                                  <Text style={{fontSize: 18}}>
                                    {item.get('name')}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        backgroundColor: colors.subButton,
                        padding: 10,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 10,
                        marginVertical: 10,
                      }}
                      onPress={hideDayModel}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  marginHorizontal: 10,
                  backgroundColor: colors.background,
                }}>
                <Menu style={{margin: 10}}>
                  <MenuTrigger
                    style={{
                      backgroundColor: colors.mainButton,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: colors.mainButton,
                      borderRadius: 10,
                      elevation: 10,
                    }}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={30}
                      color={colors.border}
                    />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: styles.menuOptionsContainer,
                    }}>
                    <MenuOption
                      onSelect={() => navigation.navigate('Add task')}
                      style={[
                        styles.menuOptionStyle,
                        {
                          backgroundColor: colors.subButton,
                          borderColor: colors.subButton,
                        },
                      ]}>
                      <Text style={{fontSize: 18, flex: 3}}>
                        Tilføj en ny to-do
                      </Text>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        style={{flex: 1, marginHorizontal: 5}}
                      />
                    </MenuOption>
                    <MenuOption
                      onSelect={() => navigation.navigate('Add routine')}
                      style={[
                        styles.menuOptionStyle,
                        {
                          backgroundColor: colors.subButton,
                          borderColor: colors.subButton,
                        },
                      ]}>
                      <Text style={{fontSize: 18, flex: 3}}>
                        Tilføj en ny rutine
                      </Text>
                      <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        style={{flex: 1, marginHorizontal: 5}}
                      />
                    </MenuOption>
                    <MenuOption
                      onSelect={() => navigation.navigate('Add event')}
                      style={[
                        styles.menuOptionStyle,
                        {
                          backgroundColor: colors.subButton,
                          borderColor: colors.subButton,
                        },
                      ]}>
                      <Text style={{fontSize: 18, flex: 3}}>
                        Tilføj et nyt event
                      </Text>
                      <FontAwesomeIcon
                        icon={faCalendarXmark}
                        style={{flex: 1, marginHorizontal: 5}}
                      />
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigation />
      </MenuProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    },
    menuOptionStyle: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'row'
    },
    menuOptionsContainer: {
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
});

export default CalendarOverview;