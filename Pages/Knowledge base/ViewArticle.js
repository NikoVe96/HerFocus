import { Link } from "@react-navigation/native";
import { SafeAreaView, ScrollView, Text, View, Linking } from "react-native";
import Markdown from 'react-native-markdown-display';

export const ViewArticle = ({ route }) => {

    const { article } = route.params;

    const goToLink = () => {
        Linking.openURL(article.get('website'));
    };

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 20, marginBottom: 20 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{article.get('title')}</Text>
                <Text style={{ fontSize: 20, fontStyle: 'italic', textAlign: 'center' }}>{article.get('subHeader')}</Text>
                <View style={{ borderWidth: 1, backgroundColor: 'black', marginVertical: 10, width: 300, alignSelf: 'center' }}></View>

                <Markdown style={{ paragraph: { fontSize: 18 }, bullet_list: { fontSize: 18 }, heading3: { fontSize: 22, marginTop: 30 }, list_item: { marginVertical: 5 } }}>{article.get('text')}</Markdown>
                <View style={{ marginVertical: 30 }}>
                    <View style={{ borderWidth: 0.2, borderColor: 'grey', backgroundColor: 'grey', marginBottom: 30, width: 200, alignSelf: 'center' }}></View>
                    <Text>Denne artikel er skrevet af
                        <Text style={{ fontWeight: 'bold' }}> {article.get('author')}.</Text>
                    </Text>
                    <Text style={{ marginVertical: 10 }}>Hele artiklen samt mere info kan findes på
                        <Text style={{ fontStyle: 'italic' }} onPress={goToLink}> {article.get('website')}</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default ViewArticle;