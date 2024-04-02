import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export const ArticlesWomen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>What would you like to read about?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 1, flex: 1, marginHorizontal: 10, height: 150, padding: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Symptomer – forskellighed i køn</Text>
                        <View style={{ borderWidth: 1, backgroundColor: 'black' }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, flex: 1, marginHorizontal: 10, height: 150, padding: 5 }}>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        backgroundColor: '#FFF6ED',
        flex: 1,
    },
    scrollView: {
        marginLeft: 11,
    },
    knowledgeView: {
        width: 330,
        height: 90,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
    },
    title: {
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
        marginBottom: 15,
        marginTop: 35,
    },
    button: {
        width: 210,
        height: 30,
        backgroundColor: 'lightgrey',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 50,
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        textAlign: 'center',

        fontSize: 18,
    },
});

export default ArticlesWomen;
