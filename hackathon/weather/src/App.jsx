import React from 'react';
import Weather from './components/weather';

function App() {
  return (
    <div className=' '>
      <div className='flex justify-center items-center'>
      <h2 className='text-2xl '>Welcome to My Weather App  </h2>
      </div>
        <Weather/>
    </div>
  );
}

export default App;
