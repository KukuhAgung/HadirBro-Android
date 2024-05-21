import React from "react";
import { Alert, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../pages/data/FirebaseConfig";
import { useCheck, useData } from "../../store";
import { useNavigation } from "@react-navigation/native";

export const Card = ({ key, color, attendance, date, id }) => {
  const navigation = useNavigation();
  const { setIsCheck } = useCheck();
  const { data } = useData();
  const db = FIRESTORE_DB;
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this attendance?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const studentDocRef = doc(db, "student", id);
            const attendanceRef = doc(db, "attendance5", id);
            const studentDoc = await getDoc(studentDocRef);
            const currentData = studentDoc.data()[data];
            const newValue = currentData > 0 ? currentData - 1 : 0;
            await updateDoc(studentDocRef, {
              [data]: newValue,
            });
            await deleteDoc(attendanceRef);
            if (deleteDoc) setIsCheck(false);
            Alert.alert("Success", "Attendance deleted successfully");
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };
  const handleEdit = async() => {
    try {
      const studentRef = doc(db, "student", id);
      const attendanceRef = doc(db, "attendance5", date);
      const studentDoc = await getDoc(studentRef);
      const currentData = studentDoc.data()[data];
      const newValue = currentData > 0 ? currentData - 1 : 0;
      await updateDoc(studentRef, {
        [data]: newValue,
      });
      const attendanceDoc = await getDoc(attendanceRef);
      if (attendanceDoc) setIsCheck(false);
      navigation.navigate("Absen");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View className="flex flex-row gap-x-5 items-center px-2" key={key}>
      <FontAwesome name="circle" color={color} size={45} />
      <View className="">
        <Text className="text-sm font-medium">{attendance}</Text>
        <Text className="text-xs">{date}</Text>
      </View>
      <View className="absolute flex flex-row gap-x-5 right-3">
        <FontAwesome
          name="pencil"
          color={"gray"}
          size={20}
          onPress={handleEdit}
        />
        <FontAwesome
          name="trash"
          color={"gray"}
          size={20}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};
