import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faPenToSquare,
  faPlusSquare,
  faFloppyDisk,
  faFaceTired,
  faFaceSmileBeam,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStopwatch,
  faTrashCan,
  faCircleArrowRight,
  faSpinner,
  faShoppingCart,
  faKitchenSet,
} from '@fortawesome/free-solid-svg-icons';
import Parse from 'parse/react-native';
import BottomNavigation from '../../Navigation/BottomNav';

export const PickModule = () => {
  const navigation = useNavigation();
  const [structuringProgress, setStructuringProgress] = useState('0');
  const [procrastinationProgress, setProcrastinationProgress] = useState('0');
  const [relationsProgress, setRelationsProgress] = useState('0');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const { colors } = useTheme();
  const moduleSubjects = [
    {
      subject: 'Struktur og planlægning',
      description: 'I dette modul vil du lære om forskellige værktøjer til at strukturere dit liv og din hverdag. For voksne med ADHD kan det være en fordel at have specifikke mål, tidsrammer og værktøjer til at opnå dine mål, og derfor har vi samlet nogle øvelser der kan give dig de bedste chancer for success og give mere overskud i hverdagen.',
      image: require('../../Assets/images/learning_notebook.png'),
    },
    {
      subject: 'Overspringshandlinger',
      description:
        'In the time management learning module, you will learn how to...',
      image: require('../../Assets/images/learning_hourglass.png'),
    },
  ];

  useEffect(() => {
    getProgress('Struktur og planlægning');
    getProgress('Overspringshandlinger1'),
      getProgress('Relationer1');
  }, []);

  async function getProgress(subject) {
    const currentUser = await Parse.User.currentAsync();

    let totalModules = new Parse.Query('LearningModules');
    totalModules.equalTo('subject', subject);
    const totalModulesResults = await totalModules.find();

    let completedModulesQ = new Parse.Query('Settings');
    completedModulesQ.equalTo('user', currentUser);
    completedResults = await completedModulesQ.find();
    let completedModules = 0;
    completedResults[0].get('modulesCompleted').forEach(module => {
      if (completedResults[0].get('modulesCompleted').filter(module => module.includes(subject))) {
        completedModules += 1;
      }
    });

    switch (subject) {
      case 'Struktur og planlægning':
        if (completedModules.length !== 0) {
          setStructuringProgress((completedModules / totalModulesResults.length) * 100);
        }
        break;
      case 'Overspringshandlinger':
        if (completedModules.length !== 0) {
          setProcrastinationProgress((completedModules / totalModulesResults.length) * 100);
        }
        break;
      case 'Y':
        if (completedModules.length !== 0) {
          setRelationsProgress((completedModules / totalModulesResults.length) * 100);
        }
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Hvad vil du gerne lære om i dag?</Text>
        <View style={{marginVertical: 20}}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.subButton,
                borderColor: colors.subButton,
              },
            ]}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {structuringProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[0].subject,
                description: moduleSubjects[0].description,
                image: moduleSubjects[0].image,
              })
            }>
            <View
              style={[styles.buttonParent, {backgroundColor: colors.border}]}>
              <View
                style={[
                  styles.buttonGrad,
                  {backgroundColor: colors.mainButton},
                ]}>
                <Animated.Image
                  source={require('../../Assets/images/learning_notebook.png')}
                  style={{width: 120, height: 100, marginTop: 5}}
                  sharedTransitionTag="structure"></Animated.Image>
                <Text style={styles.text}>
                  Planlægning og strukturering af hverdagen
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.subButton,
                borderColor: colors.subButton,
              },
            ]}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {procrastinationProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[1].subject,
                description: moduleSubjects[1].description,
                image: moduleSubjects[1].image,
              })
            }>
            <View
              style={[styles.buttonParent, {backgroundColor: colors.border}]}>
              <View
                style={[
                  styles.buttonGrad,
                  {backgroundColor: colors.mainButton},
                ]}>
                <Animated.Image
                  source={require('../../Assets/images/learning_hourglass.png')}
                  style={{width: 60, height: 95, marginTop: 5}}
                  sharedTransitionTag="structure"></Animated.Image>
                <Text style={styles.text}>Overkom overspringshandlinger</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.subButton,
                borderColor: colors.subButton,
              },
            ]}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {relationsProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[0].subject,
                description: moduleSubjects[0].description,
                image: moduleSubjects[0].image,
              })
            }>
            <View
              style={[styles.buttonParent, {backgroundColor: colors.border}]}>
              <View
                style={[
                  styles.buttonGrad,
                  {backgroundColor: colors.mainButton},
                ]}>
                <Animated.Image
                  source={require('../../Assets/images/learning_relations.png')}
                  style={{width: 140, height: 95, marginTop: 5}}
                  sharedTransitionTag="structure"></Animated.Image>
                <Text style={styles.text}>Forbedr dine sociale relationer</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
        <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  scrollView: {
    paddingBottom: 20,
  },
  knowledgeView: {
    width: 330,
    height: 150,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
    justifyContent: 'center',
    bottom: 10,
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
  progessionBar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 5,
    elevation: 5,
    right: '3%',
    top: '-15%'
  },
  button: {
    width: 210,
    height: 30,
    backgroundColor: '#61646B',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonGrad: {
    width: 330,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
  },
  buttonParent: {
    width: 330,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#DC9B18',
    alignSelf: 'center',
    elevation: 10,
    zIndex: 1,
  },
});

export default PickModule;
