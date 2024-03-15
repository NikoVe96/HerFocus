import { faCalendar, faCirclePlus, faHouse, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Button, Alert, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';

export const BottomNavigation = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', height: 60, backgroundColor: 'lightblue' }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Front page')}>
                <FontAwesomeIcon icon={faHouse} size={25} />
                <Text> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Add task')}>
                <FontAwesomeIcon icon={faCirclePlus} size={25} />
                <Text> New task </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Daily overview')}>
                <FontAwesomeIcon icon={faSpinner} size={25} />
                <Text> Daily overview </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Calendar')}>
                <FontAwesomeIcon icon={faCalendar} size={25} />
                <Text> Calendar </Text>
            </TouchableOpacity>
        </View>
    );
}

export default BottomNavigation;