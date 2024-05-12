import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AbsenScreen() {
  const navigation = useNavigation();
  const [isCheck, setIsCheck] = React.useState(false);
  const [hadir, setHadir] = React.useState(false);
  const [izin, setIzin] = React.useState(false);
  const [alpha, setAlpha] = React.useState(false);

  const getKeterangan = (id) => {
    setHadir(id === "hadir");
    setIzin(id === "izin");
    setAlpha(id === "alpha");
  };

  const handleAbsen = () => {
    setIsCheck(true);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className=" bg-primaryvariant pt-10">
        <TouchableOpacity
          className="relative left-5 mb-2"
          onPress={() => navigation.goBack()}
        >
          <Image source={require("./image/Arrow 1.png")} />
        </TouchableOpacity>
        <View className="flex flex-col mx-5 my-5 w-full">
          <View>
            <Text className="text-[16px] text-white">
              Abidah Ardelia Kendra Wibowo
            </Text>
            <Text className="text-xs text-white mt-1">NIS : 541221003</Text>
          </View>
          <TouchableOpacity className="px-3 py-2 bg-secondary rounded-md mt-5 border border-secondary cursor-pointer w-[135px]">
            <Text className="text-white text-xs text-left border-bordersecondary">
              Cek Data Kehadiran
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="px-2 py-4 bg-primary text-white ">Data Kehadiran</Text>
      </View>
      <View className="flex-1 bg-blue-50 items-center ">
        <Text className="text-lg text-center font-medium my-10">
          Apakah hari ini ananda mengikuti pembelajaran?
        </Text>
        <View className="flex flex-row gap-x-3">
          <TouchableOpacity
            id="hadir"
            disabled={isCheck}
            className={
              hadir
                ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check1 bg-check1`
                : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check1 `
            }
            onPress={() => getKeterangan("hadir")}
          >
            <Text
              className={
                hadir
                  ? `text-[13px] text-center text-white`
                  : `text-[13px] text-center`
              }
            >
              Hadir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            id="izin"
            disabled={isCheck}
            className={
              izin
                ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check2 bg-check2`
                : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check2`
            }
            onPress={() => getKeterangan("izin")}
          >
            <Text
              className={
                izin
                  ? `text-[13px] text-center text-white`
                  : `text-[13px] text-center`
              }
            >
              Izin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            id="alpha"
            disabled={isCheck}
            className={
              alpha
                ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check3 bg-check3`
                : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check3`
            }
            onPress={() => getKeterangan("alpha")}
          >
            <Text
              className={
                alpha
                  ? `text-[13px] text-center text-white`
                  : `text-[13px] text-center`
              }
            >
              Alpha/Tanpa Keterangan
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="px-10 py-3 bg-primary rounded-md mt-8 border border-primaryvariant cursor-pointer"
          onPress={handleAbsen}
        >
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
