import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickSubject = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Pick a forum to interact with</Text>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Family',
                forumDescription:
                  'With this forum the aim is to foster a supportive and informative environment where we can all share experiences, challenges, and triumphs related to family.',
              })
            }>
            <Text style={styles.text}>Family</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Relationships',
                forumDescription:
                  'Relationships can sometimes be complicated when you have ADHD, and in this forum you can share tips, frustrations etc. when dealing with relationships.',
              })
            }>
            <Text style={styles.text}>Relationships</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Medicin',
                forumDescription:
                  'Medicin can be a difficult topic to talk about. Please keep the medicin in this forum, and remember to contact a doctor if necessary.',
              })
            }>
            <Text style={styles.text}>Medicin</Text>
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

export default PickSubject;
