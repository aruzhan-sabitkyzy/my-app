import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken } from "../redux/tokenSlice";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.auth.profile);

  const logout = () => {
    navigation.navigate("registration" as never);
    dispatch(removeToken());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile.name || "N/A"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile.email || "N/A"}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{profile.age || "N/A"}</Text>

        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{profile.gender || "N/A"}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("editProfile" as never)}
          color="#4CAF50"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
