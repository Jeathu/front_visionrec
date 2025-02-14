import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validation du formulaire
  const validateForm = () => {
    if (!username.trim()) {
      setError("Le nom est requis");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Email invalide");
      return false;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    if (password !== repeatPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };

  // Gestion de l'inscription
  const handleRegister = async () => {
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://adidome.com/visionrec/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
          repeatPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

      Alert.alert("Succès", "Compte créé !");
      router.replace("/auth/Connection");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        Alert.alert("Erreur", error.message);
      } else {
        setError("Une erreur inconnue s'est produite");
        Alert.alert("Erreur", "Une erreur inconnue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-4 md:px-8 w-full">
          <View className="w-full max-w-md">
            <Text className="text-2xl md:text-3xl font-bold text-black text-center mb-4">
              Créer un compte 👋
            </Text>

            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}

            <View className="space-y-4">
              {/* Nom */}
              <View>
                <Text className="text-gray-600 mb-1">Nom</Text>
                <TextInput
                  placeholder="Entrez votre nom"
                  className="border border-gray-300 rounded-lg p-3 text-lg"
                  value={username}
                  onChangeText={setUserName}
                  editable={!loading}
                />
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-600 mb-1">Email</Text>
                <TextInput
                  placeholder="exemple@gmail.com"
                  className="border border-gray-300 rounded-lg p-3 text-lg"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Mot de passe */}
              <View>
                <Text className="text-gray-600 mb-1">Mot de passe</Text>
                <TextInput
                  placeholder="Entrez votre mot de passe"
                  secureTextEntry
                  className="border border-gray-300 rounded-lg p-3 text-lg"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <Text className="text-gray-400 text-xs mt-1">
                  Minimum 8 caractères
                </Text>
              </View>

              {/* Confirmer le mot de passe */}
              <View>
                <Text className="text-gray-600 mb-1">
                  Confirmer le mot de passe
                </Text>
                <TextInput
                  placeholder="Répétez votre mot de passe"
                  secureTextEntry
                  className="border border-gray-300 rounded-lg p-3 text-lg"
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity
                onPress={handleRegister}
                className={`bg-blue-600 rounded-lg p-4 mt-6 ${
                  loading ? "opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    S'inscrire
                  </Text>
                )}
              </TouchableOpacity>

              <Text className="text-gray-500 my-4 text-center">
                — Ou avec —
              </Text>

              {/* Connexion */}
              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-600">Déjà inscrit ? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/auth/Connection")}
                  disabled={loading}
                >
                  <Text className="text-blue-600 font-bold">Se connecter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
