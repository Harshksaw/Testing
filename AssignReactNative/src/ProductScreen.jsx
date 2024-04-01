
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from '../assets/data';
import {useNavigation} from '@react-navigation/native';
import Card from './components/card';

const ProductScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Satisfy your craving
        </Text>
      </View>

      <Card data={data} />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: 'relative',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
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
