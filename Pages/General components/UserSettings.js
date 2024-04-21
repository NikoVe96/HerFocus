import { Text, TouchableOpacity, View, Alert, SafeAreaView, ScrollView, Switch, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import { useThemeContext } from "../../Assets/Theme/ThemeContext";
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';

export const UserSettings = ({ navigation }) => {

    const { updateTheme } = useThemeContext();
    const { colors } = useTheme();
    const [ID, setID] = useState('');
    const [colorTheme, setColorTheme] = useState('');
    const [isTasksEnabled, setIsTasksEnabled] = useState(false);
    const tasksToggleSwitch = () => setIsTasksEnabled(previousState => !previousState);
    const [isEventsEnabled, setIsEventsEnabled] = useState(false);
    const eventsToggleSwitch = () => setIsEventsEnabled(previousState => !previousState);
    const [isRoutinesEnabled, setIsRoutinesEnabled] = useState(false);
    const routinesToggleSwitch = () => setIsRoutinesEnabled(previousState => !previousState);
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
        <SafeAreaView style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
            <ScrollView>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: colors.text }}>Settings</Text>
                <View style={{ borderWidth: 1, backgroundColor: colors.border, width: 300, marginBottom: 20, alignSelf: 'center', borderColor: colors.border, borderRadius: 10 }}></View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.subButton, height: 350, width: 340, padding: 10, borderWidth: 1, borderRadius: 10, borderColor: colors.subButton, elevation: 20 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>Farvetema</Text>
                    <View style={styles.themeOption}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#FFD3DA',
                                borderColor: '#D9E4EC',
                            }}
                            onPress={() => updateTheme('pastel')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#A47786',
                                borderColor: '#533440',
                            }}
                            onPress={() => updateTheme('purple')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#F7A399',
                                borderColor: '#BF4C41',
                            }}
                            onPress={() => updateTheme('red')}></TouchableOpacity>
                    </View>
                    <View style={styles.themeOption}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#FFEABF',
                                borderColor: '#DC9B18',
                            }}
                            onPress={() => updateTheme('yellow')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#94C973',
                                borderColor: '#2F5233',
                            }}
                            onPress={() => updateTheme('green')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#6AABD2',
                                borderColor: '#274472',
                            }}
                            onPress={() => updateTheme('blue')}></TouchableOpacity>
                    </View>
                    <View style={styles.themeOption}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#68669D',
                                borderColor: '#131227',
                            }}
                            onPress={() => updateTheme('darkBlue')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#4F4848',
                                borderColor: '#000000',
                            }}
                            onPress={() => updateTheme('dark')}></TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 5,
                                borderRadius: 50,
                                width: 75,
                                height: 75,
                                backgroundColor: '#CCAFA5',
                                borderColor: '#4F4848',
                            }}
                            onPress={() => updateTheme('neutral')}></TouchableOpacity>
                    </View>

                </View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.subButton, height: 250, width: 340, padding: 10, borderWidth: 1, borderRadius: 10, borderColor: colors.subButton, elevation: 10 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>Notifikationer</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6, fontSize: 18 }}>To-do opgaver</Text>
                        <Switch
                            trackColor={{ false: colors.mainButton, true: colors.background }}
                            thumbColor={isTasksEnabled ? colors.border : colors.background}
                            ios_backgroundColor={colors.mainButton}
                            onValueChange={tasksToggleSwitch}
                            value={isTasksEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6, fontSize: 18 }}>Kalender events</Text>
                        <Switch
                            trackColor={{ false: colors.mainButton, true: colors.background }}
                            thumbColor={isEventsEnabled ? colors.border : colors.background}
                            ios_backgroundColor={colors.mainButton}
                            onValueChange={eventsToggleSwitch}
                            value={isEventsEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6, fontSize: 18 }}>Rutiner</Text>
                        <Switch
                            trackColor={{ false: colors.mainButton, true: colors.background }}
                            thumbColor={isRoutinesEnabled ? colors.border : colors.background}
                            ios_backgroundColor={colors.mainButton}
                            onValueChange={routinesToggleSwitch}
                            value={isRoutinesEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 6, fontSize: 18 }}>Forum post kommentarer</Text>
                        <Switch
                            trackColor={{ false: colors.mainButton, true: colors.background }}
                            thumbColor={isPostEnabled ? colors.border : colors.background}
                            ios_backgroundColor={colors.mainButton}
                            onValueChange={postToggleSwitch}
                            value={isPostEnabled}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: colors.subButton, height: 120, width: 340, padding: 10, borderWidth: 1, borderRadius: 10, borderColor: colors.subButton, elevation: 20 }}>
                    <Text style={{ fontSize: 25, flex: 1 }}>Slet din konto</Text>
                    <TouchableOpacity onPress={showModal} style={{ backgroundColor: colors.mainButton, borderWidth: 4, borderRadius: 10, borderColor: colors.border, flex: 0.7, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Slet din konto</Text>
                    </TouchableOpacity>
                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}>
                        <View style={{ backgroundColor: colors.background, padding: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.background, borderRadius: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Er du sikker på at du vil slette din konto?</Text>
                            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Handlingen kan ikke fortrydes og din data vil blive slettet permanent</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <TouchableOpacity onPress={hideModal} style={{ padding: 5, borderWidth: 1, backgroundColor: 'darkred', flex: 1, marginHorizontal: 10, borderWidth: 1, borderColor: 'darkred', borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Hov, det her var vidst en fejl</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteAccount} style={{ padding: 5, borderWidth: 1, backgroundColor: 'green', flex: 1, marginHorizontal: 10, borderWidth: 1, borderColor: 'green', borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Ja tak, slet min konto</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    themeOption: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 2
    },
})

export default UserSettings;
