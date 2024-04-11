import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Parse from 'parse/react-native';
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDownLong } from '@fortawesome/free-solid-svg-icons';

export const ModulesOverview = ({ route }) => {

    const { subject, image, description } = route.params;
    const [modules, setModules] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        modulesQuery();
    }, []);

    async function modulesQuery() {
        let query = new Parse.Query('LearningModules');
        query.contains('subject', subject);
        query.ascending('name');
        const Result = await query.find();
        setModules(Result);
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
                <View style={{ marginBottom: 200, marginTop: 10 }}>
                    {modules.length == 0 ? (
                        <Text>Loading modules...</Text>
                    ) : (
                        modules.map((item, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Module', { module: item, subject: subject, image: image, description: description })}>
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
    moduleDesc: {

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
    },
})

export default ModulesOverview;

