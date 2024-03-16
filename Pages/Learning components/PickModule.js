import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickModule = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>What would you like to learn about?</Text>
        <View style={styles.knowledgeView}>
          <View style={styles.progessionBar}>
            <Text style={styles.text}>0%</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <View style={styles.progessionBar}></View>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <View style={styles.progessionBar}></View>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <View style={styles.progessionBar}></View>
          <TouchableOpacity
            style={styles.button}
            //   onPress={() => navigation.navigate('')}
          >
            <Text style={styles.text}>... will come</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <View style={styles.progessionBar}></View>
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
  progessionBar: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#61646B',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
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
