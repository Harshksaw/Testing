import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/Octicons';

const card = ({ data }) => {

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: 35,
          left: 10,
          right: 0,

          borderRadius: 50,
          padding: 5,
          zIndex: 1,
        }}
      >
        <View
          style={{
            borderRadius: 20,
            width: 30,
            height: 25,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="bookmark" size={20} color="black" />
        </View>
        <View
          style={{
            borderRadius: 20,
            width: 30,
            height: 25,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icona name="heart-fill" size={20} color="black" />
        </View>
      </View>
      <Image source={item.ImageUrl} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.Dish}</Text>

      <Text style={styles.cardDetail}>{item.RestaurantName}</Text>
    </View>
  );
          if (data.length === 0) {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <Text style={{ color: 'red', fontSize: 18 }}>No available data</Text>
              </View>
            );
          }
  return (
    <View
      style={{
        marginBottom: 50,
        marginRight: 10,
      }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.Dish}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    position: 'relative',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  card: {
    width: '42%',

    marginBottom: 5,
    margin: 12,
    padding: 1,
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
    textShadowOffset: { width: -1, height: 1 },
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
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 7,
  },
});
