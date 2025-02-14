import { BackendResponse } from "@/interfaces/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import tw from "twrnc";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "victory";

const ResultsScreen = () => {
  // Récupérer les dimensions de l'écran pour un rendu responsive
  const { width } = useWindowDimensions();

  // Déterminer la largeur du graphique en fonction de l'écran
  const chartWidth = width > 600 ? 500 : width - 40; // 500px max, sinon adaptatif
  const fontSize = width > 600 ? 14 : 10; // Ajuster la taille du texte sur mobile

  // Récupérer et parser les données JSON passées
  const { jsonData } = useLocalSearchParams<{ jsonData: string }>();
  const parsedJsonData: BackendResponse = JSON.parse(jsonData);

  // Extraction des données
  const confidence = parsedJsonData?.confidence || 0;
  const prediction = parsedJsonData?.prediction || "";

  // Données pour le graphique
  const chartData = [
    { category: "Électroniques", confidence: prediction === "électroniques" ? confidence : 0 },
    { category: "Automobiles", confidence: prediction === "automobiles" ? confidence : 0 },
    { category: "Batterie", confidence: prediction === "batterie" ? confidence : 0 },
    { category: "Plastique", confidence: prediction === "plastiques" ? confidence : 0 },
    { category: "Ampoules", confidence: prediction === "Ampoules" ? confidence : 0 },
    { category: "Métal", confidence: prediction === "métalliques" ? confidence : 0 },
    { category: "Verre", confidence: prediction === "verre" ? confidence : 0 },
    { category: "Papier", confidence: prediction === "papier" ? confidence : 0 },
    { category: "Organique", confidence: prediction === "organiques" ? confidence : 0 },
  ];

  return (
    <ScrollView contentContainerStyle={tw`flex-grow items-center p-5`} style={{ minHeight: "100%" }}>
      <Text style={tw`text-2xl font-bold mb-6`}>Résultats de Classification</Text>

      {/* Graphique responsive */}
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={width > 600 ? 40 : 20} // Ajustement pour éviter l'écrasement
        width={chartWidth}
        height={300}
      >
        {/* Axe X avec rotation des labels optimisée */}
        <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={30} textAnchor="end" />}
          style={{ tickLabels: { fontSize: fontSize, padding: 5 } }}
        />

        {/* Axe Y avec titre et labels ajustés */}
        <VictoryAxis
          dependentAxis
          label="Confiance (%)"
          style={{
            axisLabel: { fontSize: fontSize + 2, padding: 30 },
            tickLabels: { fontSize: fontSize, padding: 5 },
          }}
        />

        {/* Barres du graphique */}
        <VictoryBar
          data={chartData}
          x="category"
          y="confidence"
          style={{ data: { fill: "#4CAF50", width: width > 600 ? 30 : 20 } }} // Ajustement largeur des barres
        />
      </VictoryChart>

      {/* Résumé des valeurs sous le graphique */}
      <View style={tw`mt-4 w-full`}>
        {chartData.map((item, index) => (
          <View key={index} style={tw`flex-row justify-between w-full my-2 px-2`}>
            <Text style={[tw`text-lg`, { fontSize }]}>{item.category} :</Text>
            <Text style={[tw`font-semibold text-blue-500`, { fontSize }]}>
              {item.confidence.toFixed(2)}%
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
