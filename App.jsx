import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/pages/SplashScreen";
import HomeScreen from "./src/pages/HomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import KelasScreen from "./src/pages/KelasScreen";
import AbsenScreen from "./src/pages/AbsenScreen";
import MuridScreen from "./src/pages/MuridScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Kelas" component={KelasScreen} />
        <Stack.Screen name="Absen" component={AbsenScreen} />
        <Stack.Screen name="Student" component={MuridScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
