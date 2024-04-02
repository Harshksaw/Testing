
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
import { useSelector } from 'react-redux';

const ProductScreen = () => {
  const navigation = useNavigation();

    const diet = useSelector(state => state.filter.diet);
    const cruisine = useSelector(state => state.filter.cruisine);
    const protien = useSelector(state => state.filter.protien);

    console.log(diet, "filter product diet");
    console.log(cruisine, "filter product diet");
    console.log(protien, "filter product diet");

  return (
    <View style={{ flex: 1,marginBottom: 30}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
  }
 
});
