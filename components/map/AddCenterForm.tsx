import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const AddCenterForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const newCenter = { name, address, contact };
      await axios.post('https://data.teo-paysdelaloire.fr/api/explore/v2.1/catalog/datasets/837810944', newCenter);
      setStatus('Centre ajouté avec succès');
    } catch (error) {
      setStatus('Erreur lors de l\'ajout');
    }
  };

  return (
    <View className="p-4">
      <TextInput
        placeholder="Nom du centre"
        value={name}
        onChangeText={setName}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        className="border p-2 mb-2"
      />
      <Button title="Ajouter" onPress={handleSubmit} />
      {status && <Text>{status}</Text>}
    </View>
  );
};

export default AddCenterForm;
