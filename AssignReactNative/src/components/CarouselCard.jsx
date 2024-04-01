import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/Octicons';

const CardCarousel = ({data}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={item.ImageUrl} style={styles.cardImage} />

      <View style={styles.cardOverlay}>

        <View>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Icon name="bookmark" size={20} color="black" />
            </View>
            <View style={styles.iconWrapper}>
              <Icona name="heart-fill" size={20} color="black" />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.cardTitle}>{item.Dish}</Text>
        <Text style={styles.cardDetail}>{item.RestaurantName}</Text>
        </View>
      </View>

    </View>
  );
  return (
    <View style={{marginBottom: 50, marginRight: 0}}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={400} // Adjust width as needed
        itemWidth={200} // Adjust item width as needed (slightly smaller than slider width)
        inactiveSlideScale={1} // Scale down inactive slides slightly
        inactiveSlideOpacity={0.9} // Adjust opacity of inactive slides
        layout={'default'} // Use default layout for horizontal scrolling
      />
    </View>
  );
};

export default CardCarousel;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 250,
    marginLeft: -100,
    // padding: 10,
    // aspectRatio: 1, // Maintain square aspect ratio
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#ccc',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 50,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconWrapper: {
    borderRadius: 20,
    width: 30,
    height: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#f7efef',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  cardDetail: {
    color: '#f1d6d6',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
