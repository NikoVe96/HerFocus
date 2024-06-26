import React, { useState, useEffect } from 'react';
import { View, Animated, Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const LearningProgressHeader = ({ progress, moduleLength, subject, description, image }) => {
    const navigation = useNavigation();

    const progressAnim = progress.interpolate({
        inputRange: [0, moduleLength],
        outputRange: ["0%", "100%"],
    });


    const showExitLearningAlert = async () => {
        Alert.alert(
            'Exit the learning module?',
            'Are you sure you want to exit the the learning module? All progress will be lost.',
            [
                { text: 'Continue learning', onPress: () => { } },
                {
                    text: 'Exit',
                    onPress: () => {
                        navigation.navigate('Module overview', { subject: subject, image: image, description: description })
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                    onPress={showExitLearningAlert}
                    buttonStyle={styles.closeButton}
                >
                    <FontAwesomeIcon icon={faCircleXmark} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        {
                            height: 15,
                            borderRadius: 5,
                            backgroundColor: "#EDA276" + "90",
                        },
                        {
                            width: progressAnim,
                        },
                    ]}
                ></Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    closeButtonContainer: {
        marginHorizontal: 20,
    },
    closeButton: {
        backgroundColor: 'transparent',
    },
    progressBar: {
        flex: 1,
        flexDirection: 'row',
        height: 15,
        backgroundColor: '#FFFCF9',
        elevation: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    progressBarFill: {
        backgroundColor: '#FF6978',
    },
});


export default LearningProgressHeader;