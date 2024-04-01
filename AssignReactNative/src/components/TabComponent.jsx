import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import CardCarousel from './CarouselCard';
const MyComponent = ({data}) => {
  const [activeValue, setActiveValue] = useState('value1'); // Initial state

  const assignData = data.filter(item => item.Type.category === 'restaurant');
  const assignData2 = data.filter(item => item.Type.category === 'cooking');

  const handleSwitch = newValue => {
    setActiveValue(newValue);
  };


  return (
    <View style={{marginTop: -20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 10,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderColor: 'white',
            borderBlockEndColor: activeValue === 'value1' ? 'black' : '#fff',

            borderWidth: 5,
            backgroundColor: 'white',
            padding: 20,
            width: '50%',
            margin: 10,
            borderBottomColor: 'black', // Consistent border for both buttons
          }}
          onPress={() => handleSwitch('value1')}>
          <Text style={{color: 'black', fontSize: 18}}>Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderColor: 'white',
            borderBlockEndColor: activeValue === 'value2' ? 'black' : 'white',

            borderWidth: 5,
            backgroundColor: 'white',
            padding: 20,
            width: '50%',
            margin: 10,

            // Consistent border for both buttons
          }}
          onPress={() => handleSwitch('value2')}>
          <Text style={{color: 'black', fontSize: 18}}>Cooking</Text>
        </TouchableOpacity>
      </View>
      <View  style={{ marginTop: -30}}>
        {activeValue === 'value1' && <CardCarousel data={assignData} />}
        {activeValue === 'value2' && <CardCarousel data={assignData2} />}
      </View>

      {/* Static content below (optional) */}
    </View>
  );
};

export default MyComponent;
