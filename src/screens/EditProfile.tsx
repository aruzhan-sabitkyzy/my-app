import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Profile, updateProfile } from "../redux/tokenSlice";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import Picker from "../ui/Picker";

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const profile = useSelector((state: RootState) => state.auth.profile);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      password: profile?.password || "",
      age: profile?.age || "",
      gender: profile?.gender || "",
    },
  });

  const onSubmit = (data: Profile) => {
    console.log(value);
    dispatch(updateProfile(data));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              placeholder="Enter name"
              style={styles.input}
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              autoCorrect={false}
              spellCheck={false}
            />
          )}
        />

        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is not valid",
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              placeholder="Enter email"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="done"
              autoCorrect={false}
              spellCheck={false}
              textContentType="emailAddress"
            />
          )}
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="age"
          rules={{
            pattern: {
              value: /^[0-9]+$/,
              message: "Age must be a number",
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              placeholder="Enter age"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.age && (
          <Text style={styles.errorText}>{errors.age.message}</Text>
        )}

        <Text style={styles.label}>Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <Picker
              items={genders}
              selectedValue={value}
              onValueChange={onChange}
              placeholder="Select Gender"
            />
          )}
        />
        {errors.gender && (
          <Text style={styles.errorText}>{errors.gender.message}</Text>
        )}

        <TouchableOpacity
          style={styles.customButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.customButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
  },
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
