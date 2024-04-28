import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions
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
  const {width, height} = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);


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
        <Text
          style={[
            styles.title,
            {color: colors.text, fontSize: 22 * scaleFactor},
          ]}>
          Her kan du vælge en artikel.
        </Text>
        <Text
          style={[
            styles.title2,
            {color: colors.text, fontSize: 22 * scaleFactor},
          ]}>
          God læsning!
        </Text>
        {articlesList.length == 0 ? (
          <Text style={{textAlign: 'center', fontSize: 24}}>
            Loading articles...
          </Text>
        ) : (
          articlesList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
               styles.press
              }
              onPress={() => readArticle(item)}>
             
                <View
                  style={[
                    styles.buttonGrad,
                    {backgroundColor: colors.mainButton},
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    {item.get('title')}
                  </Text>
                  <View
                    style={[styles.seperator, {backgroundColor: colors.border}]}></View>
                  <Text numberOfLines={4} style={[styles.articleText, {color: colors.text}]}>
                    {item.get('text').replaceAll(/#|-|>|/gi, '')}
                  </Text>
                </View>
            
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 35,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonGrad: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    bottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  press: {
    marginBottom: 15,
  },
  articleText: {
    marginLeft: 10,
    marginRight: 10,
  },
  seperator: {
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    marginTop: 5,
  },
});

export default ArticlesDiagnosed;
