import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function HomeScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 1) {
      navigation.navigate('Rotas Preferidas');
    } 
    if (index === 4){
        navigation.navigate('Escola');
    }
  };

  const buttons = [
    { id: 1, label: 'Rotas Preferidas', icon: 'star' },
    { id: 2, label: 'Banco', icon: 'credit-card' },
    { id: 3, label: 'Clínica Médica', icon: 'local-hospital' },
    { id: 4, label: 'Escola', icon: 'school' },
    { id: 5, label: 'Farmácia', icon: 'local-pharmacy' },
    { id: 6, label: 'Mercearia', icon: 'shopping-cart' },

  ];

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar…"
          placeholderTextColor="#000"
        />
      </View>

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

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005AEE',
    padding: 10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#80c9ff',
    borderRadius: 5,
    marginVertical: 10,
    height: 65,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0044cc',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#ffffff',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  selectedButtonText: {
    color: '#005AEE',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
});
