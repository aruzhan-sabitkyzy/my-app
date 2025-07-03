import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { createProfile, Profile, setToken } from "../redux/tokenSlice";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

let KeyboardAccessoryNavigation: any = null;
let hasKeyboardAccessory = false;
try {
  KeyboardAccessoryNavigation =
    require("react-native-keyboard-accessory").KeyboardAccessoryNavigation;
  hasKeyboardAccessory = true;
} catch (error) {
  console.log("react-native-keyboard-accessory not available, using fallback");
  hasKeyboardAccessory = false;
}

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardScreenY, setKeyboardScreenY] = useState(0);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Profile>();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardScreenY(e.endCoordinates.screenY);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
        setKeyboardScreenY(0);
      }
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  const onSubmit = (data: Profile) => {
    dispatch(setToken("token-123"));
    dispatch(createProfile(data));
    navigation.navigate("home" as never);
  };

  const handleDone = () => {
    Keyboard.dismiss();
  };

  const FallbackKeyboardToolbar = () => {
    if (!isKeyboardVisible || hasKeyboardAccessory) return null;

    const quickTypeBarHeight = Platform.OS === "ios" ? 44 : 0;
    const toolbarHeight = 44;
    const toolbarBottom = keyboardHeight + quickTypeBarHeight;

    return (
      <View
        style={[
          styles.fallbackKeyboardToolbar,
          {
            bottom: toolbarBottom,
            height: toolbarHeight,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.fallbackDoneButton}
          onPress={handleDone}
        >
          <Text style={styles.fallbackDoneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registration</Text>
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
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  placeholder="Enter password"
                  style={styles.input}
                  placeholderTextColor="#999"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  autoCorrect={false}
                  spellCheck={false}
                  textContentType="password"
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
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

            <TouchableOpacity
              style={styles.customButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.customButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {hasKeyboardAccessory &&
          KeyboardAccessoryNavigation &&
          isKeyboardVisible && (
            <KeyboardAccessoryNavigation
              doneButtonTitle="Done"
              tintColor="#007AFF"
              onDone={handleDone}
              doneButtonStyle={styles.accessoryDoneButtonStyle}
              doneButtonTitleStyle={styles.accessoryDoneButtonTitleStyle}
              accessoryStyle={styles.accessoryStyle}
              avoidKeyboard={true}
              androidAdjustResize={true}
              alwaysVisible={false}
              animateOn="all"
              bumperHeight={0}
            />
          )}
      </View>
      <FallbackKeyboardToolbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
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
  buttonContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#4CAF50",
  },
  form: {
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
  fallbackKeyboardToolbar: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1000,
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
    }),
  },
  fallbackDoneButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  fallbackDoneButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  floatingToolbar: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  floatingDoneButton: {},
  floatingDoneButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  accessoryStyle: {
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  accessoryDoneButtonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  accessoryDoneButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
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
