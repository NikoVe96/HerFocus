import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
//import Animated from 'react-native-reanimated';


export const Planning = ({ navigation }) => {

    return (
        <Animated.ScrollView style={{ backgroundColor: 'lightyellow', flex: 1 }}>
            <SafeAreaView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' }}>Plan and structure your everyday life more efficiently</Text>
                    <Animated.Image
                        source={require('../../../../Assets/images/planning_learning_module.png')}
                        style={{ width: 250, height: 250, marginBottom: 10 }}
                        sharedTransitionTag="structure"></Animated.Image>
                    <View style={{ marginHorizontal: 20, borderWidth: 1, padding: 5, marginBottom: 10 }}>
                        <Text>
                            In this module you will learn about...
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, backgroundColor: 'black', width: 300, marginVertical: 5 }}></View>
                </View>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate('Planning 1')}>
                    <View
                        style={styles.buttonFirst}>
                        <Image
                            source={require('../../../../Assets/images/idea.png')}
                            style={styles.image}></Image>
                        <Text style={styles.text}>1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 140 }}>
                    <View
                        style={styles.button}>
                        <Image
                            source={require('../../../../Assets/images/write.png')}
                            style={styles.image}></Image>
                        <Text style={styles.text}>2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 260 }}>
                    <View
                        style={styles.button}>
                        <Image
                            source={require('../../../../Assets/images/notebook.png')}
                            style={styles.image}></Image>
                        <Text style={styles.text}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 140 }}>
                    <View
                        style={styles.button}>
                        <Image
                            source={require('../../../../Assets/images/calendar.png')}
                            style={styles.image}></Image>
                        <Text style={styles.text}>4</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 20 }}>
                    <View
                        style={styles.buttonLast}>
                        <Image
                            source={require('../../../../Assets/images/success.png')}
                            style={styles.image}></Image>
                        <Text style={styles.text}>5</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: -10,
        borderWidth: 3,
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderColor: 'black',
        elevation: 15,
        shadowColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFirst: {
        marginVertical: 0,
        borderWidth: 3,
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderColor: 'black',
        elevation: 15,
        shadowColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLast: {
        marginTop: -10,
        marginBottom: 20,
        borderWidth: 3,
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderColor: 'black',
        elevation: 15,
        shadowColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Planning;