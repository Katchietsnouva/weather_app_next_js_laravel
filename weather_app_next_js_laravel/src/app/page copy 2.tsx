'use client';

import { useState } from 'react';

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
};

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);

      if (!res.ok) throw new Error('Server Error');
      const data = await res.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Checker 🌤️</h1>
      
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="input input-bordered w-full max-w-xs mb-4"
      />
      
      <button onClick={fetchWeather} className="btn btn-primary mb-6">Get Weather</button>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="text-center bg-white rounded-lg shadow p-4 w-full max-w-sm">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
          <p className="text-lg font-medium">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}




// export default async function Home() {



//   type Data = {
//     message: string;
//     description: string;
//   };

//   // const response = await fetch("http://127.0.0.1:8000/hi");
  
//   // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hi`);
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hi`, {
//     cache: 'no-store', // optional: prevents caching during dev
//   });
//   const data: Data = await response.json();

//   return (
//     // <div className="flex flex-col items-center justify-center h-screen">
//     //   <p>Hi bro</p>
//     // </div>

//     <>
//       <div className="flex flex-col items-center justify-center h-screen">

//         <h1>Retrieving from the Server</h1>
//         <p>{data.message}</p>
//         <p>{data.description}</p>
//       </div>    </>
//   );
// }



