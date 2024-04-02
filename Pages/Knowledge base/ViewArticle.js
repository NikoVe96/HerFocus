import { SafeAreaView, ScrollView, Text, View } from "react-native";

export const ViewArticle = ({ route }) => {

    const { article } = route.params;

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 20, marginBottom: 20 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{article.get('title')}</Text>
                <View style={{ borderWidth: 1, backgroundColor: 'black', marginVertical: 10, width: 300, alignSelf: 'center' }}></View>
                <Text style={{ fontSize: 18 }}>{article.get('text')}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ViewArticle;