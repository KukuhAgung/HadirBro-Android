import React, { Component } from "react";
import {
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { siswa } from "./data/data";

export default function KelasScreen() {
  const navigation = useNavigation();
  const handleSiswa = () => {
    navigation.navigate("Absen");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="fixed bg-primaryvariant py-10 z-10">
        <TouchableOpacity
          className="relative left-5"
          onPress={() => navigation.goBack()}
        >
          <Image source={require("./image/Arrow 1.png")} />
        </TouchableOpacity>
        <View className="flex items-center">
          <Text className="text-lg text-white">XI PPLG 5</Text>
          <Text className="text-xs text-white">
            Wali Kelas : Nurul Istiqomah, S.Pd.
          </Text>
        </View>
      </View>
      <ScrollView scrollsToTop={true} className="flex-1 gap-y-6 z-1">
        <Text className="px-2 py-4 bg-primary text-white ">Daftar Siswa</Text>
        {siswa.map((item) => (
          <TouchableOpacity
            key={item.nama}
            className="flex flex-row gap-x-5 items-center px-2"
            onPress={handleSiswa}
          >
            <Image
              source={require("./image/profile.png")}
              className="w-[60px] h-[60px] rounded-full bg-gray-600"
            />
            <View className="gap-y-2">
              <Text className="text-sm font-medium">{item.nama}</Text>
              <Text className="text-xs">NIS : {item.nis}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
