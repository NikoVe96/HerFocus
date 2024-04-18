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
import {useNavigation, useTheme} from '@react-navigation/native';
import Parse from 'parse/react-native';
import SubjectArticles from '../Pages/Knowledge base/SubjectArticles';
import ViewArticle from '../Pages/Knowledge base/ViewArticle';
import StructureFrontPage from '../Pages/Structure components/StructureFrontPage';
import AddEvent from '../Pages/Structure components/AddEvent';
import Module from '../Pages/Learning components/Module';
import ModulesOverview from '../Pages/Learning components/ModulesOverview';
import Forum from '../Pages/Forum/Forum';
import IndividualPost from '../Pages/Forum/IndividualPost';

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
  const {colors} = useTheme();

  return (
    <DrawerContentScrollView style={{backgroundColor: colors.background}}>
      <AccordionItem title="Structure" icon={faListCheck}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Add routine')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            style={{marginRight: 10}}
            color={colors.primary}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Add a new routine{' '}
          </Text>
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
            style={{marginRight: 10}}
            color={colors.primary}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Add a new task{' '}
          </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Calendar overview{' '}
          </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Daily overview{' '}
          </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="Forums" icon={faComments}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Pick subject')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Pick a subject{' '}
          </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Favorite posts{' '}
          </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem title="Learning modules" icon={faGraduationCap}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('Pick module')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text style={{fontSize: 18, color: colors.primary}}>Modules </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.primary}}>
              Module 1
            </Text>
            <Text style={{fontSize: 18, color: colors.primary}}>
              What is ADHD{' '}
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
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.primary}}>
              Module 2
            </Text>
            <Text style={{fontSize: 18, color: colors.primary}}>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.primary}}>
              Module 3
            </Text>
            <Text style={{fontSize: 18, color: colors.primary}}>
              Structuring your daily life{' '}
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
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.primary}}>
              Module 4
            </Text>
            <Text style={{fontSize: 18, color: colors.primary}}>
              Long term goals{' '}
            </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Pick a topic{' '}
          </Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Favorite articles{' '}
          </Text>
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
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <Text style={[styles.accordTitle, {color: colors.primary}]}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => navigation.navigate('Settings')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <Text style={[styles.accordTitle, {color: colors.primary}]}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <AccordionItem title="About us" icon={faUsers}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}
          onPress={() => navigation.navigate('App history')}>
          <FontAwesomeIcon
            icon={faCircle}
            size={13}
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>History</Text>
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
            color={colors.primary}
            style={{marginRight: 10}}></FontAwesomeIcon>
          <Text style={{fontSize: 18, color: colors.primary}}>
            Help and contact info
          </Text>
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
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <Text style={[styles.accordTitle, {color: colors.primary}]}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function SideMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Front page"
      screenOptions={{
        drawerPosition: 'right',
        header: props => <TopNavigation {...props} />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Front page" component={FrontPage}></Drawer.Screen>
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
      <Drawer.Screen
        name="Subject articles"
        component={SubjectArticles}></Drawer.Screen>
      <Drawer.Screen
        name="View article"
        component={ViewArticle}></Drawer.Screen>
      <Drawer.Screen
        name="Module overview"
        component={ModulesOverview}></Drawer.Screen>
      <Drawer.Screen name="Module" component={Module}></Drawer.Screen>
      <Drawer.Screen name="Forum" component={Forum}></Drawer.Screen>
      <Drawer.Screen
        name="IndividualPost"
        component={IndividualPost}></Drawer.Screen>
      <Drawer.Screen
        name="Structure"
        component={StructureFrontPage}></Drawer.Screen>
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
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
