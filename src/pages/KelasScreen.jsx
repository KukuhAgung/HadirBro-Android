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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIRESTORE_DB } from "./data/FirebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useStudent } from "../store";

export default function KelasScreen() {
  const { setStudent } = useStudent();
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();
  const db = FIRESTORE_DB;

  const handleSiswa = async (studentName) => {
    try {
      const studentQuery = query(
        collection(db, "student"),
        where("name", "==", studentName)
      );
      const querySnapshot = await getDocs(studentQuery);
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentData = { ...studentDoc.data(), id: studentDoc.id };
        setStudent(studentData);
        navigation.navigate("Absen");
      } else {
        Alert.alert("Error", "Data siswa tidak ditemukan.");
      }
    } catch (error) {
      Alert.alert("Error", "Gagal untuk menemukan data siswa.");
    }
  };

  const fetchStudents = async () => {
    try {
      const studentsQuery = query(
        collection(db, "student"),
        orderBy("name", "asc")
      );
      const querySnapshot = await getDocs(studentsQuery);
      const students = [];
      querySnapshot.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id });
      });
      setStudents(students);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 2000);
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
          <Text className="text-lg text-white">XI PPLG 5</Text>
          <Text className="text-xs text-white">
            Wali Kelas : Nurul Istiqomah, S.Pd.
          </Text>
        </View>
      </View>
      <ScrollView scrollsToTop={true} className="flex-1 gap-y-1 z-1">
        <Text className="px-2 py-4 bg-primary text-white">Daftar Siswa</Text>
        {loading ? (
          <ActivityIndicator size="extralarge" color="#0000ff" />
        ) : (
          <View className="flex gap-y-3">
            {students.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex flex-row gap-x-5 items-center px-2"
                onPress={() => handleSiswa(item.name)}
              >
                <Image
                  source={require("./image/profile.png")}
                  className="w-[60px] h-[60px] rounded-full bg-gray-600"
                />
                <View className="gap-y-2">
                  <Text className="text-sm font-medium">{item.name}</Text>
                  <Text className="text-xs">NIS : {item.nis}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
