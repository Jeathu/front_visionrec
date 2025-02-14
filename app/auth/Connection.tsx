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


const Connection = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fonction pour valider le formulaire
  const validateForm = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer un email valide.");
      return false;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    return true;
  };

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://adidome.com/visionrec/auth/login", {
        email: email.trim(),
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Erreur de connexion");
      }

      Alert.alert("Succès", "Connexion réussie !");
      router.replace("/(tab)/HomeScreen");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Erreur de connexion");
        Alert.alert("Erreur", error.response?.data.message || "Erreur de connexion");
      } else {
        setError("Une erreur inconnue s'est produite");
        Alert.alert("Erreur", "Une erreur inconnue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-black text-center mb-4">
        Bonjour, bienvenue à nouveau ! 👋
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
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Mot de passe</Text>
          <TextInput
            placeholder="Entrez votre mot de passe"
            secureTextEntry
            className="border border-gray-300 rounded-lg p-3"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              className="mr-2 w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
            >
              {rememberMe && <Text>✓</Text>}
            </TouchableOpacity>
            <Text className="text-gray-600">Rappelle-moi</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/auth/ForgotPassword")}>
            <Text className="text-red-500">Mot de passe oublié?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-blue-500 p-3 rounded-lg"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Se connecter
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">
            Vous n'avais pas encore inscrit ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/Register")}
            disabled={loading}
          >
            <Text className="text-blue-600">Inscrivez vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Connection;
