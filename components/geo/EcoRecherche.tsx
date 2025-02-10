import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text } from "react-native";
import tw from "twrnc";
import { Dechetterie } from "../../interfaces/Dechetterie";
import EcoCard from "./EcoCard";
import EcoFiltre from "./EcoFilter";

const EcoRecherche = () => {
  const [dechetteries, setDechetteries] = useState<Dechetterie[]>([]);
  const [filteredDechetteries, setFilteredDechetteries] = useState<
    Dechetterie[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDechetteries = async () => {
      try {
        const response = await fetch(
          "https://data.smartidf.services/api/explore/v2.1/catalog/datasets/listes-des-dechetteries/records?limit=100"
        );
        const data = await response.json();

        console.log("Data from API:", data);

        // Format de la réponse de l'API :
        const formattedData = data.results.map((record: any) => ({
          nom_de_la_decheterie: record.nom_de_la_decheterie,
          adresse_1: record.adresse_1,
          code_postal: record.code_postal,
          commune: record.commune,
          departement: record.departement,
          dechets_non_dangereux: record.dechets_non_dangereux,
          dechets_dangereux: record.dechets_dangereux,
          dechets_inertes: record.dechets_inertes,
          accueil_des_professionnels: record.accueil_des_professionnels,
          accueil_des_services_techniques:
          record.accueil_des_services_techniques,
        }));

        setDechetteries(formattedData);
        setFilteredDechetteries(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Erreur lors du chargement des déchèteries.");
      }
    };

    fetchDechetteries();
  }, []);

  const handleFilter = (attribute: keyof Dechetterie, searchTerm: string) => {
    if (!searchTerm) {
      setFilteredDechetteries(dechetteries);
    } else {
      const filtered = dechetteries.filter((dechetterie) =>
        String(dechetterie[attribute])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredDechetteries(filtered);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      {error ? (
        <Text style={tw`text-red-500 text-center text-lg mt-5`}>{error}</Text>
      ) : (
        <>
          {/* Filtre */}
          <EcoFiltre onFilter={handleFilter} />

          {/* Liste des déchèteries */}
          <FlatList
            data={filteredDechetteries}
            keyExtractor={(item) => item.nom_de_la_decheterie}
            numColumns={1}
            renderItem={({ item }) => <EcoCard dechetterie={item} />}
            contentContainerStyle={tw`space-y-4 flex-grow`}
          />
        </>
      )}
    </ScrollView>
  );
};

export default EcoRecherche;
