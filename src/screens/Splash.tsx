// SplashScreen.tsx
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.hideAsync();
        // Add a small delay to ensure Redux state is fully rehydrated
        setTimeout(() => {
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: "home" as never }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "registration" as never }],
            });
          }
        }, 2000);
      } catch (error) {
        console.warn("Error in splash screen:", error);
      }
    };

    prepare();
  }, [navigation, token]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Searching for the updates...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    color: "#333",
  },
});
