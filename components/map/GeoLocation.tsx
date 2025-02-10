// components/geo/GeoLocation.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'; 
import * as Location from 'expo-location';

// Définition des types pour la géolocalisation
type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const GeoLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } else {
        console.log('Permission de géolocalisation refusée');
      }
    };
    getLocation();
  }, []);

  return (
    <View className="p-4">
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text>Obtention de la géolocalisation...</Text>
      )}
    </View>
  );
};

export default GeoLocation;
