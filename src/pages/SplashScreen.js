import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Image
        className="w-[300px] h-[100px]"
        source={require("./image/logo.png")}
      />
      <Text className="absolute bottom-10 font-medium text-gray-900">
        Powered by <Text className="font-bold">Super Dady</Text>
      </Text>
    </SafeAreaView>
  );
}
