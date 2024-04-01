import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const card = ({data}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={item.ImageUrl} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.Dish}</Text>

      <Text style={styles.cardDetail}>{item.RestaurantName}</Text>
    </View>
  );

  return (
    <View
      style={{
        marginBottom: 50,
        marginRight: 10,
      }}>
      <FlatList
        data={data} 
        renderItem={renderItem}
        keyExtractor={item => item.Dish} // Assuming unique 'id' property for each item
        numColumns={2} 
        contentContainerStyle={styles.gridContainer} // Apply grid styles to FlatList container
      />
    </View>
  );
};

export default card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: 'relative',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)'
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  card: {
    width: '42%',
    // backgroundColor: '#ba8d8d',
    marginBottom: 30,
    margin: 15,
    padding: 5,
    borderRadius: 20,
  },
  cardImage: {
    width: '110%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    color: '#f7efef',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginBottom: 20,
  },
  cardDetail: {
    position: 'absolute',
    bottom: 2,
    left: 15,
    color: '#f1d6d6',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginBottom: 7,
  },
});
