import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import styles from './styles';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Shimmernotification = () => {
  return (
    <View >
        <FlatList 
        data={[1,2,3,4]}

         renderItem={ ({item, index}) => {
        return (
        <View   style={[styles.entire, {marginVertical: 15}]}>
    <View style= {{flexDirection: 'row', alignItems:'center'}}>       

        <View >
          <ShimmerPlaceHolder  style={{width :50, height:50, borderRadius: 25}}
          shimmerColors={[colorsobject.grayishred, colorsobject.grey2, colorsobject.grayishred]}/>
        </View>
        <View style={{justifyContent:'space-between', height: 40, paddingHorizontal:16}}>
          <View>
          <ShimmerPlaceHolder style={{width :'120%'}} shimmerColors={[colorsobject.grayishred, colorsobject.grey2, colorsobject.grayishred]}/>
            </View>
            <View >
            <ShimmerPlaceHolder  style={{width :'100%'}}
            
            shimmerColors={[colorsobject.grayishred, colorsobject.grey2, colorsobject.grayishred]}/>
            </View>
            
        </View>
        

        </View>
        
        
      
    </View>
    
    )

    
    }}
    keyExtractor={(index) => index.toString()}

    />
    
          
         
         
          </View>
          
  )
}

export default Shimmernotification;

