import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Platform, View } from 'react-native';

export default function Banco() {

  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
  ]

  return (
    <View style={{flexDirection: "column"}}>
      <View style={{ height: "65%", flexDirection: "column"}}>
        <MapView style={styles.map} />
      </View>
      <View style={{ height: "35%", flexDirection: "column"}}>
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
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
