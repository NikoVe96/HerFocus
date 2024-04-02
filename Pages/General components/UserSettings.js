import { Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from "../../Assets/Theme/ThemeContext";

export const UserSettings = () => {

    const { updateTheme } = useThemeContext();
    const { colors } = useTheme();
    const [ID, setID] = useState('');

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser) {
                    setID(currentUser.id);
                }
            } catch (error) {
                console.error('Error fetching user', error);
            }
        };

        getCurrentUser();
    }, []);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <TouchableOpacity style={{ borderWidth: 1, padding: 10, backgroundColor: 'yellow', marginVertical: 10 }} onPress={() => updateTheme('yellow')}>
                <Text>Change color theme to yellow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderWidth: 1, padding: 10, backgroundColor: 'blue', marginVertical: 10 }} onPress={() => updateTheme('blue')}>
                <Text style={{ color: 'white' }}>Change color theme to blue</Text>
            </TouchableOpacity>
        </View>
    );

}

export default UserSettings;