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
  Dimensions
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownLong, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import BottomNavigation from '../../Navigation/BottomNav';

export const ModulesOverview = ({ route }) => {
  const { subject, image, description } = route.params;
  const [modules, setModules] = useState([]);
  const [completed, setCompleted] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const moduleImages = {
    '1 Struktur og planlægning': require('../../Assets/images/learning_think.png'),
    '2 Struktur og planlægning': require('../../Assets/images/learning_goals.png'),
    '3 Struktur og planlægning': require('../../Assets/images/learning_clock.png'),
    '4 Struktur og planlægning': require('../../Assets/images/learning_score.png'),
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
    query.equalTo('user', currentUser.id);
    const result = await query.first();
    if (result) {
      setCompleted(result.get('modulesCompleted') || []);
    }
  }

   async function handleModuleCompletion(moduleSignature) {
     const currentUser = await Parse.User.currentAsync();
     let query = new Parse.Query('Settings');
     query.equalTo('user', currentUser);
     const result = await query.first();

     if (result) {
       let modulesCompleted = result.get('modulesCompleted') || [];
       if (!modulesCompleted.includes(moduleSignature)) {
         modulesCompleted.push(moduleSignature);
         result.set('modulesCompleted', modulesCompleted);
         await result.save();
         setCompleted(modulesCompleted);
       }
     }
   }

    useEffect(() => {
      navigation.setOptions({
        handleModuleCompletion: moduleSignature =>
          handleModuleCompletion(moduleSignature),
      });
    }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            {
              fontSize: 30 * scaleFactor,
              color: colors.text,
            },
          ]}>
          {subject}
        </Text>
        <Image
          source={image}
          style={{
            width: 200 * scaleFactor,
            height: 170 * scaleFactor,
            alignSelf: 'center',
          }}></Image>
        <Text style={[styles.description, { fontSize: 16 * scaleFactor, color: colors.text }]}>
          {description}
        </Text>
        <View
          style={[
            styles.border,
            { backgroundColor: colors.border, borderColor: colors.border },
          ]}></View>
        <View style={{ marginTop: '4%' }}>
          {modules.length == 0 ? (
            <Text>Loading...</Text>
          ) : (
            modules.map((item, index) => {
              const moduleSignature = `${item.get('name')} ${item.get(
                'subject',
              )}`;
              const moduleImage = moduleImages[moduleSignature];
              const isCompleted = completed.includes(moduleSignature);
              return (
                <View key={index} style={styles.container}>
                  <View>
                    {isCompleted && (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size={30 * scaleFactor}
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
                          onNewCompletion:
                            () => handleModuleCompletion(moduleSignature),
                        })
                      }>
                      <View
                        style={[
                          styles.buttonGrad,
                          {
                            backgroundColor: colors.subButton,
                            height: 90 * scaleFactor,
                            width: 250 * scaleFactor,
                          },
                        ]}>
                        <Image
                          source={moduleImage}
                          style={[
                            styles.image,
                            { height: 50 * scaleFactor, width: 50 * scaleFactor },
                          ]}></Image>
                        <View style={{ width: '60%', marginLeft: '3%' }}>
                          <Text
                            style={[
                              styles.moduleName,
                              { fontSize: 16 * scaleFactor, color: colors.text },
                            ]}>
                            Modul {item.get('name')}
                          </Text>
                          <Text
                            style={[styles.moduleDesc, {color: colors.text}]}>
                            {item.get('description')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {index !== modules.length - 1 ? (
                    <FontAwesomeIcon
                      icon={faDownLong}
                      size={30 * scaleFactor}
                      style={{ marginVertical: 15 }}
                    />
                  ) : (
                    <Text></Text>
                  )}
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
    textAlign: 'center',
    marginVertical: '2%'
  },
  moduleName: {
    fontWeight: 'bold',
  },
  description: {
    padding: 10,
    marginHorizontal: '3%',
  },
  border: {
    borderWidth: 1,
    width: '80%',
    marginVertical: '2%',
    alignSelf: 'center',
    borderRadius: 10
  },
  image: {
    marginHorizontal: '2%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
  },
  buttonGrad: {
    borderRadius: 10,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
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
    right: '-3%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});

export default ModulesOverview;
