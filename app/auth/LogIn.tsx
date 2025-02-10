import { auth, signInWithGoogle } from "@/config/firebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError(
        "Veuillez saisir à la fois votre adresse e-mail et votre mot de passe"
      );
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tab)/HomeScreen");
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace("/(tab)/HomeScreen");
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Error", error.message);
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

        <Text className="text-gray-500 my-4 text-center">— Ou avec —</Text>

        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="border border-gray-300 rounded-lg p-3 flex-1"
            accessible={true}
            accessibilityLabel="Se connecter avec Google"
          >
            <Text className="text-center">Google</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">
            Vous n'avais pas encore inscrit ?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/SignUp")}
            disabled={loading}
          >
            <Text className="text-blue-600">Inscrivez vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
