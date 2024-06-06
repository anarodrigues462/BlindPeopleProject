import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

export default function Banco() {
  const [startCoords, setStartCoords] = useState({ latitude: 6.8523, longitude: 79.8895 }); // Coordenadas manuais para o ponto de partida
  const [endCoords, setEndCoords] = useState({ latitude: 6.8497, longitude: 79.9502 }); // Coordenadas manuais para o ponto de destino
  const [direction, setDirection] = useState(null);

  const handleGetDirections = () => {
    const bearing = calculateBearing(startCoords.latitude, startCoords.longitude, endCoords.latitude, endCoords.longitude);
    setDirection(bearing);
  };

  const calculateBearing = (startLat, startLng, endLat, endLng) => {
    const startLatRad = toRadians(startLat);
    const startLngRad = toRadians(startLng);
    const endLatRad = toRadians(endLat);
    const endLngRad = toRadians(endLng);

    const deltaLng = endLngRad - startLngRad;

    const y = Math.sin(deltaLng) * Math.cos(endLatRad);
    const x = Math.cos(startLatRad) * Math.sin(endLatRad) -
              Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(deltaLng);

    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const toDegrees = (radians) => {
    return radians * 180 / Math.PI;
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
        {direction && (
          <View style={styles.directionContainer}>
            <Text style={styles.directionText}>Siga na direção {direction}°</Text>
          </View>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <MaterialIcons name="directions" size={30} color="#ffffff" />
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
    flexDirection: 'row',
    backgroundColor: '#005AEE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 18,
  },
  directionContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  directionText: {
    fontSize: 16,
  },
});
