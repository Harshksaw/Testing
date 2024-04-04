import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SearchBar from '../components/Searchbar';
import { data } from '../../assets/data';
import CardCarousel from '../components/CarouselCard';
import MyTabs from '../components/TabComponent';
import MyComponent from '../components/TabComponent';

console.log(data);
const HomeScreen = () => {
  const handleSearchChange = text => {
    console.log(text);
  };
  const handleFilterPress = () => {
    console.log('Filter button pressed');
  };

  return (
    <View style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 0 , color:'black' }}>
        Good Morning
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 , textDecorationLine:'underline', color:'orange'}}>
        Mr Joe!
      </Text>

      <SearchBar />
      {/* 
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <CardCarousel data={data}/>
        </View> */}

      <MyComponent data={data} />
    </View>
  );
};

export default HomeScreen;
