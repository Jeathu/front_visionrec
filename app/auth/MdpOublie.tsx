import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer votre adresse e-mail.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://adidome.com/visionrec/forgot-password", {
        email: email.trim(),
      });

      if (response.status === 200) {
        Alert.alert(
          "Succès",
          "Un lien de réinitialisation a été envoyé à votre adresse e-mail."
        );
        router.replace("/auth/LogIn");
      } else {
        throw new Error("Erreur lors de l'envoi du lien de réinitialisation.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Erreur",
          error.response?.data.message ||
            "Une erreur s'est produite lors de l'envoi du lien de réinitialisation."
        );
      } else {
        Alert.alert("Erreur", "Une erreur inconnue s'est produite.");
      }
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
        <TouchableOpacity
          onPress={() => router.push("/auth/Connection")}
          className="mt-4"
        >
          <Text className="text-blue-600 text-center">
            Retour à la connexion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
