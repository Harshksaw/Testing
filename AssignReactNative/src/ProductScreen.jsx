import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data } from '../assets/data';


const ProductScreen = () => {
  return (
    <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginTop:20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold', color: 'black' }}>Satisfy your craving</Text>
    </View>
    <View>

      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          {/* Render the card content */}
        </View>
      ))}
      

    </View>
    {/* Rest of your screen content */}
</View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})