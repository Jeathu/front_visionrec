// Télécharger l'image via galerie
/*
  const handleDownloadImage = async () => {
    if (image) {
      const filename = `${Date.now()}.jpg`;
      const destPath = `${FileSystem.documentDirectory}/${filename}`;
      try {
        await FileSystem.copyAsync({ from: image, to: destPath });
        Alert.alert("Succès", "L'image a été téléchargée avec succès.");
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        setError("Erreur lors du téléchargement de l'image");
      }
    }
  };
  */

/*
  // Envoi de l'image au backend
  const sendImageUrlToBackend = async (imageUrl) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/classify", {
        image_url: imageUrl,  // On envoie juste l'URL au backend
      });
  
      console.log("Réponse du backend :", response.data);
  
    } catch (error) {
      console.error("Erreur d'envoi au backend :", error);
    }
  };
  */

// Télécharger l'image via galerie et manipuler l'image
/*
  const handleDownloadImage = async () => {
    if (!image) return;

    // Etape 1 : Vérifier le format de l’image
    const extension = image.split(".").pop();
    if (!extension) {
      Alert.alert("Erreur", "Format de fichier invalide");
      return;
    }
    

    const fileExtension = extension.toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];

    if (!allowedExtensions.includes(fileExtension)) {
      Alert.alert("Erreur", "Format d'image non supporté !");
      return;
    }

    const filename = `${Date.now()}.${fileExtension}`;
    const destPath = `${FileSystem.documentDirectory}/${filename}`;

    setLoading(true);

    try {
      const fileToUpload: UploadFile = {
        uri: image,
        type: `image/${fileExtension}`,
        name: filename,
      };

      // Etape 2 : Envoyer l’image sur Cloudinary
      const formData = new FormData();
      formData.append("file", fileToUpload as any);
      formData.append("upload_preset", "visionrec_Upload");
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
      console.log("FormData :", formData);
      //console.log("AxiosInstance :", axiosInstance);

      const cloudinaryResponse = await axiosInstance.post("", formData);
      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log("Image sauvegardée sur Cloudinary :", imageUrl);

      // Etape 3 : Envoyer l’URL au backend Flask
      const backendResponse = await axios.post(
        "http://127.0.0.1:5000/classify",
        {
          image_url: imageUrl,
        }
      );

      const wasteType = backendResponse.data.waste_type;
      console.log("Type de déchet détecté :", wasteType);

      // Etape 4 : Affichage du résultat à l’utilisateur
      Alert.alert("Résultat", `Déchet détecté : ${wasteType}`);
    } catch (error) {
      console.error("Erreur :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors du traitement de l'image."
      );
    }
  };
  */

/*
  // Variables Cloudinary
  const CLOUDINARY_CLOUD_NAME = "dsv6xkzcj";
  const CLOUDINARY_UPLOAD_PRESET = "visionrec_Upload";

  // Télécharger l'image sur Cloudinary  version 2
  const handleUploadToCloudinary = async () => {
    if (!image) {
      Alert.alert("Erreur", "Aucune image sélectionnée.");
      return;
    }

  
    try {
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
      } as any);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      console.log("📤 Envoi à Cloudinary...");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData  as any,
        }
      );

      const data: CloudinaryResponse = await response.json();
      if (!data.secure_url) {
        throw new Error("Échec de l'upload sur Cloudinary.");
      }

      const imageUrl = data.secure_url;
      console.log("✅ Image sauvegardée sur Cloudinary :", imageUrl);

      // Afficher une alerte immédiate
      Alert.alert("Succès", "Image enregistrée avec succès !");

      // Afficher un toast après 2 secondes
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Image enregistrée",
        text2: "L'image a été téléchargée avec succès sur Cloudinary 🎉",
        visibilityTime: 2000, // Disparaît après 2s
      });
    }, 2000);

      // Envoi de l’URL au backend Flask
      console.log("📡 Envoi au backend Flask...");
      const backendResponse = await axios.post<BackendResponse>(
        "http://127.0.0.1:5000/classify",
        {
          image_url: imageUrl,
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
  */
