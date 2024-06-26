import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'react-native-swiper';
import LearningProgressHeader from '../../Components/LearningProgressHeader';
import { useNavigation } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Quiz from '../../Components/Quiz';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const Module = ({ route }) => {
  const width = Dimensions.get('window').width;
  const [progress, setProgress] = useState(new Animated.Value(1));
  const moduleLength = 7;
  const navigation = useNavigation();
  const { module, subject, description, image, onNewCompletion } = route.params;
  const [intro1, setIntro1] = useState('');
  const [intro2, setIntro2] = useState('');
  const [intro3, setIntro3] = useState('');
  const [questions, setQuestions] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const swiperRef = useRef(null);

  const handleSlide = index => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrollTo(0);
    }
    setIntro1('');
    setKeyPoints([]);

    moduleContent();
  }, [module]);

  async function retakeQuestions() {
    console.log('button pressed');
  }

  async function moduleContent() {
    let query = new Parse.Query('LearningModuleContent');
    query.contains('module', module.id);
    const Results = await query.find();
    console.log(Results)
    setIntro1(Results[0].get('intro1'));
    setIntro2(Results[0].get('intro2'));
    setIntro3(Results[0].get('intro3'));
    console.log(intro1, intro2, intro3)
    setKeyPoints(Results[0].get('keyPoints'));
  }

  async function handleCompletion() {
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Settings');
    query.contains('user', currentUser.id);
    const result = await query.first();

    const moduleName = `${module.get('name')} ${module.get('subject')}`;
    result.addUnique('modulesCompleted', moduleName);
    result.save();

    onNewCompletion();

    navigation.navigate('Module overview', {
      subject: subject,
      image: image,
      description: description,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LearningProgressHeader
        progress={progress}
        moduleLength={moduleLength}
        subject={subject}
        description={description}
        image={image}
      />
      <View style={{ flex: 8, backgroundColor: 'lightyellow' }}>
        <Swiper
          loop={false}
          showsPagination={false}
          dotStyle={{
            backgroundColor: 'rgba(0,0,0,.2)',
            width: 70,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          activeDotStyle={{
            backgroundColor: '#000',
            width: 70,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          paginationStyle={{ bottom: 10 }}
          onIndexChanged={index => handleSlide(index)}
          scrollEnabled={false}
          buttonWrapperStyle={{ alignItems: 'flex-start' }}
          ref={swiperRef}>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/frustrated_woman.png')}
              style={{ width: width, height: 250 }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.takeawayHeader}>
                Har du før været i denne situation?
              </Text>
              <Text>{intro1}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: 20,
              }}>
              <View style={{ marginTop: 20, marginRight: 20 }}></View>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/frustrated_woman.png')}
              style={{ width: width, height: 250 }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.takeawayHeader}>Subject title...</Text>
              <Text>{intro2}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/frustrated_woman.png')}
              style={{ width: width, height: 250 }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.takeawayHeader}>Subject title...</Text>
              <Text>{intro3}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Image
                source={require('../../Assets/images/quiz.png')}
                style={{ width: width, height: 250 }}
                sharedTransitionTag="structure"></Image>
              <Text style={styles.takeawayHeader}>
                Lad os tage en quiz for at hjælpe dig med at huske, hvad du har
                lært!
              </Text>
              <Quiz
                key={module.id}
                subject={subject}
                module={module.get('name')}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'baseline',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={styles.swiperBtn}
                  onPress={() => swiperRef.current.scrollBy(-1)}>
                  <Text>Tilbage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.swiperBtn}
                  onPress={() => retakeQuestions()}>
                  <Text>Tag quizzen igen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.swiperBtn}
                  onPress={() => swiperRef.current.scrollBy(1)}>
                  <Text>Næste</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Assets/images/notebook_planning.png')}
                style={{ width: width, height: 250 }}></Image>
              <Text style={styles.takeawayHeader}>
                Her er der {keyPoints.length} takeaways fra dette modul
              </Text>
              {keyPoints.map((item, index) => {
                return (
                  <View style={styles.keyTakeaways} key={index}>
                    <Text style={styles.takeawayHeader}>
                      Takeaway {index + 1}
                    </Text>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Assets/images/planning_exercise.png')}
                style={{ width: width, height: 250 }}></Image>
              <Text style={styles.takeawayHeader}>
                Skriv dine ugentlige tasks ned
              </Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.swiperBtn}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../../Assets/images/fireworks.png')}
              style={{ width: width, height: 250 }}></Image>
            <Text style={styles.takeawayHeader}>Tillykke! </Text>
            <Text>Du har lige færdiggjort dit første modul!</Text>
            <TouchableOpacity
              style={styles.swiperBtn}
              onPress={() => swiperRef.current.scrollBy(-1)}>
              <Text>Tilbage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCompletion()}>
              <Text>Færdiggør modulet</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    width: 200,
  },
  keyTakeaways: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: 350,
    padding: 10,
  },
  takeawayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  textContainer: {
    margin: 10,
  },
  textInput: {
    backgroundColor: 'white',
    width: 250,
    height: 200,
    marginVertical: 10,
  },
  swiperBtn: {
    marginTop: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  swiperBtnText: {
    fontSize: 16,
  },
});

export default Module;
