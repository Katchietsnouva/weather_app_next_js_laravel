"use client"

import { useState } from 'react';
import Head from 'next/head';
import SearchBar from './components/SearchBar';
import TemperatureSwitcher from './components/TemperatureSwitcher';
import WeatherCard from './components/WeatherCard';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // const res = await fetch(`http://localhost:8000/api/weather?city=${city}`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);

      if (!res.ok) {
        throw new Error('City not found');
      }
      const data = await res.json();
      setWeather(data);
    } catch (err: unknown) {
      // setError(err.message);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather application using Next.js and Laravel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-base-200 flex flex-col items-center justify-start p-6">
        <h1 className="text-4xl font-bold mb-6">Weather App</h1>
        <div className="flex items-center mb-6">
          <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
          <TemperatureSwitcher unit={unit} setUnit={setUnit} />
        </div>
        {loading && <p className="text-lg">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {weather && <WeatherCard data={weather} unit={unit} />}
      </main>
    </>
  );
}








// "use client";

// import { useState } from 'react';
// import Head from 'next/head';
// import WeatherCard from './components/WeatherCard';
// // import WeatherCard from '@/components/WeatherCard';

// interface WeatherData {
//   name: string;
//   main: {
//     temp: number;
//     humidity: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
//   wind: {
//     speed: number;
//   };
// }

// export default function Home() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchWeather = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!city) return;

//     setLoading(true);
//     setError('');
//     setWeather(null);

//     try {
//       // const res = await fetch(`http://localhost:8000/api/weather?city=${city}`);
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);

//       if (!res.ok) {
//         throw new Error('City not found');
//       }
//       const data = await res.json();
//       setWeather(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Weather App</title>
//         <meta name="description" content="Weather application using Next.js and Laravel" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <main className="min-h-screen bg-base-200 flex flex-col items-center justify-start p-6">
//         <h1 className="text-4xl font-bold mb-6">Weather App</h1>
//         <form onSubmit={fetchWeather} className="w-full max-w-md mb-6">
//           <div className="form-control">
//             <input
//               type="text"
//               placeholder="Enter city name"
//               className="input input-bordered w-full"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary mt-4 w-full">
//             Get Weather
//           </button>
//         </form>
//         {loading && <p className="text-lg">Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {weather && <WeatherCard data={weather} />}
//       </main>
//     </>
//   );
// }


// 'use client';




// import { useState } from 'react';
// import {
//   WiDaySunny,
//   WiCloudy,
//   WiRain,
//   WiFog,
//   WiThunderstorm,
//   WiSnow,
// } from 'react-icons/wi';

// type WeatherData = {
//   name: string;
//   main: {
//     temp: number;
//     humidity: number;
//   };
//   weather: {
//     description: string;
//   }[];
// };

// export default function Home() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchWeather = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);

//       if (!res.ok) throw new Error('City not found or server error.');
//       const data = await res.json();
//       setWeather(data);
//       setError('');
//     } catch (err) {
//       setWeather(null);
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBackground = (description: string) => {
//     switch (description.toLowerCase()) {
//       case 'clear sky':
//         return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
//       case 'few clouds':
//       case 'scattered clouds':
//         return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
//       case 'rain':
//       case 'light rain':
//         return 'bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900';
//       case 'snow':
//         return 'bg-gradient-to-br from-gray-700 via-blue-900 to-gray-900';
//       default:
//         return 'bg-gradient-to-br from-gray-800 to-gray-900';
//     }
//   };

//   const getWeatherIcon = (description: string) => {
//     const desc = description.toLowerCase();
//     if (desc.includes('clear')) return <WiDaySunny size={60} className="text-yellow-300" />;
//     if (desc.includes('cloud')) return <WiCloudy size={60} className="text-gray-300" />;
//     if (desc.includes('rain')) return <WiRain size={60} className="text-blue-400" />;
//     if (desc.includes('fog')) return <WiFog size={60} className="text-gray-400" />;
//     if (desc.includes('snow')) return <WiSnow size={60} className="text-blue-200" />;
//     if (desc.includes('storm')) return <WiThunderstorm size={60} className="text-purple-400" />;
//     return <WiCloudy size={60} className="text-gray-300" />;
//   };

//   const bgClass = weather ? getBackground(weather.weather[0].description) : 'bg-gray-900';

//   return (
//     <div className={`min-h-screen flex flex-col items-center justify-center p-4 text-white ${bgClass} transition-all duration-500`}>
//       <h1 className="text-4xl font-bold mb-8 drop-shadow text-white">Weather Checker 🌤️</h1>

//       <div className="w-full max-w-md flex flex-col items-center">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//           className="w-full mb-4 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           onClick={fetchWeather}
//           className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Get Weather'}
//         </button>
//       </div>

//       {error && <p className="mt-4 text-red-400 font-semibold">{error}</p>}

//       {weather && (
//         <div className="mt-8 bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm text-center border border-gray-700">
//           <div className="flex justify-center mb-4">
//             {getWeatherIcon(weather.weather[0].description)}
//           </div>
//           <h2 className="text-2xl font-semibold text-white">{weather.name}</h2>
//           <p className="text-gray-300 capitalize">{weather.weather[0].description}</p>
//           <p className="text-lg font-bold mt-2 text-blue-400">{weather.main.temp}°C</p>
//           <p className="text-gray-400">Humidity: {weather.main.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// }






// 'use client';

// import { useState } from 'react';

// type WeatherData = {
//   name: string;
//   main: {
//     temp: number;
//     humidity: number;
//   };
//   weather: {
//     description: string;
//   }[];
// };

// export default function Home() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [error, setError] = useState('');

//   const fetchWeather = async () => {
//     try {
//       // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}`);
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);

//       if (!res.ok) throw new Error('Server Error');
//       const data = await res.json();
//       setWeather(data);
//       setError('');
//     } catch (err) {
//       setWeather(null);
//       setError((err as Error).message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Weather Checker 🌤️</h1>
      
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder="Enter city name"
//         className="input input-bordered w-full max-w-xs mb-4"
//       />
      
//       <button onClick={fetchWeather} className="btn btn-primary mb-6">Get Weather</button>

//       {error && <p className="text-red-500">{error}</p>}

//       {weather && (
//         <div className="text-center bg-white rounded-lg shadow p-4 w-full max-w-sm">
//           <h2 className="text-xl font-semibold">{weather.name}</h2>
//           <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
//           <p className="text-lg font-medium">{weather.main.temp}°C</p>
//           <p>Humidity: {weather.main.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// }








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



