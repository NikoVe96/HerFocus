import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigation from '../../Navigation/BottomNav';

export const StructureFrontPage = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <SafeAreaView style={styles.container}>
      <ScrollView>
          <Text style={styles.title}>Hvad skal du planlægge i dag?</Text>
          <TouchableOpacity
            style={styles.knowledgeView}
            onPress={() => navigation.navigate('Calendar')}>
            <ImageBackground
              source={require('../../Assets/images/calendar_background.png')}
              style={styles.images}
              resizeMode="cover">
              <View
                style={[styles.button, {backgroundColor: colors.subButton}]}>
                <Text style={styles.text}>Kalender</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.knowledgeView, {backgroundColor: colors.mainButton}]}
            onPress={() => navigation.navigate('Daily overview')}>
            <ImageBackground
              source={require('../../Assets/images/daily_overview.png')}
              style={styles.images}
              resizeMode="cover">
              <View
                style={[styles.button, {backgroundColor: colors.subButton}]}>
                <Text style={styles.text}>Daglig oversigt</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginHorizontal: 22}}>
            <TouchableOpacity
              style={styles.knowledgeViewSmall}
              onPress={() => navigation.navigate('Add task')}>
              <ImageBackground
                source={require('../../Assets/images/to-do.png')}
                style={styles.images}
                resizeMode="cover">
                <View
                  style={[
                    styles.buttonSmall,
                    {backgroundColor: colors.subButton},
                  ]}>
                  <Text style={styles.textSmall}>Ny to-do</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.knowledgeViewSmall}
              onPress={() => navigation.navigate('Add routine')}>
              <ImageBackground
                source={require('../../Assets/images/watch.png')}
                style={styles.images}
                resizeMode="cover">
                <View
                  style={[
                    styles.buttonSmall,
                    {backgroundColor: colors.subButton},
                  ]}>
                  <Text style={styles.textSmall}>Ny rutine</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.knowledgeViewSmall}
              onPress={() => navigation.navigate('Add event')}>
              <ImageBackground
                source={require('../../Assets/images/coffee_chat.png')}
                style={styles.images}
                resizeMode="cover">
                <View
                  style={[
                    styles.buttonSmall,
                    {backgroundColor: colors.subButton},
                  ]}>
                  <Text style={styles.textSmall}>Nyt event</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.knowledgeView,
              {backgroundColor: colors.mainButton},
            ]}>
            <ImageBackground
              source={require('../../Assets/images/notebook_background.png')}
              style={styles.images}
              resizeMode="cover">
              <View
                style={[styles.button, {backgroundColor: colors.subButton}]}
                //onPress={() => navigation.navigate('Daily overview')}
              >
                <Text style={styles.text}>Notesbog</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
      </ScrollView>
        <BottomNavigation />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  knowledgeView: {
    width: 330,
    height: 140,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 20,
    alignSelf: 'center',
    marginBottom: 5,
  },
  knowledgeViewSmall: {
    height: 90,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
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
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 50,
    justifyContent: 'center',
    marginTop: 100,
  },
  buttonSmall: {
    width: '80%',
    height: 30,
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
  textSmall: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  images: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 7,
    borderWidth: 0.2,
  },
});

export default StructureFrontPage;