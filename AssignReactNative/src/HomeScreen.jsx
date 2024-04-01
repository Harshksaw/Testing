import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';



const HomeScreen = () => {
  const handleSearchChange = (text) => {
    console.log(text);
  };
  const handleFilterPress = () => {
    console.log('Filter button pressed');
  }

  return (
    <View style={{ padding: 20 }}>
    <SearchBar

    />
  </View>
  );
}

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text) => {
    setSearchText(text);
    // Implement your search logic here based on searchText
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Feather name="search" size={20} color="#d83c3c" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Search..."
        placeholderTextColor="#ccc"
        onChangeText={handleSearchChange}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Feather name="filter" size={20} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
