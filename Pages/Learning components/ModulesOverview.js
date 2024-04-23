import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownLong, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const ModulesOverview = ({ route }) => {
  const { subject, image, description } = route.params;
  const [modules, setModules] = useState([]);
  const [completed, setCompleted] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const moduleImages = {
    '1 Struktur og planlægning': require('../../Assets/images/learning_think.png'),
    '2 Struktur og planlægning': require('../../Assets/images/learning_goals.png'),
    '3 Struktur og planlægning': require('../../Assets/images/learning_notebook.png'),
  };

  useEffect(() => {
    modulesQuery();
    completedQuery();
    console.log(subject)
  }, []);

  async function modulesQuery() {
    let query = new Parse.Query('LearningModules');
    query.contains('subject', subject);
    query.ascending('name');
    const Result = await query.find();
    setModules(Result);
  }

  async function completedQuery() {
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Settings');
    query.contains('user', currentUser.id);
    const result = await query.first();
    setCompleted(result.get('modulesCompleted'));
  }

  function handleNewCompletion() {
    completedQuery();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>{subject}</Text>
        <Image
          source={image}
          style={{ width: 200, height: 170, alignSelf: 'center' }}></Image>
        <Text style={styles.description}>{description}</Text>
        <View style={[styles.border, { backgroundColor: colors.border, borderColor: colors.border }]}></View>
        <View style={{ marginTop: 30 }}>
          {modules.length == 0 ? (
            <Text>Loading...</Text>
          ) : (
            modules.map((item, index) => {
              const moduleSignature = `${item.get('name')} ${item.get('subject',)}`;
              const moduleImage = moduleImages[moduleSignature]
              const isCompleted = completed.includes(moduleSignature);
              return (
                <View key={index} style={styles.container}>
                  <View>
                    {isCompleted && (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size={30}
                        color="#2F5233"
                        style={styles.progessionBar}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Module', {
                          module: item,
                          subject: subject,
                          image: image,
                          description: description,
                          onNewCompletion: handleNewCompletion(),
                        })
                      }>
                      <View style={[styles.buttonParent, { backgroundColor: colors.mainButton }]}>
                        <View style={[styles.buttonGrad, { backgroundColor: colors.subButton }]}>
                          <Image
                            source={moduleImage}
                            style={styles.image}></Image>
                          <View style={{ width: 100 }}>
                            <Text style={styles.moduleName}>
                              Modul {item.get('name')}
                            </Text>
                            <Text style={styles.moduleDesc}>
                              {item.get('description')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {index !== (modules.length - 1) ?
                    <FontAwesomeIcon
                      icon={faDownLong}
                      size={30}
                      style={{ marginVertical: 15 }}
                    />
                    : <Text></Text>
                  }

                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
  },
  moduleName: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
  },
  border: {
    borderWidth: 1,
    backgroundColor: 'black',
    width: 300,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
  image: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonGrad: {
    height: 90,
    width: 200,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonParent: {
    height: 90,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#DC9B18',
    alignSelf: 'center',
    elevation: 20,
    zIndex: 1,
  },
  progessionBar: {
    width: '20%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 5,
    top: '-20%',
    right: '-3%'
  },
});

export default ModulesOverview;
