import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/config/firebaseConfig";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer votre adresse e-mail.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      router.replace("/auth/LogIn");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-black text-center mb-4">
        Réinitialiser le mot de passe
      </Text>
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            placeholder="exemple@gmail.com"
            className="border border-gray-300 rounded-lg p-3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={handleResetPassword}
          disabled={loading}
          className="bg-blue-500 p-3 rounded-lg"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Envoyer le lien de réinitialisation
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/LogIn")} className="mt-4">
          <Text className="text-blue-600 text-center">Retour à la connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
