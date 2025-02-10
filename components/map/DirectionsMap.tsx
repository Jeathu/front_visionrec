import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Déclarez les types des props pour DirectionsMap
type DirectionsMapProps = {
  centerCoordinates: {
    latitude: number;
    longitude: number;
  };
  userLocation: {
    latitude: number;
    longitude: number;
  };
};

// Clé API Google Maps
const API_KEY = 'AIzaSyDjJM0hfTDzwR2dg0EPL0gizYAift6B3OQ';

const DirectionsMap = ({ centerCoordinates, userLocation }: DirectionsMapProps) => {
  return (
    <MapView style={{ flex: 1 }}>
      <Marker coordinate={userLocation} title="Vous êtes ici" />
      <Marker coordinate={centerCoordinates} title="Centre de recyclage" />
      
      <MapViewDirections
        origin={userLocation}
        destination={centerCoordinates}
        apikey={API_KEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    </MapView>
  );
};

export default DirectionsMap;
