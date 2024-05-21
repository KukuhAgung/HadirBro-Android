import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
  collection,
} from "firebase/firestore";
import { FIRESTORE_DB } from "./data/FirebaseConfig";
import { useCheck, useData, useStudent } from "../store";

export default function AbsenScreen() {
  const navigation = useNavigation();
  const { isCheck, setIsCheck } = useCheck();
  const { data, setData } = useData();
  const [hadir, setHadir] = React.useState(false);
  const [izin, setIzin] = React.useState(false);
  const [alpha, setAlpha] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = FIRESTORE_DB;
  const { student } = useStudent();
  const date = Timestamp.now().toDate();
  const docData = { name: student.name, thisday: [data, date] };

  const checkTodayAttendance = async () => {
    try {
      const attendanceQuery = query(
        collection(db, "attendance5"),
        where("name", "==", student.name)
      );
      const attendanceSnapshot = await getDocs(attendanceQuery);
      if (!attendanceSnapshot.empty) {
        attendanceSnapshot.forEach((doc) => {
          const attendance = doc.data();
          const attendanceDate = attendance.thisday[1].toDate();
          if (
            attendanceDate.getDate() === date.getDate() &&
            attendanceDate.getMonth() === date.getMonth() &&
            attendanceDate.getFullYear() === date.getFullYear()
          ) {
            setData(attendance.thisday[0]);
            setIsCheck(true);
            if (attendance.thisday[0] === "Hadir") setHadir(true);
            if (attendance.thisday[0] === "Izin") setIzin(true);
            if (attendance.thisday[0] === "Alpha") setAlpha(true);
          } else {
            setIsCheck(false);
          }
        });
      } else {
        setIsCheck(false);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getKeterangan = (id) => {
    setHadir(id === "Hadir");
    setIzin(id === "Izin");
    setAlpha(id === "Alpha");
    setData(id);
  };

  const handleAbsen = async () => {
    try {
      if (!student.id) {
        Alert.alert("Id siswa tidak ditemukan.");
        return;
      }

      const studentDocRef = doc(db, "student", student.id);
      const studentDoc = await getDoc(studentDocRef);
      const currentData = studentDoc.data()[data];
      const newValue = (currentData || 0) + 1;

      await updateDoc(studentDocRef, {
        [data]: newValue,
      });
      await setDoc(doc(db, "attendance5", student.id), docData);
      setIsCheck(true);
      Alert.alert("Sukses", "Ananda hadir dengan keterangan " + data);
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat input data");
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      checkTodayAttendance();
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primaryvariant pt-10">
        <TouchableOpacity
          className="left-5 mb-2"
          onPress={() => navigation.goBack()}
        >
          <Image source={require("./image/Arrow 1.png")} />
        </TouchableOpacity>
        <View className="flex flex-col mx-5 my-5 w-full">
          <View>
            <Text className="text-[16px] text-white">{student.name}</Text>
            <Text className="text-xs text-white mt-1">NIS : {student.nis}</Text>
          </View>
          <TouchableOpacity
            className="px-3 py-2 bg-secondary rounded-md mt-5 border border-secondary cursor-pointer w-[135px]"
            onPress={() => navigation.navigate("Student")}
          >
            <Text className="text-white text-xs text-left border-bordersecondary">
              Cek Data Kehadiran
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="px-2 py-4 bg-primary text-white">Data Kehadiran</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="extralarge"
          color="#0000ff"
          className="absolute bottom-[30%] right-[45%]"
        />
      ) : (
        <View className="flex-1 bg-blue-50 items-center ">
          <Text className="text-lg text-center font-medium my-10">
            Apakah hari ini ananda mengikuti pembelajaran?
          </Text>
          <View className="flex flex-row gap-x-3">
            <TouchableOpacity
              id="Hadir"
              disabled={isCheck}
              className={
                hadir
                  ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check1 bg-check1`
                  : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check1`
              }
              onPress={() => getKeterangan("Hadir")}
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
              id="Izin"
              disabled={isCheck}
              className={
                izin
                  ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check2 bg-check2`
                  : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check2`
              }
              onPress={() => getKeterangan("Izin")}
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
              id="Alpha"
              disabled={isCheck}
              className={
                alpha
                  ? `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check3 bg-check3`
                  : `w-[100px] h-[100px] border flex items-center justify-center rounded-sm border-check3`
              }
              onPress={() => getKeterangan("Alpha")}
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
            className={
              isCheck
                ? "px-10 py-3 bg-gray-600 rounded-md mt-8 border border-gray-700 cursor-pointer"
                : "px-10 py-3 bg-primary rounded-md mt-8 border border-primaryvariant cursor-pointer"
            }
            disabled={isCheck}
            onPress={handleAbsen}
          >
            <Text className={isCheck ? "text-gray-400" : "text-white"}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
