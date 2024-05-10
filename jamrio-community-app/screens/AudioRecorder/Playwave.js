import React from 'react';
import {View} from 'react-native';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Playwave = ({wave}) => {
  const maxValue = 47; // Set the maximum value (consider -50 to -160 as 0)

  return (
    <View style={{position: 'absolute', top: responsiveWidth(-2)}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: moderateScale(242.89),
          height: moderateScale(60),
        }}>
        {wave.map((value, index) => {
          const height = Math.max(1, Math.abs(value + maxValue)); // Calculate the height based on the value
          return (
            <View
              key={index}
              style={{
                width: moderateScale(2.5), // Width of the vertical line
                height: verticalScale(height * 1), // Height based on the value
                backgroundColor: 'white',
                marginHorizontal: moderateScale(0.5),
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Playwave;
