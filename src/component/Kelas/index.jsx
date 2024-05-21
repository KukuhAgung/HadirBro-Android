import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

export const Kelas = ({ key, handleKelas, count, student }) => {
  return (
    <TouchableOpacity
      key={key}
      className="flex flex-row gap-x-5 items-center px-2"
      onPress={handleKelas}
    >
      <Image
        source={require("../../pages/image/logo.png")}
        className="w-[60px] h-[60px] rounded-full bg-gray-600"
      />
      <View className="gap-y-2">
        <Text className="text-sm font-medium">{count}</Text>
        <Text className="text-xs">Jumlah Siswa: {student}</Text>
      </View>
    </TouchableOpacity>
  );
};
