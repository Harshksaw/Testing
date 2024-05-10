import React from 'react';
import {View} from 'react-native';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

const Waveform = ({wave, style, wavestyle}) => {
  const maxValue = 47; // Set the maximum value (consider -50 to -160 as 0)

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: moderateScale(242.89),
          height: moderateScale(60),
        }}>
        {wave &&
          wave?.map((value, index) => {
            const height = Math.max(1, Math.abs(value + maxValue)); // Calculate the height based on the value
            return (
              <View
                key={index}
                style={{
                  ...wavestyle,
                  width: moderateScale(2.5), // Width of the vertical line
                  height: verticalScale(height * 1), // Height based on the value

                  marginHorizontal: moderateScale(0.5),
                }}
              />
            );
          })}
      </View>
    </View>
  );
};

export default Waveform;
