import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import BottomNavigation from '../../Navigation/BottomNav';

export const StructureFrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{paddingBottom: 20}}>
        <Text
          style={[
            styles.title,
            {color: colors.text, fontSize: 22 * scaleFactor},
          ]}>
          Hvad vil du gerne lave i dag?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Calendar')}>
          <View
            style={[
              styles.buttonGrad,
              {backgroundColor: colors.mainButton, width: '90%'},
            ]}>
            <Image
              source={require('../../Assets/images/structure_calendar.png')}
              style={[
                styles.images,
                {
                  width: 100 * scaleFactor,
                  height: 100 * scaleFactor,
                },
              ]}></Image>
            <Text
              style={[
                styles.text,
                {color: colors.text, fontSize: 18 * scaleFactor},
              ]}>
              Kalender
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Daily overview')}>
          <View
            style={[
              styles.buttonGrad,
              {backgroundColor: colors.mainButton, width: '90%'},
            ]}>
            <Image
              source={require('../../Assets/images/structure_dailyOverview.png')}
              style={[
                styles.images,
                {
                  width: 160 * scaleFactor,
                  height: 100 * scaleFactor,
                },
              ]}></Image>
            <Text
              style={[
                styles.text,
                {color: colors.text, fontSize: 18 * scaleFactor},
              ]}>
              Dags oversigt
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Notebook')}>
          <View
            style={[
              styles.buttonGrad,
              {backgroundColor: colors.mainButton, width: '90%'},
            ]}>
            <Image
              source={require('../../Assets/images/structure_notebook.png')}
              style={[
                styles.images,
                {
                  width: 140 * scaleFactor,
                  height: 100 * scaleFactor,
                },
              ]}></Image>
            <Text
              style={[
                styles.text,
                {color: colors.text, fontSize: 18 * scaleFactor},
              ]}>
              Notesbog
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.knowledgeViewSmall,
              {
                backgroundColor: colors.mainButton,
                borderColor: colors.mainButton,
                marginRight: '1%',
              },
            ]}
            onPress={() => navigation.navigate('Add task')}>
            <Image
              source={require('../../Assets/images/structure_todo.png')}
              style={styles.imageSmall}></Image>
            <Text style={{fontSize: 18 * scaleFactor, marginTop: '1%'}}>
              Ny to-do
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.knowledgeViewSmall,
              {
                backgroundColor: colors.mainButton,
                borderColor: colors.mainButton,
                marginHorizontal: '1%',
              },
            ]}
            onPress={() => navigation.navigate('Add routine')}>
            <Image
              source={require('../../Assets/images/structure_routine.png')}
              style={styles.imageSmall}></Image>
            <Text style={{fontSize: 18 * scaleFactor, marginTop: '1%'}}>
              Ny rutine
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.knowledgeViewSmall,
              {
                backgroundColor: colors.mainButton,
                borderColor: colors.mainButton,
                marginLeft: '1%',
              },
            ]}
            onPress={() => navigation.navigate('Add event')}>
            <Image
              source={require('../../Assets/images/structure_event.png')}
              style={styles.imageSmall}></Image>
            <Text style={{fontSize: 18 * scaleFactor, marginTop: '1%'}}>
              Nyt event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginVertical: '5%',
  },
  text: {
    textAlign: 'center',
  },
  buttonGrad: {
    borderRadius: 10,
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  press: {
    marginBottom: 15,
  },
  images: {
    marginTop: 10,
    marginBottom: 10,
  },
  knowledgeViewSmall: {
    height: '40%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  imageSmall: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default StructureFrontPage;