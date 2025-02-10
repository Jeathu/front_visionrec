import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

interface EcoCardProps {
  dechetterie: {
    nom_de_la_decheterie: string;
    adresse_1: string;
    code_postal: string;
    commune: string;
  };
}

const EcoCard: React.FC<EcoCardProps> = ({ dechetterie }) => (
  <View style={tw.style("bg-white p-4 rounded-lg shadow-md my-2 mx-2 w-full")}>
    <Text style={tw.style("font-bold text-lg text-center")}>
      {dechetterie.nom_de_la_decheterie}
    </Text>
    <Text style={tw.style("text-gray-600 text-center mt-2")}>
      {dechetterie.adresse_1}
    </Text>
    <Text style={tw.style("text-gray-600 text-center mt-1")}>
      {dechetterie.code_postal} {dechetterie.commune}
    </Text>
  </View>
);

export default EcoCard;
