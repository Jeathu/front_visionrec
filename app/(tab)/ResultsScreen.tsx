import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { useRouter } from "expo-router";
import tw from "twrnc";

const ResultsScreen = () => {
  const router = useRouter();

  const chartData = [
    { category: "Plastique", confidence: 80 },
    { category: "Métal", confidence: 0 },
    { category: "Verre", confidence: 0 },
    { category: "Papier", confidence: 0 },
    { category: "Organique", confidence: 0 },
  ];

  return (
    <ScrollView contentContainerStyle={tw`flex-grow items-center p-5`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Résultats de Classification</Text>

      {/* Affichage du graphique */}
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar data={chartData} x="category" y="confidence" style={{ data: { fill: "#4CAF50" } }} />
      </VictoryChart>

      {/* Affichage des résultats sous forme de texte */}
      <View style={tw`mt-4 w-full`}>
        {chartData.map((item, index) => (
          <View key={index} style={tw`flex-row justify-between w-full my-2`}>
            <Text style={tw`text-lg`}>{item.category} :</Text>
            <Text style={tw`font-semibold text-blue-500`}>{item.confidence}%</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
