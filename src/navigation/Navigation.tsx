// Navigation.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// import DrawerNavigator from "./DrawerNavigator";
import RegisterScreen from "../screens/Register";
import EditProfileScreen from "../screens/EditProfile";
import SplashScreenComponent from "../screens/Splash";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import BottomTabs from "./TabNavigator";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function Navigation() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      setAppIsReady(true);
    };

    prepare();
  }, []);

  const onNavigationReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" component={SplashScreenComponent} />
        <Stack.Screen name="registration" component={RegisterScreen} />
        <Stack.Screen name="home" component={BottomTabs} />
        <Stack.Screen name="editProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
