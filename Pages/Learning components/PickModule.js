import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faPlusSquare, faFloppyDisk, faFaceTired, faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faTrashCan, faCircleArrowRight, faSpinner, faShoppingCart, faKitchenSet } from '@fortawesome/free-solid-svg-icons';

export const PickModule = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState('0%');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const moduleSubjects = [
    { subject: 'Structure', description: 'In the structure learning module, you will learn how to...', image: require('../../Assets/images/planning_learning_module.png') },
    { subject: 'Time management', description: 'In the time management learning module, you will learn how to...', image: require('../../Assets/images/planning_learning_module.png') }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>What would you like to learn about?</Text>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <TouchableOpacity style={styles.knowledgeView} onPress={() => navigation.navigate('Module overview', { subject: moduleSubjects[0].subject, description: moduleSubjects[0].description, image: moduleSubjects[0].image })}>
            <Animated.Image
              source={require('../../Assets/images/planning_learning_module.png')}
              style={{ width: 110, height: 110 }}
              sharedTransitionTag="structure"></Animated.Image>
            <Text style={styles.text}>Plan and structure your everyday life</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Module overview', { subject: 'Time management', description: timeManagementDesc })}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={() => navigation.navigate('')}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={() => navigation.navigate('')}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={() => navigation.navigate('')}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={() => navigation.navigate('')}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>{progress}</Text>
          </View>
          <View style={styles.knowledgeView}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={() => navigation.navigate('')}
            >
              <Text style={styles.text}>... will come</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF6ED',
    flex: 1,
  },
  scrollView: {
    marginLeft: 11,
  },
  knowledgeView: {
    width: 330,
    height: 150,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
    justifyContent: 'center'
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#61646B',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 5
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
});

export default PickModule;
