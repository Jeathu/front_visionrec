import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LogoutScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Fonction de déconnexion
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Envoi de la requête de déconnexion
      const response = await axios.post(
        "https://adidome.com/visionrec/auth/logout"
      );

      if (response.status === 200) {
        // Suppression du token localement
        await AsyncStorage.removeItem("userToken");

        // Redirection vers la page de connexion
        Alert.alert("Déconnexion réussie !");
        router.replace("/auth/WelcomeScreen");
      } else {
        throw new Error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Erreur",
          error.response?.data?.message || "Erreur de déconnexion"
        );
      } else if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur inconnue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-xs font-bold text-black text-center mb-4">
        Voulez-vous vraiment vous déconnecter ? 👋
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 p-3 rounded-lg mt-4 w-full max-w-xs"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Se déconnecter
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;
