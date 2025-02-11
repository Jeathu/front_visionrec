import React from "react";
import { View, Text, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import tw from "twrnc";
import { BackendResponse } from "@/interfaces/types";

interface ResultsScreenProps {
  jsonData: BackendResponse | null;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ jsonData }) => {
  // Extraire la confiance et la prédiction du JSON
  const confidence = jsonData?.confidence || 0;
  const prediction = jsonData?.prediction || "";

  // Mettre à jour chartData en fonction de la prédiction
  const chartData = [
    { category: "Plastique", confidence: prediction === "Plastique" ? confidence : 0 },
    { category: "Métal", confidence: prediction === "Métal" ? confidence : 0 },
    { category: "Verre", confidence: prediction === "Verre" ? confidence : 0 },
    { category: "Papier", confidence: prediction === "Papier" ? confidence : 0 },
    { category: "Organique", confidence: prediction === "Organique" ? confidence : 0 },
  ];

  return (
    <ScrollView contentContainerStyle={tw`flex-grow items-center p-5`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Résultats de Classification</Text>

      {/* Affichage du graphique */}
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar
          data={chartData}
          x="category"
          y="confidence"
          style={{ data: { fill: "#4CAF50" } }}
        />
      </VictoryChart>

      {/* Affichage des résultats sous forme de texte */}
      <View style={tw`mt-4 w-full`}>
        {chartData.map((item, index) => (
          <View key={index} style={tw`flex-row justify-between w-full my-2`}>
            <Text style={tw`text-lg`}>{item.category} :</Text>
            <Text style={tw`font-semibold text-blue-500`}>{item.confidence.toFixed(2)}%</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
