import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Feather } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text) => {
    setSearchText(text);
    // Implement your search logic here based on searchText
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>

        <Icon name="search" size={25} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Search..."
        placeholderTextColor="#ccc"
        onChangeText={handleSearchChange}
      />

      <TouchableOpacity style={styles.iconContainer}>
    <Icon name="filter" size={25} color="#221e1e" />
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

export default SearchBar;
