import { BackendResponse } from "@/interfaces/types";
import React from "react";
import { View, Text } from "react-native";

interface JsonDisplayProps {
  jsonData: BackendResponse;
}


const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  if (!jsonData) {
    return (
      <View className="bg-white p-4 mt-6 rounded-lg shadow-lg w-11/12">
        <Text className="text-lg text-center">Aucune donnée disponible</Text>
      </View>
    );
  }

  return (
    <View className="bg-white p-4 mt-6 rounded-lg  text-center">
      <Text className="text-xl font-bold mb-2 text-blue-500">Données Classifiées :</Text>
      <Text className="text-lg">Confidence: {jsonData.confidence || "N/A"}%</Text>
      <Text className="text-lg">Prediction: {jsonData.prediction || "N/A"}</Text>
      <Text className="text-lg">Traitement: {jsonData.treatment || "N/A"}</Text>
    </View>
  );
};

export default JsonDisplay;
