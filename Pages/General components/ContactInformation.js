import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

export const ContactInformation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textStyle}>Kontaktinformationer</Text>
      </View>
      <View style={styles.seperator}></View>
      <Text style={styles.contactText}>
        Har du har spørgsmål, problemer eller feedback, er du velkommen til at
        tage kontakt til os. Vi vil meget gerne høre fra dig!
      </Text>
      <View style={styles.contactContainer}>
        <View style={styles.contact}>
          <View style={styles.phoneAndMail}>
            <FontAwesomeIcon icon={faPhone} style={styles.icons} size={25} />
            <Text style={styles.phoneAndMailText}>+45 31652107</Text>
          </View>
        </View>
        <View style={styles.contact}>
          <View style={styles.phoneAndMail}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.icons} size={25} />
            <Text style={styles.phoneAndMailText}>emhb@itu.dk</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 25,
  },
  seperator: {
    height: 1,
    width: '75%',
    backgroundColor: 'black',
    marginTop: 10,
    marginBottom: 30,
  },
  contactText: {
    fontSize: 15,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 10,
  },
  contact: {
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    width: 350,
    height: 50,
    marginTop: 30,
  },
  icons: {
    margin: 13,
    marginLeft: 20,
  },
  phoneAndMail: {
    flexDirection: 'row',
  },
  phoneAndMailText: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default ContactInformation;
