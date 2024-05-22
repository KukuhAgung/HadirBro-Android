import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./data/FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Kelas } from "../component/Kelas";

export default function HomeScreen() {
  const [kelas, setKelas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [teacher, setTeacher] = React.useState({});
  const navigation = useNavigation();
  const user = FIREBASE_AUTH.currentUser;
  const db = FIRESTORE_DB;

  const fetchClasses = async () => {
    try {
      const userRef = doc(db, "teacher", user.email);
      const classRef = collection(db, "class");
      const userQuery = await getDoc(userRef);
      const querySnapshot = await getDocs(classRef);
      const teachers = userQuery.data();
      const classes = [];
      querySnapshot.forEach((doc) => {
        classes.push(doc.data());
      });
      setTeacher(teachers);
      setKelas(classes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleLogOut = () => {
    Alert.alert("Peringatan", "Apakah anda yakin ingin log out?", [
      {
        text: "Batal",
      },
      {
        text: "LogOut",
        onPress: () => {
          FIREBASE_AUTH.signOut();
          navigation.navigate("Login");
          Alert.alert("Sukses", "Log Out Berhasil!");
        },
      },
    ]);
  };

  const handleKelas = () => {
    navigation.navigate("Kelas");
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchClasses();
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <View className="fixed flex flex-row bg-primary px-2 py-10 gap-x-2 items-center z-10">
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Image
            source={{ uri: teacher.image }}
            className="w-[60px] h-[60px] rounded-full"
          />
        )}
        <View className="flex flex-col gap-y-2">
          <Text className="text-white text-sm">
            {teacher.name}, {teacher.degree}
          </Text>
          <View>
            <Text className="text-white text-xs">
              Kode guru : {teacher.code}
            </Text>
            <Text className="text-white text-xs">
              Mata pelajaran : {teacher.lesson}
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
      <ScrollView scrollsToTop={true} className="flex-1 gap-y-4 z-1">
        <Text className="px-2 py-4 bg-primaryvariant text-white ">
          Daftar Kelas
        </Text>
        {loading ? (
          <ActivityIndicator size="extralarge" color="#0000ff" />
        ) : (
          <View className="flex gap-y-8">
            {kelas.map((item) => (
              <Kelas
                key={item.count}
                handleKelas={handleKelas}
                count={item.count}
                student={item.student}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
