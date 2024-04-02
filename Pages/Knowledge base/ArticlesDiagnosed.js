import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ArticlesDiagnosed = () => {
    const navigation = useNavigation();
    const [articlesList, setArticlesList] = useState([]);

    useEffect(() => {

        try {
            articlesQuery();
        } catch (error) {
            console.error('Error fetching user theme:', error);
            Alert.alert('Could not load articles')
        }

    }, []);

    async function articlesQuery() {
        let articles = new Parse.Query('Articles');
        articles.contains('subject', 'Getting diagnosed with ADHD/ADD')
        const Results = await articles.find();
        setArticlesList(Results);
    }

    const readArticle = (article) => {
        navigation.navigate('View article', { article: article });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>What would you like to read about?</Text>
                {articlesList.length == 0 ? (
                    <Text style={{ textAlign: 'center', fontSize: 24 }}>Loading articles...</Text>
                ) : (articlesList.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.knowledgeView} onPress={() => readArticle(item)}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{item.get('title')}</Text>
                        <View style={{ borderWidth: 1, backgroundColor: 'black', width: 250, marginVertical: 5 }}></View>
                        <Text numberOfLines={2}>{item.get('text')}</Text>
                    </TouchableOpacity>
                ))
                )
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        backgroundColor: '#FFF6ED',
        flex: 1,
        alignItems: 'center'
    },
    scrollView: {
        marginLeft: 11,
    },
    knowledgeView: {
        width: 330,
        height: 120,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5
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

export default ArticlesDiagnosed;
