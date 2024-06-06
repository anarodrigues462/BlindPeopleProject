import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function Escola() {
  const [startCoords, setStartCoords] = useState({ latitude: 40.18661, longitude: -8.41611 }); 
  const [endCoords, setEndCoords] = useState({ latitude: 40.18534, longitude: -8.4123 });
  const [route, setRoute] = useState(null);

  const handleGetDirections = async () => {
    const response = await fetch(
      `http://router.project-osrm.org/route/v1/walking/${startCoords.longitude},${startCoords.latitude};${endCoords.longitude},${endCoords.latitude}?geometries=geojson`
    );
    const data = await response.json();
    const coordinates = data.routes[0].geometry.coordinates.map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
    setRoute(coordinates);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={{
          latitude: startCoords.latitude,
          longitude: startCoords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {startCoords && <Marker coordinate={startCoords} title="Ponto de Partida" />}
        {endCoords && <Marker coordinate={endCoords} title="Ponto de Destino" />}
        {route && <Polyline coordinates={route} strokeWidth={5} strokeColor="#005AEE" />}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Obter Direções</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#005AEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
