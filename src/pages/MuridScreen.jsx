import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "./data/FirebaseConfig";
import { Card } from "../component/Card";
import { useDelete, useStudent } from "../store";

export default function MuridScreen() {
  const [data, setData] = React.useState({});
  const [attendance, setAttendance] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { isDelete } = useDelete();
  const { student } = useStudent();
  const db = FIRESTORE_DB;
  const navigation = useNavigation();

  const fetchAttendance = async () => {
    try {
      const studentQuery = query(
        collection(db, "student"),
        where("name", "==", student.name)
      );
      const attendanceQuery = query(
        collection(db, "attendance5"),
        where("name", "==", student.name)
      );
      const studentSnapshot = await getDocs(studentQuery);
      const attendanceSnapshot = await getDocs(attendanceQuery);
      if (!studentSnapshot.empty && !attendanceSnapshot.empty) {
        const attendances = [];
        attendanceSnapshot.forEach((doc) => {
          attendances.push({ ...doc.data(), id: doc.id });
        });
        attendances.sort(
          (a, b) => b.thisday[1].toDate() - a.thisday[1].toDate()
        );
        setAttendance(attendances);
        const studentDoc = studentSnapshot.docs[0];
        const studentData = { ...studentDoc.data(), id: studentDoc.id };
        setData(studentData);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal untuk mengambil data siswa.");
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hadir":
        return "#3FD945";
      case "Izin":
        return "#FCBE45";
      case "Alpha":
        return "#FC5050";
      default:
        return "#000000";
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(async() => {
      await fetchAttendance();
      setIsLoading(false);
    }, 1000);
  }, [isDelete]);

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
              Hadir: {data.Hadir || 0}
            </Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FCBE45"} size={16} />
            <Text className="text-xs text-left mx-2">
              Izin: {data.Izin || 0}
            </Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome name="circle" color={"#FC5050"} size={16} />
            <Text className="text-xs text-left mx-2">
              Alpha/Tanpa Keterangan: {data.Alpha || 0}
            </Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView scrollsToTop={true} className="flex-1 z-1 w-[98%] mx-auto">
          {attendance.map((item) => (
            <Card
              id={student.id}
              itemKey={item.id}
              key={item.id}
              color={getStatusColor(item.thisday[0])}
              attendance={item.thisday[0]}
              date={formatDate(item.thisday[1])}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
