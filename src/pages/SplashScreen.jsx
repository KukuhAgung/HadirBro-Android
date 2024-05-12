import React from "react";
import { Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Image
        className="w-[300px] h-[110px] "
        source={require("./image/logo.png")}
      />
      <ActivityIndicator size={"large"} color={"midnightblue"} style={{ marginTop: 30 }} />
      <Text className="absolute bottom-10 font-medium text-gray-900">
        Powered by <Text className="font-bold">Super Dady</Text>
      </Text>
    </SafeAreaView>
  );
}
