import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

export default function Banco() {
  const [banks, setBanks] = useState([]);
  const [nearestBank, setNearestBank] = useState(null);

  useEffect(() => {
    fetchBanksNearby(6.8523, 79.8895); // Coordenadas manualmente definidas (latitude e longitude)
  }, []);

  const fetchBanksNearby = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=bank&key=YOUR_API_KEY`
      );
      const data = await response.json();
      setBanks(data.results);

      // Encontrar o banco mais próximo
      if (data.results.length > 0) {
        const nearest = data.results[0];
        setNearestBank(nearest);
      }
    } catch (error) {
      console.error('Erro ao buscar bancos:', error);
    }
  };

  const handleGetDirections = () => {
    if (nearestBank) {
      const { lat, lng } = nearestBank.geometry.location;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={{
          latitude: 6.8523,
          longitude: 79.8895,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {banks.map((bank, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bank.geometry.location.lat,
              longitude: bank.geometry.location.lng,
            }}
            title={bank.name}
          />
        ))}
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
