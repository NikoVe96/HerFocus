import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext();

const YellowTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#FFEABF',
        primary: '#DC9B18',
        background: '#FFF6ED',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const BlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#68669D',
        primary: '#131227',
        background: '#393751',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const GreenTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#71CA81',
        primary: '#0F9D58',
        background: '#C8E6C9',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const RedTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#F19C9B',
        primary: '#D33F49',
        background: '#FFEBEE',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const themes = {
    yellow: YellowTheme,
    blue: BlueTheme,
    green: GreenTheme,
    red: RedTheme,
    default: DefaultTheme,
};

export function useThemeContext() {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.yellow);
    const [ID, setID] = useState('');

    useEffect(() => {
        const getTheme = async () => {
            try {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser) {
                    setID(currentUser.id);
                    let themeQ = new Parse.Query('Settings');
                    themeQ.equalTo('user', ID);
                    const Result = await themeQ.first();
                    const chosenTheme = Result?.get('theme');
                    setTheme(themes[chosenTheme] || themes.yellow);
                }
            } catch (error) {
                console.error('Error fetching user theme:', error);
                setTheme(themes.yellow);
            }
        };
        getTheme();
    }, []);

    const updateTheme = async (newThemeName) => {
        let settingsQuery = new Parse.Query('Settings');
        settingsQuery.contains('user', ID);
        const result = await settingsQuery.first();

        if (result) {
            result.set('theme', newThemeName);
            try {
                await result.save();
                Alert.alert('Your theme was updated!');
            } catch (error) {
                Alert.alert('Error:', error.message);
            }
        } else {
            Alert.alert('Settings not found for this user');
        }
        setTheme(themes[newThemeName] || themes.yellow);
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

