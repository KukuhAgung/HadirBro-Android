import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "./data/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Sukses", "Login berhasil, selamat datang kembali!");
      setEmailError(false);
      setPasswordError(false);
      navigation.navigate("Home");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError(true);
          break;
        case "auth/missing-password":
          setPasswordError(true);
          break;
        default:
          Alert.alert(
            error.code,
            "Login gagal, silahkan cek email dan password anda."
          );
          break;
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Image
        className="w-[350px] h-[250px] mb-5"
        resizeMode="cover"
        source={require("./image/splash.png")}
      />

      <View className="w-[74%]">
        <Text className="text-[28px] text-primary font-bold mb-1">Welcome</Text>
        <Text className="text-[16px] text-primary font-bold">
          HadirBro! Makes Fast and On Time
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        className="w-[90%] items-center flex mt-6"
      >
        {emailError ? (
          <>
            <View
              className={`relative flex flex-row gap-x-4 items-center border border-red-600 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
            >
              <FontAwesome name="inbox" size={22} color="gray" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="red"
                autoFocus={true}
                onChangeText={(text) => setEmail(text)}
                onPressIn={() => setEmailError(false)}
                className={`border-b w-[70%] pb-2 border-red-600`}
              ></TextInput>
            </View>
            <Text className="text-red-600 text-xs text-left w-full mt-1 ml-20">
              *Email salah, coba lagi!
            </Text>
          </>
        ) : (
          <View
            className={`flex flex-row gap-x-4 items-center border border-gray-700 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
          >
            <FontAwesome name="inbox" size={22} color="gray" />
            <TextInput
              placeholder="Email"
              autoFocus={true}
              onChangeText={(text) => setEmail(text)}
              className={`border-b w-[70%] pb-2 border-gray-700`}
            ></TextInput>
          </View>
        )}

        {passwordError ? (
          <>
            <View
              className={`flex flex-row gap-x-4 items-center border border-red-600 rounded-md border-opacity-25 w-[80%] py-3 mt-3`}
            >
              <FontAwesome name="key" size={20} color="gray" />
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
            <FontAwesome name="key" size={20} color="gray" />
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
        className="px-10 py-2 bg-secondary rounded-lg mt-5 border border-secondary cursor-pointer"
        onPress={SignIn}
      >
        <Text className="text-white">Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
