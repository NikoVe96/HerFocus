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
import { useNavigation, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Quiz from '../../Components/Quiz';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BottomNavigation from '../../Navigation/BottomNav';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const Module = ({ route }) => {
  const [progress, setProgress] = useState(new Animated.Value(1));
  const moduleLength = 7;
  const navigation = useNavigation();
  const { module, subject, description, image } = route.params;
  const [intro1, setIntro1] = useState('');
  const [intro2, setIntro2] = useState('');
  const [intro3, setIntro3] = useState('');
  const [questions, setQuestions] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const [author, setAuthor] = useState('');
  const [book, setBook] = useState('');
  const swiperRef = useRef(null);
  const { colors } = useTheme();
  const moduleName = `${module.get('name')} ${module.get('subject')}`;
  const [expanded, setExpanded] = useState(-1);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

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
    console.log(moduleName)
  }, [module]);

  async function moduleContent() {
    let query = new Parse.Query('LearningModuleContent');
    query.contains('module', module.id);
    const Results = await query.find();
    setIntro1(Results[0].get('intro1'));
    setIntro2(Results[0].get('intro2'));
    setIntro3(Results[0].get('intro3'));
    setKeyPoints(Results[0].get('keyPoints'));
    setAuthor(Results[0].get('author'));
    setBook(Results[0].get('book'));
  }

  async function handleCompletion() {
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Settings');
    query.contains('user', currentUser.id);
    const result = await query.first();

    result.addUnique('modulesCompleted', moduleName);
    result.save();


    navigation.navigate('Module overview', {
      subject: subject,
      image: image,
      description: description,
    });
  }

  function toggleExercise(index) {
    setExpanded(expanded === index ? -1 : index);
  }

  function exercises() {
    switch (moduleName) {
      case '1 Struktur og planlægning':
        const tænkeFejl =
          [
            { name: "Alt eller intet" },
            { name: "Ignorer det gode" },
            { name: "Tænke fejl" },
            { name: "Gøre ting større end de er" },
            { name: "Spår fremtiden" },
            { name: "Følelses ræsonnement" },];
        return (
          <View style={{ backgroundColor: colors.background, padding: '2%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: '2%' }}>Identificer dine egne tænkefejl</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Øvelse</Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>I denne øvelse skal du tjekke de bokse af, hvor du kan genkende dig selv i tankefejlen. I tekstfeltet skriver du derefter et eksempel på en situation, hvor du har oplevet at lave den tænkefejl</Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>Udfyld kun de tekstfelter der tilhører tænke fejl som du kan genkende dig selv i.</Text>
            <Text style={{ fontSize: 18, marginBottom: '4%' }}>Når opgaven er fulført, vil du kunne finde den i din notesbog.</Text>
            {tænkeFejl.map((item, index) => (
              <View
                key={index}
                style={{
                  marginVertical: '1%',
                  backgroundColor: colors.subButton,
                  marginVertical: '2%',
                  padding: '3%',
                  borderWidth: 1,
                  borderColor: colors.subButton,
                  borderRadius: 10
                }}>
                <View style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                  <BouncyCheckbox
                    size={35}
                    fillColor={colors.border}
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: colors.border }}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    onPress={() => { toggleExercise(index) }}
                    style={{ marginLeft: '20%' }}
                  />
                </View>
                {expanded == index ?
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 10,
                      padding: 10
                    }}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical={'top'}>
                  </TextInput>
                  : null}
              </View>
            ))}
            <View style={{ flex: 1 }}>
            </View>
          </View>
        );
        break;
      case '2 Struktur og planlægning':
        return (
          <View style={{ backgroundColor: colors.background, padding: '2%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: '2%' }}>Identificer typen af dine overspringshandlinger</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Øvelse</Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>I denne øvelse skal du udfylde felterne for at identificere og reflektere over hvilke typer af overspringshandlinger du typisk har problemer med.</Text>
            <Text style={{ fontSize: 18, marginBottom: '4%' }}>Når opgaven er fulført, vil du kunne finde den i din notesbog.</Text>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <Text style={{ fontSize: 18, marginBottom: '4%' }}>Hvilke(n) typer af overspringshandlinger kan du identificere dig med?</Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={'top'}
              >
              </TextInput>
            </View>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <Text style={{ fontSize: 18, marginBottom: '4%' }}>Giv et eksempel på hvornår du har lavet en overspringshandling af denne type</Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={'top'}
              >
              </TextInput>
            </View>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <Text style={{ fontSize: 18, marginBottom: '4%' }}>Hvad kan du gøre for at lave færre overspringshandlinger af denne type?</Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={5}
                textAlignVertical={'top'}
              >
              </TextInput>
            </View>
          </View>
        );
        break;
      case '3 Struktur og planlægning':
        return (
          <View style={{ backgroundColor: colors.background, padding: '2%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: '2%' }}>
              Planlæg dine rutiner
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: '3%',
              }}>
              Øvelse
            </Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>
              I denne øvelse skal du tænke på en rutiner, du har. Skriv hvilke
              steps rutinen indeholder, og hvor længe de forskellige steps tager
              i tekstboksene
            </Text>
            <Text style={{ fontSize: 18, marginBottom: '4%' }}>
              Når opgaven er fulført, vil du kunne finde den i din notesbog.
            </Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Rutine</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View>
                  <View style={styles.rutineView}>
                    <Text>1.</Text>
                    <TextInput
                      style={styles.rutineText1}
                      multiline={true}
                      numberOfLines={1}></TextInput>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                        Steps
                      </Text>
                      <View style={styles.rutineView}>
                        <Text>a.</Text>
                        <TextInput
                          style={styles.rutineText2}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>b.</Text>
                        <TextInput
                          style={styles.rutineText2}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>c.</Text>
                        <TextInput
                          style={styles.rutineText2}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>d.</Text>
                        <TextInput
                          style={styles.rutineText2}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>e.</Text>
                        <TextInput
                          style={styles.rutineText2}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                        Tid
                      </Text>
                      <View style={styles.rutineView}>
                        <Text>a.</Text>
                        <TextInput
                          style={styles.rutineTime}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>b.</Text>
                        <TextInput
                          style={styles.rutineTime}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>c.</Text>
                        <TextInput
                          style={styles.rutineTime}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>d.</Text>
                        <TextInput
                          style={styles.rutineTime}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                      <View style={styles.rutineView}>
                        <Text>e.</Text>
                        <TextInput
                          style={styles.rutineTime}
                          multiline={true}
                          numberOfLines={1}></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case '4 Struktur og planlægning':
        return (
          <View style={{ backgroundColor: colors.background, padding: '2%' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: '2%' }}>Reflekter over dine præstationer</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Øvelse</Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>I denne øvelse skal du udvælge nogle af de opgaver du har haft i løbet af ugen, og reflektere over dem.</Text>
            <Text style={{ fontSize: 18, marginBottom: '2%' }}>Hvordan gik det med at klare opgaven? Oplevede du nogle tænkefejl undervejs? Hvordan kunne du vende de negative tanker til noget positivt istedet?</Text>
            <Text style={{ fontSize: 18, marginBottom: '4%' }}>Når opgaven er fulført, vil du kunne finde den i din notesbog.</Text>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <View style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Opgave</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={2}
                textAlignVertical={'top'}>
              </TextInput>
              <View style={{ flexDirection: 'row', marginVertical: '3%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Beskriv hvordan det gik</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={'top'}>
              </TextInput>
            </View>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <View style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Opgave</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={2}
                textAlignVertical={'top'}>
              </TextInput>
              <View style={{ flexDirection: 'row', marginVertical: '3%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Beskriv hvordan det gik</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={'top'}>
              </TextInput>
            </View>
            <View
              style={{
                marginVertical: '1%',
                backgroundColor: colors.subButton,
                marginVertical: '2%',
                padding: '3%',
                borderWidth: 1,
                borderColor: colors.subButton,
                borderRadius: 10
              }}>
              <View style={{ flexDirection: 'row', marginBottom: '2%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Opgave</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={2}
                textAlignVertical={'top'}>
              </TextInput>
              <View style={{ flexDirection: 'row', marginVertical: '3%', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>Beskriv hvordan det gik</Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 10
                }}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={'top'}>
              </TextInput>
            </View>
          </View>
        );
      default:
        break;
    }
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
      <View style={{ flex: 8, backgroundColor: colors.background }}>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={index => handleSlide(index)}
          scrollEnabled={false}
          ref={swiperRef}>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/frustrated_woman.png')}
              style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{intro1}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <View style={{ marginTop: '3%', marginRight: '5%' }}></View>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/woman_reflecting.png')}
              style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{intro2}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={require('../../Assets/images/woman_writing.png')}
              style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{intro3}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Image
                source={require('../../Assets/images/women_taking_quiz.png')}
                style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}
              ></Image>
              <Text style={[styles.takeawayHeader, { fontSize: 22 * scaleFactor }]}>
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
                  marginVertical: '3%',
                }}>
                <TouchableOpacity
                  style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                  onPress={() => swiperRef.current.scrollBy(-1)}>
                  <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                  onPress={() => swiperRef.current.scrollBy(1)}>
                  <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Assets/images/woman_doing_exercise.png')}
                style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
            </View>
            <View>
              {exercises()}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Assets/images/lightbulbs.png')}
                style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
              <Text style={[styles.takeawayHeader, { fontSize: 22 * scaleFactor }]}>
                Her er der {keyPoints.length} takeaways fra dette modul
              </Text>
              {keyPoints.map((item, index) => {
                return (
                  <View style={[styles.keyTakeaways, { backgroundColor: colors.subButton, borderColor: colors.subButton }]} key={index}>
                    <Text style={[styles.takeawayHeader, { fontSize: 22 * scaleFactor }]}>
                      Takeaway {index + 1}
                    </Text>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Næste</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../../Assets/images/fireworks.png')}
              style={{ width: width, height: 270 * scaleFactor, alignSelf: 'center' }}></Image>
            <Text style={[styles.takeawayHeader, { fontSize: 22 * scaleFactor }]}>Tillykke! </Text>
            <Text style={styles.text}>Du har lige færdiggjort dit første modul!</Text>
            <Text style={{ fontSize: 12, fontStyle: 'italic', marginTop: '35%' }}>Materialet fra dette modul er fundet i bogen "{book}", som er skrevet af {author}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[styles.swiperBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Tilbage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}
                onPress={() => handleCompletion()}>
                <Text style={{ fontSize: 20 * scaleFactor }}>Færdiggør modulet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      </View >
      <BottomNavigation />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: '1%',
    width: '60%',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  keyTakeaways: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  takeawayHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    padding: 5,
  },
  textContainer: {
    margin: '3%',
  },
  swiperBtn: {
    marginTop: '2%',
    marginRight: '2%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  text: {
    fontSize: 18,
  },
  rutineView: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: '5%',
  },
  rutineText1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '90%',
  },
  rutineText2: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '70%',
  },
  rutineTime: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '35%',
  },
});

export default Module;
