import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SearchBar from './components/Searchbar';
import { data } from '../assets/data';
import CardCarousel from './components/CarouselCard';



const HomeScreen = () => {
  const handleSearchChange = (text) => {
    console.log(text);
  };
  const handleFilterPress = () => {
    console.log('Filter button pressed');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'medium', marginBottom: 0 }}>Good Morning</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Mr Joe!</Text>

      
      



    <SearchBar/>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <CardCarousel data={data}/>
        </View>

  </View>
  );
}


export default HomeScreen;
