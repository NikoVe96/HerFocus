import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Questions = ({ index, question }) => {
    return (
        <View style={{}}>
            <View
                style={{
                    flexDirection: "row",
                }}>
                <Text
                    style={{ color: "#333", fontSize: 15, opacity: 0.6, marginRight: 2 }}>
                    {index + 1}
                </Text>
                <Text style={{ color: "#333", fontSize: 13, opacity: 0.6 }}>
                    / {Questions.length}
                </Text>
            </View>
            <Text
                style={{
                    color: "#333",
                    fontSize: 18,
                    textAlign: "center",
                }}>
                {question}
            </Text>
        </View>
    );
};


export default Questions;