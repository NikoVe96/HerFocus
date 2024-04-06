import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext();

const PastelTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#D9E4EC',
        primary: '#FFD3DA',
        background: '#FFFAE2',
        card: '#BFFCD1',
        text: 'black',
        border: '#FFD3DA',
        notification: '#D9E4EC',
        icons: 'white',
        buttons: '#BFFCD1'
    },
};

const PurpleTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#A47786',
        primary: '#533440',
        background: '#E8D5DE',
        card: '#A47786',
        text: 'white',
        border: '#533440',
        notification: '#A47786',
        icons: 'white',
        buttons: '#A47786'
    },
};

const RedTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#FFF8F7',
        primary: '#BF4C41',
        background: '#FFF8F7',
        card: '#F7A399',
        text: 'black',
        border: '#BF4C41',
        notification: '#FFD2CD',
        icons: 'white',
        buttons: '#FFD2CD'
    },
};

const YellowTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#FFFCF9',
        primary: '#DC9B18',
        background: '#FFFCF9',
        card: '#FFEABF',
        text: 'black',
        border: '#DC9B18',
        notification: '#FFEABF',
        icons: 'white',
        buttons: '#DC9B18'
    },
};

const GreenTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#D0EDD5',
        primary: '#2F5233',
        background: '#D0EDD5',
        card: '#94C973',
        text: 'black',
        border: '#2F5233',
        notification: '#94C973',
        icons: 'white',
        buttons: '#2F5233'
    },
};

const BlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#D9E4EC',
        primary: '#6AABD2',
        background: '#D9E4EC',
        card: '#8BC5E8',
        text: 'black',
        border: '#274472',
        notification: '#8BC5E8',
        icons: 'white',
        buttons: '#274472'
    },
};

const DarkBlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#393751',
        primary: '#131227',
        background: '#393751',
        card: '#68669D',
        text: 'white',
        border: '#131227',
        notification: '#68669D',
        icons: 'white',
        buttons: '#131227'
    },
};

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#252121',
        primary: '#000000',
        background: '#252121',
        card: '#4F4848',
        text: 'white',
        border: '#000000',
        notification: '#4F4848',
        icons: 'white',
        buttons: '#000000'
    },
};

const NeutralTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#EDE7DC',
        primary: '#CCAFA5',
        background: '#EDE7DC',
        card: '#E7D2CC',
        text: 'black',
        border: '#CCAFA5',
        notification: '#E7D2CC',
        icons: 'white',
        buttons: '#CCAFA5'
    },
};

const themes = {
    pastel: PastelTheme,
    purple: PurpleTheme,
    red: RedTheme,
    yellow: YellowTheme,
    green: GreenTheme,
    blue: BlueTheme,
    darkblue: DarkBlueTheme,
    dark: DarkTheme,
    neutral: NeutralTheme,
    default: DefaultTheme,
};

export function useThemeContext() {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState();
    const [ID, setID] = useState('');

    useEffect(() => {
        const getTheme = async () => {
            try {
                const currentUser = await Parse.User.currentAsync();
                if (currentUser) {
                    setID(currentUser.id);
                    let themeQ = new Parse.Query('Settings');
                    themeQ.contains('user', ID);
                    const Result = await themeQ.find();
                    const chosenTheme = Result[0].get('theme');
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

