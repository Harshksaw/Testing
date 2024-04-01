
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
  }
 
});
