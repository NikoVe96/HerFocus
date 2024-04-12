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

export const PickTopics = () => {
  const navigation = useNavigation();
  const testImage = 'no_picture.png';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>What would you like to read about?</Text>
        <TouchableOpacity
          style={styles.knowledgeView}
          onPress={() => navigation.navigate('Subject articles', { subject: 'diagnosis' })}
        >
          <Image source={require(`../../Assets/images/${testImage}`)} style={{ width: 70, height: 70 }} />
          <Text style={styles.text}>Getting diagnosed with ADHD/ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knowledgeView}
          onPress={() => navigation.navigate('Subject articles', { subject: 'women' })}
        >
          <Image source={require('../../Assets/images/no_picture.png')} style={{ width: 70, height: 70 }} />
          <Text style={styles.text}>Women and ADHD/ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knowledgeView}
          onPress={() => navigation.navigate('Subject articles', { subject: 'adhd' })}
        >
          <Image source={require('../../Assets/images/no_picture.png')} style={{ width: 70, height: 70 }} />
          <Text style={styles.text}>What is ADHD?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knowledgeView}
          onPress={() => navigation.navigate('Subject articles', { subject: 'relationships' })}
        >
          <Image source={require('../../Assets/images/no_picture.png')} style={{ width: 70, height: 70 }} />
          <Text style={styles.text}>Relationships and ADHD</Text>
        </TouchableOpacity>
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
    height: 120,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10
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

export default PickTopics;
