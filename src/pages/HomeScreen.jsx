import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "./data/data";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleLogOut = () => {
    Alert.alert("Success!", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.navigate("Login");
          Alert.alert("Success!", "Log Out Success!");
        },
      },
    ]);
  };
  const handleKelas = () => {
    navigation.navigate("Kelas");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="fixed flex flex-row bg-primary px-2 py-10 gap-x-2 items-center z-10">
        <Image
          source={require("./image/profile.png")}
          className="w-[70px] h-[70px] rounded-full"
        />
        <View className="flex flex-col gap-y-2">
          <Text className="text-white text-sm">Aurel, S.Pd.</Text>
          <View>
            <Text className="text-white text-xs">Kode guru : A07</Text>
            <Text className="text-white text-xs">
              Mata pelajaran : Bahasa Indonesia
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="absolute px-5 py-2 bg-secondary rounded-md border border-secondary cursor-pointer top-12 right-5"
          onPress={handleLogOut}
        >
          <Text className="text-white text-xs">Log Out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView scrollsToTop={true} className="flex-1 gap-y-6 z-1">
        <Text className="px-2 py-4 bg-primaryvariant text-white ">
          Daftar Kelas
        </Text>
        {data.map((item) => (
          <TouchableOpacity
            key={item.kelas}
            className="flex flex-row gap-x-5 items-center px-2"
            onPress={handleKelas}
          >                                                                                               
            <Image
              source={require("./image/logo.png")}
              className="w-[60px] h-[60px] rounded-full bg-gray-600"
            />
            <View className="gap-y-2">
              <Text className="text-sm font-medium">{item.kelas}</Text>
              <Text className="text-xs">Jumlah Siswa: {item.siswa}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
