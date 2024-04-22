import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export const StructureFrontPage = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

    return (

        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, { fontSize: 22 * scaleFactor }]}>Hvad skal du planlægge i dag?</Text>
            <TouchableOpacity
                style={[styles.knowledgeView, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => navigation.navigate('Calendar')}>
                <Image
                    source={require('../../Assets/images/structure_calendar.png')}
                    style={styles.imageLarge}></Image>
                <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Kalender</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.knowledgeView, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => navigation.navigate('Daily overview')}>
                <Image
                    source={require('../../Assets/images/structure_todo.png')}
                    style={styles.imageLarge}></Image>
                <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Daglig oversigt</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.knowledgeView, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => navigation.navigate('Notebook')}>
                <Image
                    source={require('../../Assets/images/structure_notebook.png')}
                    style={styles.imageLarge}></Image>
                <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Notesbog</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.knowledgeViewSmall, { backgroundColor: colors.mainButton, borderColor: colors.mainButton, marginRight: '1%' }]}
                    onPress={() => navigation.navigate('Add task')}>
                    <Image
                        source={require('../../Assets/images/structure_todo.png')}
                        style={styles.imageSmall}></Image>
                    <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Ny to-do</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.knowledgeViewSmall, { backgroundColor: colors.mainButton, borderColor: colors.mainButton, marginHorizontal: '1%' }]}
                    onPress={() => navigation.navigate('Add routine')}>
                    <Image
                        source={require('../../Assets/images/structure_routine.png')}
                        style={styles.imageSmall}></Image>
                    <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Ny rutine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.knowledgeViewSmall, { backgroundColor: colors.mainButton, borderColor: colors.mainButton, marginLeft: '1%' }]}
                    onPress={() => navigation.navigate('Add event')}>
                    <Image
                        source={require('../../Assets/images/structure_event.png')}
                        style={styles.imageSmall}></Image>
                    <Text style={{ fontSize: 20 * scaleFactor, marginTop: '1%' }}>Nyt event</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    knowledgeView: {
        width: '80%',
        height: '20%',
        borderRadius: 8,
        borderWidth: 1,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '2%'
    },
    knowledgeViewSmall: {
        height: '45%',
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flex: 1,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 15,
        marginTop: 35,
    },
    imageLarge: {
        width: '30%',
        height: '70%',
        resizeMode: 'contain',
    },
    imageSmall: {
        width: '65%',
        height: '70%',
        resizeMode: 'contain',
    },
    row: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between'
    },
});

export default StructureFrontPage;