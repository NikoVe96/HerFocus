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
                <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{article.get('title')}</Text>
                <View style={{ borderWidth: 1, backgroundColor: 'black', marginVertical: 10, width: 300, alignSelf: 'center' }}></View>

                <Markdown style={{ fontSize: 18 }}>{article.get('text')}</Markdown>
                <View style={{ marginVertical: 30 }}>
                    <Text>Denne artikel er skrevet af
                        <Text style={{ fontWeight: 'bold' }}> {article.get('author')}.</Text>
                    </Text>
                    <Text style={{ marginVertical: 10 }}>Hele artiklen samt mere info kan findes på
                        <Text style={{ fontStyle: 'italic' }} onPress={goToLink}> {article.get('website')}</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ViewArticle;