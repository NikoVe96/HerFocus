import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Parse from 'parse/react-native';
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDownLong, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const ModulesOverview = ({ route }) => {

    const { subject, image, description } = route.params;
    const [modules, setModules] = useState([]);
    const [completed, setCompleted] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        modulesQuery();
        completedQuery();
    }, []);

    async function modulesQuery() {
        let query = new Parse.Query('LearningModules');
        query.contains('subject', subject);
        query.ascending('name');
        const Result = await query.find();
        setModules(Result);
    }

    async function completedQuery() {
        const currentUser = await Parse.User.currentAsync();
        let query = new Parse.Query('Settings')
        query.contains('user', currentUser.id);
        const result = await query.first();
        setCompleted(result.get('modulesCompleted'));
    }

    function handleNewCompletion() {
        completedQuery();
    }

    return (
        <SafeAreaView>
            <Text style={styles.title}>{subject}</Text>
            <Image
                source={image}
                style={{ width: 100, height: 100, alignSelf: 'center' }}></Image>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.border}></View>

            <ScrollView>
                <View style={{ marginBottom: 200, marginTop: 30 }}>
                    {modules.length == 0 ? (
                        <Text>Loading modules...</Text>
                    ) : (
                        modules.map((item, index) => {
                            const moduleSignature = `${item.get('name')} ${item.get('subject')}`;
                            const isCompleted = completed.includes(moduleSignature);
                            return (
                                <View key={index} style={styles.container}>

                                    <View>
                                        {isCompleted && <FontAwesomeIcon icon={faCircleCheck} size={30} color="green" style={styles.progessionBar} />}
                                        <TouchableOpacity onPress={() => navigation.navigate('Module', { module: item, subject: subject, image: image, description: description, onNewCompletion: handleNewCompletion() })}>
                                            <View
                                                style={styles.buttonParent}>
                                                <View
                                                    style={styles.buttonGrad}>
                                                    <Image
                                                        source={require('../../Assets/images/idea.png')}
                                                        style={styles.image}></Image>
                                                    <View style={{ width: 100 }}>
                                                        <Text style={styles.moduleName}>Module {item.get('name')}</Text>
                                                        <Text style={styles.moduleDesc}>{item.get('description')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <FontAwesomeIcon icon={faDownLong} size={30} style={{ marginVertical: 15 }} />
                                </View>
                            )
                        })
                    )}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 10,
    },
    moduleName: {
        fontWeight: 'bold',

    },
    description: {
        fontSize: 18,
        padding: 10,
        marginHorizontal: 10
    },
    border: {
        borderWidth: 1,
        backgroundColor: 'black',
        width: 300,
        marginVertical: 10,
        alignSelf: 'center'
    },
    image: {
        height: 50,
        width: 50,
        marginHorizontal: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonGrad: {
        height: 90,
        width: 200,
        borderRadius: 10,
        position: 'absolute',
        bottom: 5,
        backgroundColor: '#FFEABF',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonParent: {
        height: 90,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#DC9B18',
        alignSelf: 'center',
        elevation: 20,
        zIndex: 1,
    },
    progessionBar: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 30,
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 5,
        marginTop: -25,
    },
})

export default ModulesOverview;

