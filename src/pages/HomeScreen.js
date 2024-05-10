import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-500">
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
