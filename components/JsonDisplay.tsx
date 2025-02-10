import React from "react";
import { View, Text } from "react-native";

interface JsonDisplayProps {
  jsonData: any;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  return (
    <View className="bg-white p-4 mt-6 rounded-lg shadow-lg w-11/12">
      <Text className="text-xl font-bold mb-2">Données Classifiées :</Text>
      <Text className="text-lg">Confidence: {jsonData.confidence}</Text>
      <Text className="text-lg">Message: {jsonData.message}</Text>
      <Text className="text-lg">Prediction: {jsonData.prediction}</Text>
      <Text className="text-lg">Success: {jsonData.success ? "Oui" : "Non"}</Text>
      <Text className="text-lg">Treatment: {jsonData.treatment}</Text>
    </View>
  );
};

export default JsonDisplay;
