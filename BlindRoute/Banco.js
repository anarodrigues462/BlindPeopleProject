import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

export default function Banco() {
  const [startCoords, setStartCoords] = useState({ latitude: 6.8523, longitude: 79.8895 }); // Coordenadas manuais para o ponto de partida
  const [endCoords, setEndCoords] = useState({ latitude: 6.8497, longitude: 79.9502 }); // Coordenadas manuais para o ponto de destino

  const handleGetDirections = () => {
    const { latitude: startLat, longitude: startLng } = startCoords;
    const { latitude: endLat, longitude: endLng } = endCoords;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={{
          latitude: startCoords.latitude,
          longitude: startCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={startCoords} title="Ponto de Partida" />
        <Marker coordinate={endCoords} title="Ponto de Destino" />
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
});
