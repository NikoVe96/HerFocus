import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faListCheck, faGraduationCap, faBrain, faUser, faComments, faGear, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import AccordionItem from "../Components/AccordionItem";
import TopNavigation from "./TopNav";
import AddRoutine from "../Pages/Structure components/AddRoutine";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
    return (
        <DrawerContentScrollView>
            <AccordionItem title="Structure" icon={faListCheck}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Add a new routine </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Add a new task </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Calendar overview </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Daily overview </Text>
                </TouchableOpacity>
            </AccordionItem>
            <AccordionItem title="Forums" icon={faComments}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Pick a subject </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Favorite posts </Text>
                </TouchableOpacity>
            </AccordionItem>
            <AccordionItem title="Learning modules" icon={faGraduationCap}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Module 1</Text>
                        <Text style={{ fontSize: 18 }}>What is ADHD </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Module 2</Text>
                        <Text style={{ fontSize: 18 }}>how to handle getting overwhelmed </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30 }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Module 3</Text>
                        <Text style={{ fontSize: 18 }}>Structuring your daily life </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Module 4</Text>
                        <Text style={{ fontSize: 18 }}>Long term goals </Text>
                    </View>
                </TouchableOpacity>
            </AccordionItem>
            <AccordionItem title="Knowledge base" icon={faBrain}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Pick a topic </Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Favorite posts </Text>
                </TouchableOpacity>
            </AccordionItem>
            <View style={styles.accordContainer}>
                <TouchableOpacity style={styles.accordHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faUser} size={20} style={{ marginRight: 10 }} />
                        <Text style={styles.accordTitle}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <AccordionItem title="Settings" icon={faGear}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Notifications</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Color theme</Text>
                </TouchableOpacity>
            </AccordionItem>
            <AccordionItem title="About us" icon={faUsers}>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>History</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderColor: 'grey' }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCircle} size={13} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <Text style={{ fontSize: 18 }}>Help and contact info</Text>
                </TouchableOpacity>
            </AccordionItem>
            <View style={styles.accordContainer}>
                <TouchableOpacity style={styles.accordHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faRightFromBracket} size={20} style={{ marginRight: 10 }} />
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
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="About us" component={AddRoutine}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accordContainer: {
        paddingBottom: 4
    },
    accordHeader: {
        padding: 12,
        backgroundColor: 'lightblue',
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

export default SideMenu;