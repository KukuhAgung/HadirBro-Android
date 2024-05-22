import React from "react";
import { Alert, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../pages/data/FirebaseConfig";
import {
  useCheck,
  useId,
  useDelete,
  useEdit,
  useData,
  usePrevData,
} from "../../store";
import { useNavigation } from "@react-navigation/native";

export const Card = ({ itemKey, color, attendance, date, id }) => {
  const navigation = useNavigation();
  const { setIsCheck } = useCheck();
  const { setIsEdit } = useEdit();
  const { setId } = useId();
  const { setPrevData } = usePrevData();
  const { isDelete, setIsDelete } = useDelete();
  const db = FIRESTORE_DB;

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this data?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const studentDocRef = doc(db, "student", id);
            const attendanceRef = doc(db, "attendance5", itemKey);
            const studentDoc = await getDoc(studentDocRef);
            const currentData = studentDoc.data()[attendance];
            const newValue = currentData > 0 ? currentData - 1 : 0;

            await updateDoc(studentDocRef, {
              [attendance]: newValue,
            });
            await deleteDoc(attendanceRef);
            setIsDelete(!isDelete);

            Alert.alert("Success", "Data has been successfully deleted!");
            setIsEdit(false);
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const handleEdit = async () => {
    try {
      const attendanceRef = doc(db, "attendance5", itemKey);
      const attendanceDoc = await getDoc(attendanceRef);
      if (attendanceDoc.exists()) {
        setIsCheck(false);
        setId(itemKey);
        setPrevData(attendance);
        setIsEdit(true);
      }
      navigation.navigate("Absen");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      className="flex flex-row gap-x-5 items-center px-2 mb-3"
      key={itemKey}
    >
      <FontAwesome name="circle" color={color} size={45} />
      <View>
        <Text className="text-sm font-medium">{attendance}</Text>
        <Text className="text-xs">{date}</Text>
      </View>
      <View className="absolute flex flex-row gap-x-5 right-3">
        <FontAwesome
          name="pencil"
          color={"gray"}
          size={23}
          onPress={handleEdit}
        />
        <FontAwesome
          name="trash"
          color={"gray"}
          size={23}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};
