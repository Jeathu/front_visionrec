import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import { Dechetterie } from '../../interfaces/Dechetterie'; 

interface EcoFiltreProps {
  onFilter: (attribute: keyof Dechetterie, searchTerm: string) => void;
}

const EcoFiltre: React.FC<EcoFiltreProps> = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAttribute, setSelectedAttribute] = useState<keyof Dechetterie>('nom_de_la_decheterie');

  const handleSearch = () => {
    onFilter(selectedAttribute, searchTerm);
  };

  const handleAttributeChange = (attribute: keyof Dechetterie) => {
    setSelectedAttribute(attribute);
  };

  return (
    <View style={tw`mb-4 px-4`}>
      <Picker
        selectedValue={selectedAttribute}
        onValueChange={handleAttributeChange}
        style={tw`mb-2`}
      >
        <Picker.Item label="Nom de la déchèterie" value="nom_de_la_decheterie" />
        <Picker.Item label="Adresse" value="adresse_1" />
        <Picker.Item label="Commune" value="commune" />
        <Picker.Item label="Code Postal" value="code_postal" />
      </Picker>
    
      <TextInput
        placeholder="Rechercher..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={tw`border border-gray-300 rounded-full px-4 py-2 w-full`}
        accessibilityLabel="Barre de recherche"
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={tw`mt-2 bg-blue-500 rounded-full py-2`}
        accessibilityLabel="Rechercher"
      >
        <Text style={tw`text-white text-center`}>Rechercher</Text>
      </TouchableOpacity>
      {searchTerm && (
        <TouchableOpacity
          onPress={() => {
            setSearchTerm('');
            handleSearch();
          }}
          style={tw`mt-2 bg-red-500 rounded-full py-2`}
          accessibilityLabel="Réinitialiser la recherche"
        >
          <Text style={tw`text-white text-center`}>Réinitialiser</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EcoFiltre;
