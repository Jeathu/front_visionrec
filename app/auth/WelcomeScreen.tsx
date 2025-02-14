import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-green-300 h-full w-full">
      <View className="flex-1 flex justify-center items-center p-4">
        <Text className="text-black text-4xl text-center font-bold ">
          Bienvenue🌳
        </Text>
        <Text className="text-white text-3xl text-center font-bold">
          AI pour trier :
        </Text>
        <View className="text-center mt-5">
          <Text className="text-gray-600 text-base text-center font-medium">
          ♻️(plastique, métal, verre, papier, organique)♻️
          </Text>
        </View>
      </View>
      <View className="flex-1 items-center mb-10 justify-center">
        <Image
          source={require("../../assets/images/planet.png")}
          style={{ width: 350, height: 350 }}
          resizeMode="contain"
        />
      </View>
      <View className="space-y-6 px-4 mb-8">
        <TouchableOpacity
          onPress={() => router.push("/auth/Register")}
          className="py-4 bg-sky-500 mx-7 rounded-xl"
        >
          <Text className="text-xl font-bold text-center text-white">
            Commencez !
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center px-4 mb-6">
        <Text className="text-black font-semibold">
          Vous avez déjà un compte ?
        </Text>
        <TouchableOpacity onPress={() => router.push("/auth/Connection")}>
          <Text className="font-semibold text-blue-800">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
