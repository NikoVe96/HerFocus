import { SafeAreaView, Text, View, Image, Dimensions, Animated, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import LearningProgressHeader from "../../../../Components/LearningProgressHeader";
import { useNavigation } from "@react-navigation/native";

export const Module1 = () => {

    const width = Dimensions.get('window').width;
    const [progress, setProgress] = useState(new Animated.Value(1));
    const moduleLength = 5;
    const navigation = useNavigation();

    const handleSlide = (index) => {
        Animated.parallel([
            Animated.timing(progress, {
                toValue: index + 1,
                duration: 2000,
                useNativeDriver: false,
            }),
        ]).start();
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LearningProgressHeader progress={progress} moduleLength={moduleLength} />
            <View style={{ flex: 8, backgroundColor: 'lightyellow' }}>
                <Swiper
                    loop={false}
                    showsPagination={false}
                    dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 70, height: 8, borderRadius: 4, marginHorizontal: 4 }}
                    activeDotStyle={{ backgroundColor: '#000', width: 70, height: 8, borderRadius: 4, marginHorizontal: 4 }}
                    paginationStyle={{ bottom: 10 }}
                    onIndexChanged={(index) => handleSlide(index)}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            source={require('../../../../Assets/images/frustrated_woman.png')}
                            style={{ width: width, height: 250 }}
                            sharedTransitionTag="structure"></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.takeawayHeader}>Do you recognize yourself in this?</Text>
                            <Text>When you have ADHD it is very common that...</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../Assets/images/quiz.png')}
                            style={{ width: width, height: 250 }}
                            sharedTransitionTag="structure"></Image>
                        <Text style={styles.takeawayHeader}>Let's take a small quiz</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text>Option 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>Option 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>Option 3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>Option 4</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../Assets/images/notebook_planning.png')}
                            style={{ width: width, height: 250 }}
                            sharedTransitionTag="structure"></Image>
                        <Text style={styles.takeawayHeader}>Here are 3 key takeaways from this module</Text>
                        <View style={styles.keyTakeaways}>
                            <Text style={styles.takeawayHeader}>Takeaway 1</Text>
                            <Text>Description</Text>
                        </View>
                        <View style={styles.keyTakeaways}>
                            <Text style={styles.takeawayHeader}>Takeaway 2</Text>
                            <Text>Description</Text>
                        </View>
                        <View style={styles.keyTakeaways}>
                            <Text style={styles.takeawayHeader}>Takeaway 2</Text>
                            <Text>Description</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../Assets/images/planning_exercise.png')}
                            style={{ width: width, height: 250 }}
                            sharedTransitionTag="structure"></Image>
                        <Text style={styles.takeawayHeader}>Write down your weekly tasks</Text>
                        <TextInput style={styles.textInput}></TextInput>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../Assets/images/fireworks.png')}
                            style={{ width: width, height: 250 }}
                            sharedTransitionTag="structure"></Image>
                        <Text style={styles.takeawayHeader}>Congratulations! </Text>
                        <Text>You just finished your first module!</Text>
                        <TouchableOpacity style={styles.button} onPress={navigation.navigate('Planning module')}>
                            <Text>Complete the module</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 200,
    },
    keyTakeaways: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: 350
    },
    takeawayHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    textContainer: {
        margin: 10,
    },
    textInput: {
        backgroundColor: 'white',
        width: 250,
        height: 200,
        marginVertical: 10

    }
})

export default Module1;