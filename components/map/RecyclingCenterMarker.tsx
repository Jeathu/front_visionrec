// components/geo/RecyclingCenterMarker.tsx
import React from 'react';
import { Marker } from 'react-native-maps';

// Typage des données que nous attendons
type RecyclingCenterMarkerProps = {
  center: {
    fields: {
      gps_y: number;
      gps_x: number;
      n_service: string;
      ad1_site: string;
      d_ouv: string;
    };
  };
};

const RecyclingCenterMarker: React.FC<RecyclingCenterMarkerProps> = ({ center }) => {
  return (
    <Marker
      coordinate={{
        latitude: center.fields.gps_y / 1000000, // Conversion des coordonnées GPS
        longitude: center.fields.gps_x / 1000000,
      }}
      title={center.fields.n_service}
      description={center.fields.ad1_site}
      onPress={() => alert(`Horaire: ${center.fields.d_ouv}`)}
    />
  );
};

export default RecyclingCenterMarker; // Assurez-vous de l'export par défaut
