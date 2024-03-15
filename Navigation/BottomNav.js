import { StyleSheet, Text, Button, Alert, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';

export const BottomNavigation = () => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: 60 }}>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
                <Text> Screen 1 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'green', flex: 1 }}>
                <Text> Screen 2 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'blue', flex: 1 }}>
                <Text> Screen 3 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'yellow', flex: 1 }}>
                <Text> Screen 4 </Text>
            </TouchableOpacity>
        </View>
    );
}

export default BottomNavigation;