import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function LoginScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [kodePelajaran, setKodePelajaran] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [kodePelajaranError, setKodePelajaranError] = React.useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (username == "Aurel" && password == "123456" && kodePelajaran == "A07") {
      setNameError(false);
      setPasswordError(false);
      setKodePelajaranError(false);
      return navigation.navigate("Home");
    } else if (username != "Aurel") {
      setNameError(true);
    } else if (kodePelajaran != "A07") {
      setKodePelajaranError(true);
    } else if (password != "123456") {
      setPasswordError(true);
    } else {
      return alert("Login Gagal");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Image
        className="w-[300px] h-[110px] mb-10"
        source={require("./image/logo.png")}
      />

      <KeyboardAvoidingView
        behavior="padding"
        className="w-[90%] items-center flex"
      >
        {nameError ? (
          <>
            <View
              className={`relative flex flex-row gap-x-4 items-center border border-red-600 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
            >
              <FontAwesome name="user" size={24} color="gray" />
              <TextInput
                placeholder="Username"
                placeholderTextColor="red"
                autoFocus={true}
                onChangeText={(text) => setUsername(text)}
                onPressIn={() => setNameError(false)}
                className={`border-b w-[70%] pb-2 border-red-600`}
              ></TextInput>
            </View>
            <Text className="text-red-600 text-xs text-left w-full mt-1 ml-20">
              *Username salah, coba lagi!
            </Text>
          </>
        ) : (
          <View
            className={`flex flex-row gap-x-4 items-center border border-gray-700 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
          >
            <FontAwesome name="user" size={24} color="gray" />
            <TextInput
              placeholder="Username"
              autoFocus={true}
              onChangeText={(text) => setUsername(text)}
              className={`border-b w-[70%] pb-2 border-gray-700`}
            ></TextInput>
          </View>
        )}

        {kodePelajaranError ? (
          <>
            <View
              className={`flex flex-row gap-x-4 items-center border border-red-600 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
            >
              <FontAwesome name="book" size={24} color="gray" />
              <TextInput
                placeholder="Kode Mata Pelajaran"
                placeholderTextColor="red"
                autoFocus={true}
                onChangeText={(text) => setKodePelajaran(text)}
                onPressIn={() => setKodePelajaranError(false)}
                className={`border-b w-[70%] pb-2 border-red-600`}
              ></TextInput>
            </View>
            <Text className="text-red-600 text-xs text-left w-full mt-1 ml-20">
              *Kode Mapel salah, coba lagi!
            </Text>
          </>
        ) : (
          <View
            className={`flex flex-row gap-x-4 items-center border border-gray-700 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
          >
            <FontAwesome name="book" size={24} color="gray" />
            <TextInput
              placeholder="Kode Mata Pelajaran"
              onChangeText={(text) => setKodePelajaran(text)}
              className={`border-b w-[70%] pb-2 border-gray-700`}
            ></TextInput>
          </View>
        )}

        {passwordError ? (
          <>
            <View
              className={`flex flex-row gap-x-4 items-center border border-red-600 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
            >
              <FontAwesome name="key" size={24} color="gray" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="red"
                autoFocus={true}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                onPressIn={() => setPasswordError(false)}
                className={`border-b w-[70%] pb-2 border-red-600`}
              ></TextInput>
            </View>
            <Text className="text-red-600 text-xs text-left w-full mt-1 ml-20">
              *Password salah, coba lagi!
            </Text>
          </>
        ) : (
          <View
            className={`flex flex-row gap-x-4 items-center border border-gray-700 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
          >
            <FontAwesome name="key" size={24} color="gray" />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              className={`border-b w-[70%] pb-2 border-gray-700`}
            ></TextInput>
          </View>
        )}
      </KeyboardAvoidingView>

      <TouchableOpacity
        className="px-10 py-3 bg-secondary rounded-md mt-5 border border-secondary cursor-pointer"
        onPress={handleLogin}
      >
        <Text className="text-white">Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
