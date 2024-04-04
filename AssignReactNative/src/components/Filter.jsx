import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';
import {
  updateCruisine,
  updateDiet,
  updateProtien,
} from '../Redux/filterSlice';

const Filter = () => {
  const [selectedDiet, setSelectedDiet] = useState(null); // Initially no selection
  const [selectedCuisine, setSelectedCuisine] = useState(null); // Initially no selection
  const [selectedProtein, setSelectedProtein] = useState(null); // Initially no selection

  const navigation = useNavigation();

  const handleDietSelect = diet => {
    setSelectedDiet(diet);
    setSelectedCuisine(null); // Reset cuisine if diet changes
    setSelectedProtein(null); // Reset protein if diet changes
  };

  const handleCuisineSelect = cuisine => {
    setSelectedCuisine(cuisine);
  };

  const handleProteinSelect = protein => {
    setSelectedProtein(protein);
  };

  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    const diet = selectedDiet;
    const cruisine = selectedCuisine;
    const protein = selectedProtein;

    // console.log(diet, '--------------------filters-----------------');
    // console.log(cruisine, '--------------------filters-----------------');
    // console.log(protein, '--------------------filters-----------------');

    dispatch(updateDiet(diet));
    dispatch(updateCruisine(cruisine));
    dispatch(updateProtien(protein));

    navigation.navigate('Product');
  };

  const handleCancel = () => {
    setSelectedDiet(null);
    setSelectedCuisine(null);
    setSelectedProtein(null);

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filters</Text>
      <View style={styles.separator} />

      {/* Diet Section */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <View style={{}}>
          <View>
            <View>
              <Text style={styles.subheading}>Diet</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedDiet === 'Vegetarian' && styles.selectedButton,
                  ]}
                  onPress={() => handleDietSelect('Vegetarian')}
                >
                  <Text style={styles.buttonText}>Vegetarian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedDiet === 'Non-Vegetarian' && styles.selectedButton,
                  ]}
                  onPress={() => handleDietSelect('Non-Vegetarian')}
                >
                  <Text style={styles.buttonText}>Non Vegetarian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedDiet === 'Vegan' && styles.selectedButton,
                  ]}
                  onPress={() => handleDietSelect('Vegan')}
                >
                  <Text style={styles.buttonText}>Vegan</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cuisines Section */}
            <View>
              <Text style={styles.subheading}>Cuisines</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedCuisine === 'Indian' && styles.selectedButton,
                  ]}
                  onPress={() => handleCuisineSelect('Indian')}
                >
                  <Text style={styles.buttonText}>Indian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedCuisine === 'Italian' && styles.selectedButton,
                  ]}
                  onPress={() => handleCuisineSelect('Italian')}
                >
                  <Text style={styles.buttonText}>Italian</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Proteins Section */}
          <View style={{ marginTop: 100 }}>
            <Text style={styles.subheading}>Proteins</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedProtein === 'Animal' && styles.selectedButton,
                ]}
                onPress={() => handleProteinSelect('Animal')}
              >
                <Text style={styles.buttonText}>Animal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedProtein === 'Plant' && styles.selectedButton,
                ]}
                onPress={() => handleProteinSelect('Plant')}
              >
                <Text style={styles.buttonText}>Plant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Buttons */}

        <View
          style={{
            marginTop: 150,
            marginBottom: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#fdfdfd',
    padding: 3,
    // paddingHorizontal: 10,

    flex: 1,
    marginRight: 6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#a1a1b7',
  },
  buttonText: {
    color: '#050404',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#565454',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 20,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#122C3E',
    padding: 10,
    width: 220,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Filter;
