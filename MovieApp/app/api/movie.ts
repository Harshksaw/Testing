
export const fetchTopRateMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZjODNmOGE2YjhhOTQwZWMzYTIwYjhlZDY5YThlNCIsInN1YiI6IjY1MmEyNTU4ZjI4ODM4MDJhMjVkYmJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pi_qIiipkYK8TUmC3Yz3tqHI0Dz-eRzXkuxwjCHjtlw'
    }
  };

  try {

    const res = await fetch(url, options)
    const json = await res.json();
    console.log('json', json)

  

    if(!res.ok){
      throw new Error('Error fetching movies')
    }
    return json.results;
  } catch (error) {
    console.log('error --------------------------____>>>>>>>----------_>>', error)
  }



}