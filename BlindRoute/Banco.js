import React, { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { TouchableOpacity, StyleSheet, Platform, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';

const Banco = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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

  const getMyLocation = () => {
    Geolocation.getCurrentPosition((loc) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  };

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "65%", flexDirection: "column" }}>
        <MapView 
          style={{ ...StyleSheet.absoluteFillObject }} 
          provider="google"
          onMapReady={getMyLocation}
          ref={mapRef}
          initialRegion={{
            latitude: 6.8523,
            longitude: 79.8895,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <View style={{ height: "35%", backgroundColor: "#005AEE", flexDirection: "column" }}>
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
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  selectedButton: {
    backgroundColor: '#ffffff',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#005AEE',
  },
});

export default Banco;
