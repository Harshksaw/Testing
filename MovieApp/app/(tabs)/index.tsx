import { Button, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
import { fetchTopRateMovies } from '../api/movie';

export default function TabOneScreen() {
  useEffect(()=>{

    const fetchMovies = async()=>{
      console.log('fetching movies');
      const startTime = Date.now();
      // Your existing code here
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log('Duration:', duration, 'ms');
      const movies = await fetchTopRateMovies()
      console.log('fetching movies', movies);
    }
   
    fetchMovies();

  },[])
  
  return (
    <View style={styles.container}>
        <Pressable onPress={ ()=> console.log('sdd') }>
          <Text>Fetch Movies</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
