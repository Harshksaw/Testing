import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import ProductScreen from '../ProductScreen';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleSearchChange = () => {
    console.log(searchText);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="search" size={25} color="#837474" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Search..."
        placeholderTextColor="#ccc"
        onChangeText={handleSearchChange}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Filter')}
      >
        <Icon name="filter" size={25} color="#040303" />
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
