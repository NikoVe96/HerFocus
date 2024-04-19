import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickSubject = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.title, {color: colors.text}]}>
            Vælg et forum at interagere med
          </Text>
          <View style={[styles.frontView, styles.shadowProp]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Forum', {
                  forumTitle: 'Familie',
                  forumDescription:
                    'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
                })
              }>
              <ImageBackground
                source={require('../../Assets/images/Tips.png')}
                style={styles.images}
                resizeMode="cover">
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.subButton}]}
                  onPress={() =>
                    navigation.navigate('Forum', {
                      forumTitle: 'Familie',
                      forumDescription:
                        'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
                    })
                  }>
                  <Text style={[styles.text, {color: colors.text}]}>
                    Familie
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={[styles.frontView, styles.shadowProp]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Forum', {
                  forumTitle: 'Relationer',
                  forumDescription:
                    'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
                })
              }>
              <ImageBackground
                source={require('../../Assets/images/Tips.png')}
                style={styles.images}
                resizeMode="cover">
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.subButton}]}
                  onPress={() =>
                    navigation.navigate('Forum', {
                      forumTitle: 'Relationer',
                      forumDescription:
                        'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
                    })
                  }>
                  <Text style={[styles.text, {color: colors.text}]}>
                    Relationships
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={[styles.frontView, styles.shadowProp]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Forum', {
                  forumTitle: 'Medicin',
                  forumDescription:
                    'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
                })
              }>
              <ImageBackground
                source={require('../../Assets/images/Tips.png')}
                style={styles.images}
                resizeMode="cover">
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.subButton}]}
                  onPress={() =>
                    navigation.navigate('Forum', {
                      forumTitle: 'Medicin',
                      forumDescription:
                        'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
                    })
                  }>
                  <Text style={[styles.text, {color: colors.text}]}>
                    Medicin
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={[styles.frontView, styles.shadowProp]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Forum', {
                  forumTitle: 'Gode tips',
                  forumDescription:
                    'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
                })
              }>
              <ImageBackground
                source={require('../../Assets/images/Tips.png')}
                style={styles.images}
                resizeMode="cover">
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.subButton}]}
                  onPress={() =>
                    navigation.navigate('Forum', {
                      forumTitle: 'Gode tips',
                      forumDescription:
                        'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
                    })
                  }>
                  <Text style={[styles.text, {color: colors.text}]}>
                    Gode tips
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 30,
  },
  frontView: {
    width: 330,
    height: 140,
    marginTop: 10,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  images: {
    width: 320,
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 35,
  },
  button: {
    width: 210,
    height: 30,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 100,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default PickSubject;
