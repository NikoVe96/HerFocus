import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext();

const PastelTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bars: '#FFD3DA',
        background: '#FFFAE2',
        text: 'black',
        border: '#FFD3DA',
        notification: '#D9E4EC',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#BFFCD1',
        subButton: '#D9E4EC',
    },
};

const PurpleTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bars: '#533440',
        background: '#E8D5DE',
        text: 'black',
        border: '#533440',
        notification: '#A47786',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#A47786',
        subButton: '#cc9dad',
    },
};

const RedTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bars: '#BF4C41',
        background: '#FFF8F7',
        text: 'black',
        border: '#BF4C41',
        notification: '#FFD2CD',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#F7A399',
        subButton: '#FFD2CD',
    },
};

const YellowTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bars: '#DC9B18',
        background: '#FFFCF9',
        text: 'black',
        border: '#DC9B18',
        notification: '#FFEABF',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#DC9B18',
        subButton: '#FFEABF',
    },
};

const GreenTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        Bars: '#2F5233',
        background: '#D0EDD5',
        text: 'black',
        border: '#2F5233',
        notification: '#94C973',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#2F5233',
        subButton: '#94C973',
    },
};

const BlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        Bars: '#6AABD2',
        background: '#D9E4EC',
        text: 'black',
        border: '#274472',
        notification: '#8BC5E8',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#274472',
        subButton: '#94C973',
    },
};

const DarkBlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        Bars: '#131227',
        background: '#393751',
        text: 'white',
        border: '#131227',
        notification: '#68669D',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#131227',
        subButton: '#68669D',
    },
};

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        Bars: '#000000',
        background: '#252121',
        text: 'white',
        border: '#000000',
        notification: '#4F4848',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#000000',
        subButton: '#4F4848',
    },
};

const NeutralTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#CCAFA5',
        background: '#EDE7DC',
        text: 'black',
        border: '#CCAFA5',
        notification: '#E7D2CC',
        iconLight: 'white',
        iconDark: 'black',
        mainButton: '#CCAFA5',
        subButton: '#4F4848',
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

