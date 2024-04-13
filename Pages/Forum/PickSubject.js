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
        <Text style={styles.title}>Vælg et forum at interagere med</Text>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Familie',
                forumDescription:
                  'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
              })
            }>
            <Text style={styles.text}>Familie</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Relationer',
                forumDescription:
                  'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
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
                  'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
              })
            }>
            <Text style={styles.text}>Medicin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.knowledgeView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Forum', {
                forumTitle: 'Gode tips',
                forumDescription:
                  'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
              })
            }>
            <Text style={styles.text}>Gode tips</Text>
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
