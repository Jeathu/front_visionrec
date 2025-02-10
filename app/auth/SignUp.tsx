import { auth, db } from "@/config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // Verifier si l'authentification est initialisée
  if (!auth) {
    console.error("Firebase auth is not initialized");
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-center">
          Firebase auth is not initialized
        </Text>
      </View>
    );
  }

  const validateForm = () => {
    if (!name.trim()) {
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
    return true;
  };

  const CreateNewAccount = async () => {
    try {
      setError("");
      if (!validateForm()) return;

      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await SaveUser(user);
      Alert.alert("Succès", "Compte créé avec succès!");
      router.push("/auth/LogIn");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const SaveUser = async (user: User) => {
    try {
      const data = {
        name: name.trim(),
        email: email.trim(),
        member: false,
        uid: user?.uid,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", email), data);
      setUserDetail(data);
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-black text-center mb-4">
        Créer un compte 👋
      </Text>
      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Nom</Text>
          <TextInput
            placeholder="Entrez votre nom"
            className="border border-gray-300 rounded-lg p-3"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>
        <View>
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            placeholder="exemple@gmail.com"
            className="border border-gray-300 rounded-lg p-3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
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
            editable={!loading}
          />
          <Text className="text-gray-400 text-xs mt-1">
            Minimum 8 caractères
          </Text>
        </View>
        <TouchableOpacity
          onPress={CreateNewAccount}
          className={`bg-blue-600 rounded-lg p-3 mt-6 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold">S'inscrire</Text>
          )}
        </TouchableOpacity>
        <Text className="text-gray-500 my-4 text-center">— Ou avec —</Text>
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Déjà inscrit ? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/LogIn")}
            disabled={loading}
          >
            <Text className="text-blue-600">Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
