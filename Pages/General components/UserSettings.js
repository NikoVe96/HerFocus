import { Text, TouchableOpacity, View, Alert, SafeAreaView, ScrollView, Switch } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from "../../Assets/Theme/ThemeContext";
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';

export const UserSettings = ({ navigation }) => {

    const { updateTheme } = useThemeContext();
    const { colors } = useTheme();
    const [ID, setID] = useState('');
    const [newColorTheme, setNewColorTheme] = useState('');
    const [isTasksEnabled, setIsTasksEnabled] = useState(false);
    const tasksToggleSwitch = () => setIsTasksEnabled(previousState => !previousState);
    const [isEventsEnabled, setIsEventsEnabled] = useState(false);
    const eventsToggleSwitch = () => setIsEventsEnabled(previousState => !previousState);
    const [isPostEnabled, setIsPostEnabled] = useState(false);
    const postToggleSwitch = () => setIsPostEnabled(previousState => !previousState);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser) {
                    setID(currentUser.id);
                    setCurrentUser(currentUser);
                }
            } catch (error) {
                console.error('Error fetching user', error);
            }
        };

        getCurrentUser();
    }, []);

    async function deleteAccount() {
        try {
            await currentUser.destroy();
            Alert.alert('Your account has successfully been deleted')
            //Logout and return to login page
            navigation.navigate('Login');
            return true;
        } catch (error) {
            Alert.alert('Error deleting your account')
            return false;
        }
    }

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{ justifyContent: 'center', padding: 10 }}>
            <ScrollView>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: colors.text }}>Settings</Text>
                <View style={{ borderWidth: 1, backgroundColor: 'black', width: 300, marginBottom: 20, alignSelf: 'center' }}></View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.card, height: 450, width: 340, padding: 10, borderWidth: 1, borderRadius: 10 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>App color theme</Text>
                    <View style={{ flex: 6 }}>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <LinearGradient
                                colors={['#FFD3DA', '#FFFAE2', '#BFFCD1']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('pastel')}>
                                    <Text>Pastel</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#533440', '#A47786', '#E8D5DE']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('purple')}>
                                    <Text>Purple</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#BF4C41', '#FFD2CD', '#FFF8F7']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('red')}>
                                    <Text>Red</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <LinearGradient
                                colors={['#DC9B18', '#FFEABF', '#FFFCF9']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('yellow')}>
                                    <Text>Yellow</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#2F5233', '#94C973', '#B1D8B7']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('green')}>
                                    <Text>Green</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#1F3541', '#6AABD2', '#D9E4EC']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('blue')}>
                                    <Text>Blue</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <LinearGradient
                                colors={['#131227', '#393751', '#68669D']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('darkblue')}>
                                    <Text>Dark blue</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#000000', '#252121', '#FFFFFF']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('dark')}>
                                    <Text>Dark</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#CCAFA5', '#DCD2CC', '#EDE7DC']}
                                style={{ flex: 1, borderWidth: 1, borderRadius: 15, borderColor: 'black', marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setNewColorTheme('neutral')}>
                                    <Text>Neutral</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <Text>Chosen theme: {newColorTheme}</Text>
                    </View>
                    <TouchableOpacity onPress={() => updateTheme(newColorTheme)} style={{ flex: 0.5, borderWidth: 1, padding: 10, alignItems: 'center', width: 250, alignSelf: 'center', backgroundColor: colors.primary }}>
                        <Text style={{ fontSize: 18 }}>Update app color theme</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.light, height: 200, width: 340, padding: 10, borderWidth: 1, borderRadius: 10 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>Notifications</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6 }}>Calendar tasks</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isTasksEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={tasksToggleSwitch}
                            value={isTasksEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6 }}>Calendar events</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEventsEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={eventsToggleSwitch}
                            value={isEventsEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6 }}>Forum post comments</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isPostEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={postToggleSwitch}
                            value={isPostEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.light, height: 150, width: 340, padding: 10, borderWidth: 1, borderRadius: 10 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>Delete account</Text>
                    <TouchableOpacity onPress={showModal} style={{ backgroundColor: 'crimson', borderWidth: 4, borderRadius: 10, borderColor: 'darkred', flex: 1, marginHorizontal: 5, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Delete account</Text>
                    </TouchableOpacity>
                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}>
                        <View style={{ backgroundColor: colors.light, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Are you sure you want to delete your account?</Text>
                            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>This action cannot be undone and your data will be permanently deleted</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <TouchableOpacity onPress={hideModal} style={{ padding: 10, borderWidth: 1, backgroundColor: 'darkred', flex: 1, marginHorizontal: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>No, this was a mistake</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteAccount} style={{ padding: 10, borderWidth: 1, backgroundColor: 'green', flex: 1, marginHorizontal: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Yes, delete my account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView >
    );

}

export default UserSettings;