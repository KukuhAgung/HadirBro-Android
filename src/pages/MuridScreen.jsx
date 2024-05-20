import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "./data/FirebaseConfig";

export default function MuridScreen() {
  const [data, setData] = React.useState({});
  const route = useRoute();
  const { student } = route.params;
  const navigation = useNavigation();

  const fetchAttendance = async () => {
    try {
      const studentQuery = query(
        collection(FIRESTORE_DB, "student"),
        where("name", "==", student.name)
      );
      const querySnapshot = await getDocs(studentQuery);
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentData = { ...studentDoc.data(), id: studentDoc.id };
        setData(studentData);
      } else {
        Alert.alert("Error", "Data siswa tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      Alert.alert("Error", "Failed to retrieve student ID.");
    }
  };

  React.useEffect(() => {
    fetchAttendance();
  }, []);

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
          <Text className="text-[16px] text-white">{student.name}</Text>
          <Text className="text-xs text-white mt-2">NIS : {student.nis}</Text>
        </View>
      </View>
      <Text className="px-2 py-4 bg-primary text-white">Data Kehadiran</Text>

      <View className="flex bg-blue-50 w-fit h-[110px] p-5 my-7 mx-2 border border-primaryvariant rounded-md">
        <Text className="text-[14px] text-left mb-5">Total Kehadiran</Text>
        <View className="flex flex-row gap-x-4">
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#3FD945"} size={16} />
            <Text className="text-xs text-left mx-2">
              Hadir: {data.hadir || 0}
            </Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FCBE45"} size={16} />
            <Text className="text-xs text-left mx-2">
              Izin: {data.izin || 0}
            </Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FC5050"} size={16} />
            <Text className="text-xs text-left mx-2">
              Alpha/Tanpa Keterangan: {data.alpha || 0}
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
