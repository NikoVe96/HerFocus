import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBoxArchive} from '@fortawesome/free-solid-svg-icons/faBoxArchive';

export const AppHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textStyle}>Om herfocus</Text>
      </View>
      <View style={styles.seperator}></View>
      <Text style={styles.aboutText}>
        herfocus er en app af kvinder, for kvinder med ADHD. Vi er to kvindelige
        IT-studerende fra IT-Universitetet i København, drevet af en personlig
        mission om at gøre hverdagen lettere for dem med ADHD.
      </Text>
      <Text style={styles.aboutText}>
        Vores rejse startede, da en af os så, hvordan hendes lillesøster kæmpede
        med de daglige udfordringer ADHD medførte. Dette inspirerede os til at
        udvikle en løsning, der ikke blot adresserer de unikke behov hos kvinder
        med ADHD, men også fejrer deres styrker og potentiale.
      </Text>
      <Text style={styles.aboutText}>
        I samarbejde med kvinder, der lever med ADHD, har vi designet herfocus
        til at være et støttende værktøj, hvor kvinder med ADHD kan finde
        forståelse, støtte og empowerment.
      </Text>
      <Text style={styles.aboutText}>
        Tak fordi du vælger at være en del af vores fællesskab. Sammen gør vi en
        forskel!
      </Text>
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
  },
  textStyle: {
    fontSize: 25,
  },
  seperator: {
    height: 1,
    width: '60%',
    backgroundColor: 'black',
    marginTop: 10,
    marginBottom: 20,
  },
  icons: {
    marginRight: 10,
  },
  aboutText: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default AppHistory;
