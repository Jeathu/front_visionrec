import { Camera, Download, Images, Trash } from "lucide-react-native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import JsonDisplay from "./JsonDisplay";
import {ImageActionsProps } from "@/interfaces/types";


const ImageActions: React.FC<ImageActionsProps>  = ({
  onTakePhoto,
  onSelectImage,
  onDeleteImage,
  onDownloadImage,
  image,
  jsonData,
}: any) => (
  <View style={tw.style("w-full px-4")}>
    <View style={tw.style("flex-row justify-between w-full")}>
      <TouchableOpacity
        onPress={onTakePhoto}
        style={tw.style(
          "bg-blue-500 p-4 rounded-lg flex-row items-center mr-2 w-1/2",
          Platform.OS === "web" ? "max-w-xs" : "flex-1"
        )}
      >
        <Camera size={24} color="white" />
        <Text
          style={tw.style("text-white font-bold ml-2 text-sm sm:text-base")}
        >
          Prendre une photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSelectImage}
        style={tw.style(
          "bg-green-500 p-4 rounded-lg flex-row items-center mr-2 w-1/2",
          Platform.OS === "web" ? "max-w-xs" : "flex-1"
        )}
      >
        <Images size={24} color="white" />
        <Text
          style={tw.style("text-white font-bold ml-2 text-sm sm:text-base")}
        >
          Choisir une image
        </Text>
      </TouchableOpacity>
    </View>

    {image && (
      <View style={tw.style("flex justify-center items-center mt-4")}>
        <TouchableOpacity
          onPress={onDeleteImage}
          style={tw.style(
            "bg-red-500 p-3 rounded-lg flex-row items-center justify-center mt-4 w-4/5 sm:w-1/2"
          )}
        >
          <Trash size={24} color="white" />
          <Text
            style={tw.style("text-white font-bold ml-2 text-sm sm:text-base")}
          >
            Supprimer l'image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDownloadImage}
          style={tw.style(
            "bg-blue-500 p-3 rounded-lg flex-row items-center justify-center mt-4 w-4/5 sm:w-1/2"
          )}
        >
          <Download size={24} color="white" />
          <Text
            style={tw.style("text-white font-bold ml-2 text-sm sm:text-base")}
          >
            Sauvegarder l'image
          </Text>
        </TouchableOpacity>
      </View>
    )}

        {/* Vérification que jsonData existe avant l'affichage */}
    {jsonData && (
      <View style={tw.style("mt-4 w-full p-2 bg-gray-100 rounded-lg")}>
        <JsonDisplay jsonData={jsonData} />
      </View>
    )}


  </View>
  
);

export default ImageActions;
