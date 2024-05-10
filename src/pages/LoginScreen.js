import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Login Screen</Text>
      <TouchableOpacity
        className="px-7 py-2 bg-blue-600 rounded-md mt-5 cursor-pointer"
        onPress={() => navigation.navigate("Home")}
      >
        <Text className="text-white">Masuk</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
