/*
import tw from "twrnc";
import axios from "axios";
import FormData from "form-data";
import * as FileSystem from "expo-file-system";
import Toast from 'react-native-toast-message';
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { BackendResponse } from "../../interfaces/types";
import ImagePreview from "@/components/imageHandle/ImagePreview";
import ImageActions from "@/components/imageHandle/ImageActions";
import { ActivityIndicator,Alert,Dimensions,Platform,Text,View,} from "react-native";



// Définir les dimensions de l'écran
const { width, height } = Dimensions.get("window");

// Obtenir le type MIME à partir de l'URI
const getMimeType = (uri: string) => {
  const extension = uri.split('.').pop()?.toLowerCase() || '';
  const mimeTypes: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp'
  };
  return mimeTypes[extension] || 'image/jpeg';
};


const HomeScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      }else{
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




  const handleUploadToBackend = async () => {
    if (!image) {
      Alert.alert("Erreur", "Aucune image sélectionnée.");
      return;
    }
  
    try {
      // Vérifier si l'image existe avant de l'envoyer backend
      const fileInfo = await FileSystem.getInfoAsync(image);
      if (!fileInfo.exists) {
          Alert.alert("Erreur", "L'image sélectionnée est invalide.");
        return;
      }

  
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "upload.jpg",
      });
  
      console.log("📤 Envoi de l'image au backend Flask...");
      const response = await fetch("http://127.0.0.1:5000/upload_image", {
        method: "POST",
        body: formData as any,
      });
  
      const data = await response.json();
      if (!data.success) {
        throw new Error("Échec de l'envoi de l'image au backend.");
      }
  
      console.log("✅ Image sauvegardée dans le backend.");
  
      // Afficher une alerte immédiate
      Alert.alert("Succès", "Image enregistrée avec succès dans le backend !");
  
      // Demander au backend de classer l'image
      console.log("📡 Envoi au backend Flask pour la classification...");
      const backendResponse = await axios.post<BackendResponse>(
        "http://127.0.0.1:5000/classify",
        {
          image_url: data.image_url,  // L'URL de l'image sauvegardée dans le backend
        }
      );
  
      const wasteType = backendResponse.data.waste_type;
      console.log("♻️ Type de déchet détecté :", wasteType);
  
      Alert.alert("Résultat", `Déchet détecté : ${wasteType}`);
    } catch (error) {
      console.error("❌ Erreur :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors du traitement de l'image."
      );
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <View style={tw.style("flex-1 items-center justify-center bg-white")}>
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
      />
      <CustomAlert
        visible={showAlert}
        message="Voulez-vous vraiment supprimer l'image ?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </View>
  );
};

export default HomeScreen;
*/