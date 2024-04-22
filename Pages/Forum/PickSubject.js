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
import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickSubject = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
   const {width, height} = Dimensions.get('window');
   const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            {color: colors.text, fontSize: 22 * scaleFactor},
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
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/Heart.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}></Image>
              <Text style={styles.text}>Familie</Text>
            </View>
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
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/Hands.png')}
                style={{
                  width: 100,
                  height: 110,
                  marginTop: 10,
                  marginBottom: 4,
                }}></Image>
              <Text style={styles.text}>Relationer</Text>
            </View>
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
        <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
          <View
            style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
            <Image
              source={require('../../Assets/images/Medicin.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text style={styles.text}>Medicin</Text>
          </View>
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
        <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
          <View
            style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
            <Image
              source={require('../../Assets/images/Tips.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text style={styles.text}>Gode tips</Text>
          </View>
        </View>
      </TouchableOpacity>
         </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 30,
    marginTop: 35,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGrad: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
  },
  buttonParent: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#DC9B18',
    alignSelf: 'center',
    elevation: 10,
    zIndex: 1,
  },
  press: {
    marginBottom: 15,
  },
});

export default PickSubject;
