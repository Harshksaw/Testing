import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://open-weather13.p.rapidapi.com/city/landon',
  headers: {
    'X-RapidAPI-Key': '74cdc25188mshd1d79e7973a5c5dp1a424cjsnf6bdfb4d0da1',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
};

export const fetchDataFromApi = async()=>{
   
 


    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}