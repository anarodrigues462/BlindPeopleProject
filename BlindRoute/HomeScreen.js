import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function HomeScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 1) {
      navigation.navigate('Details');
    }
  };

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

      <TouchableOpacity
        style={[styles.button, selectedIndex === 1 && styles.selectedButton]}
        onPress={() => handleListItemClick(1)}
      >
        <MaterialIcons 
          name="star" 
          size={30} 
          color={selectedIndex === 1 ? '#005AEE' : '#ffffff'}
          style={styles.icon}
        />
        <Text style={[styles.buttonText, selectedIndex === 1 && styles.selectedButtonText]}>
          Rotas Preferidas
        </Text>
      </TouchableOpacity>

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
