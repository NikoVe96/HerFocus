import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickTopics = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>What would you like to read about?</Text>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
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
    height: 90,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
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
    backgroundColor: '#61646B',
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
