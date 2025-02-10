import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import RecyclingCenterMarker from './RecyclingCenterMarker';

// Définition des types pour la géolocalisation et les centres de recyclage
type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type RecyclingCenter = {
  recordid: string;
  fields: {
    d_ouv: string;
    n_dept: string;  // Département
    l_region: string;  // Région
    n_service: string;  // Service
    tel_service: string;  // Téléphone du service
    ad1_site: string;  // Adresse
    code_postal: string;  // Code postal
    gps_y: number;
    gps_x: number;
  };
};

const MapViewComponent = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [recyclingCenters, setRecyclingCenters] = useState<RecyclingCenter[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        alert('Permission de géolocalisation refusée');
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    const fetchRecyclingCenters = async () => {
      try {
        const response = await axios.get(
          'https://data.teo-paysdelaloire.fr/api/explore/v2.1/catalog/datasets/837810944_annuairedesdecheteriesdma_pdl/records?limit=100'
        );
        setRecyclingCenters(response.data.records);
      } catch (error) {
        console.error('Erreur lors de la récupération des centres de recyclage', error);
      }
    };
    fetchRecyclingCenters();
  }, []);

  return (
    <View className="flex-1">
      {locationPermission && region ? (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={(newRegion: Region) => setRegion(newRegion)}
        >
          {recyclingCenters.map((center) => (
            <RecyclingCenterMarker key={center.recordid} center={{
              fields: {
                ...center.fields,
                d_ouv: center.fields.d_ouv || '' // Add d_ouv field with a default empty string if it doesn't exist
              }
            }} />
          ))}
        </MapView>
      ) : (
        <Text>Chargement de la carte...</Text>
      )}

      {/* Affichage des informations des centres de recyclage sous forme de cartes avec style NativeWind */}
      <View className="p-4 space-y-4">
        {recyclingCenters.map((center) => (
          <View
            key={center.recordid}
            className={`bg-white p-4 rounded-lg shadow-md border border-gray-200 ${
              screenWidth > 600 ? 'max-w-lg' : 'max-w-full'
            }`}
          >
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Département :</strong> {center.fields.n_dept}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Région :</strong> {center.fields.l_region}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Service :</strong> {center.fields.n_service}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Téléphone :</strong> {center.fields.tel_service}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Adresse :</strong> {center.fields.ad1_site}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              <strong>Code postal :</strong> {center.fields.code_postal}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MapViewComponent;
