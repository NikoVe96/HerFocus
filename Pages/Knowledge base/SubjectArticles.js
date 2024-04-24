import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Parse from 'parse/react-native';
import Markdown from 'react-native-markdown-display';
import BottomNavigation from '../../Navigation/BottomNav';

export const ArticlesDiagnosed = ({route}) => {
  const navigation = useNavigation();
  const [articlesList, setArticlesList] = useState([]);
  const {subject} = route.params;
  const {colors} = useTheme();

  useEffect(() => {
    try {
      articlesQuery();
    } catch (error) {
      console.error('Error fetching user theme:', error);
      Alert.alert('Could not load articles');
    }

    console.log(subject);
  }, [subject]);

  async function articlesQuery() {
    let articles = new Parse.Query('Articles');
    articles.contains('subject', subject);
    const Results = await articles.find();
    setArticlesList(Results);
  }

  const readArticle = article => {
    navigation.navigate('View article', {article: article});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text style={styles.title}>Her kan du vælge en artikel.</Text>
        <Text style={styles.title2}>God læsning!</Text>
        {articlesList.length == 0 ? (
          <Text style={{textAlign: 'center', fontSize: 24}}>
            Loading articles...
          </Text>
        ) : (
          articlesList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.knowledgeView,
                styles.shadowProp,
                {backgroundColor: colors.subButton},
              ]}
              onPress={() => readArticle(item)}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {item.get('title')}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  backgroundColor: 'black',
                  width: 250,
                  marginVertical: 5,
                }}></View>
              <Text numberOfLines={3} style={{fontStyle: 'italic'}}>
                {item.get('text').replaceAll(/#|-|>|/gi, '')}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingLeft: 10,
    marginRight: 11,
    flex: 1,
  },
  knowledgeView: {
    width: '90%',
    height: 120,
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 3,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: 15,
    marginTop: 35,
  },
  title2: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: 15,
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
