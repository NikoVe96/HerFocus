import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faListCheck,
  faGraduationCap,
  faBrain,
  faUser,
  faComments,
  faGear,
  faUsers,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {getHeaderTitle} from '@react-navigation/elements';
import AccordionItem from '../Components/AccordionItem';
import TopNavigation from './TopNav';
import AddRoutine from '../Pages/Structure components/AddRoutine';
import AddTask from '../Pages/Structure components/AddTask';
import CalendarOverview from '../Pages/Structure components/CalendarOverview';
import ForgotPassword from '../Pages/General components/ForgotPassword';
import FrontPage from '../Pages/General components/FrontPage';
import LogIn from '../Pages/General components/Login';
import Profile from '../Pages/General components/Profile';
import SignUp from '../Pages/General components/SignUp';
import UserSettings from '../Pages/General components/UserSettings';
import PickTopics from '../Pages/Knowledge base/PickTopic';
import PickModule from '../Pages/Learning components/PickModule';
import DailyOverview from '../Pages/Structure components/DailyOverview';
import PickSubject from '../Pages/Forum/PickSubject';
import {FavoritePosts} from '../Pages/Forum/FavoritePosts';
import FavoriteArticles from '../Pages/Knowledge base/FavoriteArticles';
import AppHistory from '../Pages/General components/AppHistory';
import ContactInformation from '../Pages/General components/ContactInformation';
import {useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';

const Drawer = createDrawerNavigator();

const handleLogout = async navigation => {
  try {
    await Parse.User.logOut();
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error logging out', error);
  }
};

function CustomDrawerContent({navigation}) {
  return (
    <DrawerContentScrollView>
      <AccordionItem title="Structure" icon={faListCheck}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Add routine')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Add a new routine </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Add task')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Add a new task </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Calendar')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Calendar overview </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Daily overview')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Daily overview </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="Forums" icon={faComments}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Pick subject')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Pick a subject </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Favorite posts')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Favorite posts </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="Learning modules" icon={faGraduationCap}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Pick module')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18}}>Modules </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Module 1</Text>
            <Text style={{fontSize: 18}}>What is ADHD </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Module 2</Text>
            <Text style={{fontSize: 18}}>
              how to handle getting overwhelmed{' '}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity style={{flexDirection: 'row', marginLeft: 30}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Module 3</Text>
            <Text style={{fontSize: 18}}>Structuring your daily life </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Module 4</Text>
            <Text style={{fontSize: 18}}>Long term goals </Text>
          </View>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="Knowledge base" icon={faBrain}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Pick topic')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Pick a topic </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Favorite articles')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Favorite articles </Text>
        </TouchableOpacity>
      </AccordionItem>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => navigation.navigate('Profile')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              style={{marginRight: 10}}
            />
            <Text style={styles.accordTitle}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
      <AccordionItem title="Settings" icon={faGear}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Notifications</Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Color theme</Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="About us" icon={faUsers}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('App history')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>History</Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginVertical: 10,
            borderColor: 'grey',
          }}></View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Contact information')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18}}>Help and contact info</Text>
        </TouchableOpacity>
      </AccordionItem>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => handleLogout(navigation)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={20}
              style={{marginRight: 10}}
            />
            <Text style={styles.accordTitle}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function SideMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        header: props => <TopNavigation {...props} />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Add routine" component={AddRoutine}></Drawer.Screen>
      <Drawer.Screen name="Add task" component={AddTask}></Drawer.Screen>
      <Drawer.Screen name="App history" component={AppHistory}></Drawer.Screen>
      <Drawer.Screen
        name="Contact information"
        component={ContactInformation}></Drawer.Screen>
      <Drawer.Screen
        name="Calendar"
        component={CalendarOverview}></Drawer.Screen>
      <Drawer.Screen
        name="Forgot password"
        component={ForgotPassword}></Drawer.Screen>
      <Drawer.Screen name="Front page" component={FrontPage}></Drawer.Screen>
      <Drawer.Screen name="Login" component={LogIn}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
      <Drawer.Screen name="Sign up" component={SignUp}></Drawer.Screen>
      <Drawer.Screen name="Settings" component={UserSettings}></Drawer.Screen>
      <Drawer.Screen name="Pick topic" component={PickTopics}></Drawer.Screen>
      <Drawer.Screen name="Pick module" component={PickModule}></Drawer.Screen>
      <Drawer.Screen
        name="Daily overview"
        component={DailyOverview}></Drawer.Screen>
      <Drawer.Screen
        name="Pick subject"
        component={PickSubject}></Drawer.Screen>
      <Drawer.Screen
        name="Favorite posts"
        component={FavoritePosts}></Drawer.Screen>
      <Drawer.Screen
        name="Favorite articles"
        component={FavoriteArticles}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: 'lightblue',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});

export default SideMenu;
