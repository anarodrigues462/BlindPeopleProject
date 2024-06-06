import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity, StyleSheet, View, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';

export default function Banco({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    async function getLocationPermission() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
    }

    getLocationPermission();
  }, []);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 1) {
      navigation.navigate('Rotas Preferidas');
    } 
    if (index === 2){
      navigation.navigate('Banco');
    }
  };

  const buttons = [
    { id: 1, label: 'Rotas Preferidas', icon: 'star' },
    { id: 2, label: 'Banco', icon: 'credit-card' },
    { id: 3, label: 'Clínica Médica', icon: 'local-hospital' },
    { id: 4, label: 'Escola', icon: 'school' },
  ];

  return (
    <View style={{flexDirection: "column", flex: 1}}>
      <View style={{ flex: 2 }}>
        {region ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider="google"
            region={region}
          >
            <Marker coordinate={region} title="Minha localização" />
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button, selectedIndex === button.id && styles.selectedButton]}
            onPress={() => handleListItemClick(button.id)}
          >
            <MaterialIcons 
              name={button.icon} 
              size={30} 
              color={selectedIndex === button.id ? '#005AEE' : '#ffffff'}
              style={styles.icon}
            />
            <Text style={[styles.buttonText, selectedIndex === button.id && styles.selectedButtonText]}>
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#005AEE',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  icon: {
    marginRight: 10,
  },
});
