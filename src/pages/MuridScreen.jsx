import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MuridScreen() {
  const navigation = useNavigation();

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
          <Text className="text-[16px] text-white">
            Abidah Ardelia Kendra Wibowo
          </Text>
          <Text className="text-xs text-white mt-2">NIS : 541221003</Text>
        </View>
      </View>
      <Text className="px-2 py-4 bg-primary text-white ">Data Kehadiran</Text>

      <View className="flex bg-blue-50 w-fit h-[110px] p-5 my-7 mx-2 border border-primaryvariant rounded-md">
        <Text className="text-[14px] text-left mb-5">Total Kehadiran</Text>
        <View className="flex flex-row gap-x-4">
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#3FD945"} size={16} />
            <Text className="text-xs text-left mx-2">Hadir: 3</Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FCBE45"} size={16} />
            <Text className="text-xs text-left mx-2">Izin: 1</Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FC5050"} size={16} />
            <Text className="text-xs text-left mx-2">
              Alpha/Tanpa Keterangan: 1
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        scrollsToTop={true}
        className="flex-1 gap-y-6 z-1 w-[98%] mx-auto"
      >
        <View className="flex flex-row gap-x-5 items-center px-2">
          <FontAwesome name="circle" color={"#3FD945"} size={45} />
          <View className="">
            <Text className="text-sm font-medium">Hadir</Text>
            <Text className="text-xs">yy/mm/dd</Text>
          </View>
          <View className="absolute flex flex-row gap-x-5 right-3">
            <FontAwesome name="pencil" color={"gray"} size={20} />
            <FontAwesome name="trash" color={"gray"} size={20} />
          </View>
        </View>
        <View className="flex flex-row gap-x-5 items-center px-2">
          <FontAwesome name="circle" color={"#FCBE45"} size={45} />
          <View className="">
            <Text className="text-sm font-medium">Izin</Text>
            <Text className="text-xs">yy/mm/dd</Text>
          </View>
          <View className="absolute flex flex-row gap-x-5 right-3">
            <FontAwesome name="pencil" color={"gray"} size={20} />
            <FontAwesome name="trash" color={"gray"} size={20} />
          </View>
        </View>
        <View className="flex flex-row gap-x-5 items-center px-2">
          <FontAwesome name="circle" color={"#FC5050"} size={45} />
          <View className="">
            <Text className="text-sm font-medium">Alpha</Text>
            <Text className="text-xs">yy/mm/dd</Text>
          </View>
          <View className="absolute flex flex-row gap-x-5 right-3">
            <FontAwesome name="pencil" color={"gray"} size={20} />
            <FontAwesome name="trash" color={"gray"} size={20} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
