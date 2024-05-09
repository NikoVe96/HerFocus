import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigation from '../../Navigation/BottomNav';

export const PickSubject = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 22 * scaleFactor },
          ]}>
          Hvilket emne vil du dykke ned i?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Familie',
              forumDescription:
                'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
            })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Heart.png')}
              style={styles.images}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Familie
            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Relationer',
              forumDescription:
                'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
            })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Hands.png')}
              style={styles.images}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Relationer
            </Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Medicin',
              forumDescription:
                'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Medicin.png')}
              style={styles.images}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Medicin
            </Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Gode tips',
              forumDescription:
                'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Tips.png')}
              style={styles.images}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Gode tips
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 35,
    marginTop: 35,
  },
  text: {
    textAlign: 'center',
  },
  buttonGrad: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  press: {
    marginBottom: 15,
  },
  images: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PickSubject;
