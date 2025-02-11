import CustomAlert from "@/components/CustomAlert";
import ImageActions from "@/components/imageHandle/ImageActions";
import ImagePreview from "@/components/imageHandle/ImagePreview";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Text,
  View,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { BackendResponse } from "@/interfaces/types";



// Définir les dimensions de l'écran
const { width, height } = Dimensions.get("window");

// Obtenir le type MIME à partir de l'URI
const getMimeType = (uri: string) => {
  const extension = uri.split(".").pop()?.toLowerCase() || "";
  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    bmp: "image/bmp",
  };
  return mimeTypes[extension] || "image/jpeg";
};

const HomeScreenContent = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [jsonData, setJsonData] = useState<BackendResponse | null>(null);



  // Effect pour vérifier les permissions de la caméra
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission requise",
            "L'accès à la caméra est nécessaire."
          );
        }
      }
    })();
  }, []);

  // Prendre une photo avec la caméra
  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setError(null);
      }
    } catch (error) {
      console.error("Erreur lors de la prise de photo :", error);
      setError("Erreur lors de la prise de photo");
    } finally {
      setLoading(false);
    }
  };

  // Sélectionner une image depuis la galerie
  const handleSelectImage = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: Platform.OS === "ios" ? 0.7 : 0.5,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setError(null);
      } else {
        setError("Aucune image sélectionnée");
      }
    } catch (error) {
      console.error("Erreur lors de la sélection d'image :", error);
      setError("Erreur lors de la sélection d'image");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer l'image
  const handleDeleteImage = () => {
    setShowAlert(true);
  };

  // Gestion de l'alerte de suppression
  const confirmDelete = () => {
    setImage(null);
    setShowAlert(false);
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowAlert(false);
  };

  // Télécharger l'image sur le backend
  const handleUploadToBackend = async () => {
    if (!image) {
      Alert.alert("Erreur", "Aucune image à envoyer.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Créer un objet FormData pour l'upload
      const formData = new FormData();
  
      // Gérer l'upload selon la plateforme
      if (Platform.OS === "web") {
        // Sur le web, convertir l'URI en fichier
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("file", new File([blob], "upload.jpg", { type: blob.type }));
      } else {
        // Sur mobile, utiliser l'URI directement
        const fileInfo = await FileSystem.getInfoAsync(image);
        if (!fileInfo.exists) {
          throw new Error("Fichier introuvable !");
        }
        const mimeType = getMimeType(image) || "image/jpeg"; // Définir un type MIME par défaut
        formData.append("file", {
          uri: image,
          type: mimeType,
          name: "upload.jpg",
        } as any);
      }
  
      console.log("📤 Envoi de l'image au backend...");
  
      // Utilisation de axios pour envoyer l'image
      const uploadResponse = await axios.post("http://10.42.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Laisser Axios gérer le content type
        },
      });
  
      if (!uploadResponse.data.success) {
        throw new Error("Échec de l'envoi de l'image au backend.");
      }
  
      console.log("✅ Image sauvegardée avec succès dans le backend !");
      Alert.alert("Succès", "Image enregistrée avec succès !");


      // Récupérer les données JSON depuis le backend
      setJsonData(uploadResponse.data);


    } catch (error) {
      console.error("❌ Erreur :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du traitement de l'image.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={tw.style("flex-grow items-center justify-center bg-white p-4")}>
      {error && <Text style={tw.style("text-red-500 mb-4")}>{error}</Text>}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={tw.style("absolute z-10")}
        />
      )}
      <ImagePreview image={image} />
      <ImageActions
        onTakePhoto={handleTakePhoto}
        onSelectImage={handleSelectImage}
        onDeleteImage={handleDeleteImage}
        onDownloadImage={handleUploadToBackend}
        image={image}
        jsonData={jsonData}
      />
      <CustomAlert
        visible={showAlert}
        message="Voulez-vous vraiment supprimer l'image ?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      
    </ScrollView>
  );
};


export default HomeScreenContent;
