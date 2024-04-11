import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import QuizQuestionsData from "../Assets/Quizzes/QuizQuestionsData";
import QuizQuestions from "./QuizQuestions";

const Quiz = ({ navigation, subject, module }) => {
    const Questions = QuizQuestionsData[subject][module];

    const [selectedOptions, setSelectedOptions] = useState(Array(Questions.length).fill(null));
    const [isCorrect, setIsCorrect] = useState(Array(Questions.length).fill(false));
    const [score, setScore] = useState(0);

    useEffect(() => {
        const newScore = selectedOptions.reduce((acc, option, index) => (
            option === Questions[index]["correct_option"] ? acc + 1 : acc
        ), 0);
        setScore(newScore);
    }, [selectedOptions]);

    const validateAnswer = (selectedOption, questionIndex) => {
        if (selectedOptions[questionIndex] === null) {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[questionIndex] = selectedOption;
            setSelectedOptions(newSelectedOptions);

            const correct = selectedOption === Questions[questionIndex]["correct_option"];
            const newIsCorrect = [...isCorrect];
            newIsCorrect[questionIndex] = correct;
            setIsCorrect(newIsCorrect);
        }
    };

    return (
        <View style={styles.container}>
            {Questions.map((question, questionIndex) => (
                <View key={questionIndex} style={styles.subContainer}>
                    <QuizQuestions
                        index={questionIndex}
                        question={question.question}
                    />
                    <View>
                        {question.options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                onPress={() => validateAnswer(option, questionIndex)}
                                style={[
                                    styles.optionsText,
                                    {
                                        backgroundColor: selectedOptions[questionIndex] === option
                                            ? isCorrect[questionIndex] ? "#7be25b" : "#f0222b"
                                            : "#fac782",
                                    },
                                ]}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}
            <Text style={styles.scoreText}>You got {score} out of {Questions.length} questions correct</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        marginVertical: 10,
        padding: 5,
        backgroundColor: "white",
        alignItems: "center",
    },
    optionsText: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    optionText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    scoreText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginVertical: 20,
    },
});
export default Quiz;
