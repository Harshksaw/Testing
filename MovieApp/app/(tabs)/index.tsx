import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { fetchTopRatedMovies } from '../api/movie';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [movies, setMovies] = useState([]);
  const [loading ,setloading] = useState(false);

useEffect(()=>{
  const fetchMovies = async () => { 

    try {
      setloading(true);
      const moviesdata = await fetchTopRatedMovies();
      setMovies(moviesdata);
      setloading(false);
      
    } catch (error) {
      
    }
   
  }

fetchMovies();

},[])

  if (loading) {
    return <ActivityIndicator />;
  }

  // if (error) {
  //   return <Text>{error.message}</Text>;
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => <Text>{item?.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});