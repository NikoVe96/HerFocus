import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Feed from "./Feed";
import WritePost from "./WritePost";
import Parse from "parse/react-native";

export const Forum = () => {
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const { forumTitle, forumDescription } = route.params;

  useEffect(() => {
    const fetchPosts = async () => {
      const query = new Parse.Query("Post");
      query.descending("createdAt");
      try {
        let result = await query.find();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{forumTitle}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{forumDescription}</Text>
          </View>
        </View>
        <WritePost onNewPost={handleNewPost}></WritePost>
        <Feed posts={posts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 25,
  },
  descContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: 340,
    marginLeft: 17,
    alignSelf: "flex-start",
    backgroundColor: "#AFB1B6",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: "black",
    padding: 10,
  },
});

export default Forum;
