import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export const PickTopics = () => {
  const navigation = useNavigation();
  const testImage = 'no_picture.png';
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Hvad vil du gerne læse om?</Text>
        <View style={[styles.frontView, styles.shadowProp]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subject articles', {subject: 'diagnosis'})
            }>
            <ImageBackground
              source={require('../../Assets/images/Relations.png')}
              style={styles.images}
              resizeMode="cover">
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.subButton}]}
                onPress={() =>
                  navigation.navigate('Subject articles', {
                    subject: 'diagnosis',
                  })
                }>
                <Text style={styles.text}>Getting diagnosed with ADHD/ADD</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subject articles', {subject: 'women'})
            }>
            <ImageBackground
              source={require('../../Assets/images/Relations.png')}
              style={styles.images}
              resizeMode="cover">
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.subButton}]}
                onPress={() =>
                  navigation.navigate('Subject articles', {
                    subject: 'women',
                  })
                }>
                <Text style={styles.text}>Women and ADHD/ADD</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subject articles', {subject: 'adhd'})
            }>
            <ImageBackground
              source={require('../../Assets/images/Relations.png')}
              style={styles.images}
              resizeMode="cover">
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.subButton}]}
                onPress={() =>
                  navigation.navigate('Subject articles', {
                    subject: 'adhd',
                  })
                }>
                <Text style={styles.text}>What is ADHD?</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Subject articles', {
                subject: 'relationships',
              })
            }>
            <ImageBackground
              source={require('../../Assets/images/Relations.png')}
              style={styles.images}
              resizeMode="cover">
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.subButton}]}
                onPress={() =>
                  navigation.navigate('Subject articles', {
                    subject: 'relationships',
                  })
                }>
                <Text style={styles.text}>Relationships and ADHD</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
    marginLeft: 11,
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
    color: 'black',
    marginBottom: 15,
    marginTop: 35,
  },
  button: {
    width: 260,
    height: 30,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 100,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',

    fontSize: 16,
  },
});

export default PickTopics;
