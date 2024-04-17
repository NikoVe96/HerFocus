import { faCalendar, faCirclePlus, faHouse, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StyleSheet, Text, Button, Alert, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';

export const BottomNavigation = () => {

    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View style={{ flexDirection: 'row', height: 60, backgroundColor: colors.primary }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Front page')}>
                <FontAwesomeIcon icon={faHouse} size={25} color={colors.icons} />
                <Text style={{ color: colors.icons, fontWeight: 'bold' }}> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Add task')}>
                <FontAwesomeIcon icon={faCirclePlus} size={25} color={colors.icons} />
                <Text style={{ color: colors.icons, fontWeight: 'bold' }}> New task </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Daily overview')}>
                <FontAwesomeIcon icon={faSpinner} size={25} color={colors.icons} />
                <Text style={{ color: colors.icons, fontWeight: 'bold' }}> Daily tasks </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Calendar')}>
                <FontAwesomeIcon icon={faCalendar} size={25} color={colors.icons} />
                <Text style={{ color: colors.icons, fontWeight: 'bold' }}> Calendar </Text>
            </TouchableOpacity>
        </View>
    );
}

export default BottomNavigation;