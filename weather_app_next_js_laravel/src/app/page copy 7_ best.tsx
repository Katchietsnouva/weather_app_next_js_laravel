"use client"

import { useState } from 'react';
import Head from 'next/head';
import SearchBar from './components/SearchBar';
import TemperatureSwitcher from './components/TemperatureSwitcher';
import Image from 'next/image';
import { FaChevronUp as Arrow } from 'react-icons/fa';  // Import the icon

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number; };
  weather: { description: string; icon: string; }[];
  wind: { speed: number; };
}


interface ForecastEntry {
  dt_txt: string;
  main: { temp: number; humidity: number; };
  weather: { description: string; icon: string; }[];
  // wind: { speed: number; };
  wind: { speed: number; deg: number };  // Added deg here

}

interface ForecastWeatherData {
  city: { name: string; country: string; };
  list: ForecastEntry[];
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<ForecastWeatherData | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);
      if (!res.ok) throw new Error('Network Error or server Error');
      const data = await res.json();
      setWeather(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const current = weather?.list?.[0];

  const getNext3Days = () => {
    const days: Record<string, ForecastEntry[]> = {};
    weather?.list?.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!days[date]) days[date] = [];
      days[date].push(entry);
    });

    const today = new Date().toISOString().split("T")[0];
    return Object.entries(days)
      .filter(([date]) => date !== today)
      .slice(0, 3)
      .map(([_, values]) => values[4]); // midday forecast
  };

  const forecastCards = getNext3Days();

  // Convert wind degrees to cardinal direction
  const getCardinalDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((deg + 22.5) / 45) % 8; // Normalize and map the degrees
    return directions[index];
  };

  const convertTemp = (tempC: number) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };
  
  const convertWindSpeed = (speedMs: number) => {
    return (speedMs * 3.6).toFixed(1); // returns string like "12.6"
  };
  
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>

      <main className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col justify-between items-center">
          {current && (
            <>
              <div className=' flex flex-col items-center '>
                <Image
                  src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                  alt="Weather Icon"
                  width={400}
                  height={400}
                />

                <h2 className="text-5xl font-extrabold mt-4">
                {convertTemp(current.main.temp).toFixed(1)}°{unit}
                </h2>
                <p className="text-xl capitalize font-bold text-gray-300 mt-2">
                  {current.weather[0].description}
                </p>
              </div>

              <div className="text-center text-lg mt-8">
                <p className="text-gray-400">{new Date(current.dt_txt).toDateString()}</p>
                <p className="font-semibold text-2xl mt-2">{weather?.city.name}</p>
              </div>
            </>
          )}
        </aside>

        {/* Main Section */}
        <section className="flex-1 flex flex-col items-center justify-start space-y-8">
          {/* <h1 className="text-5xl font-bold">Weather App</h1> */}

          <div className="flex flex-wrap w-12/12 justify-between gap-4 items-center ">
            <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
            <TemperatureSwitcher unit={unit} setUnit={setUnit} />
          </div>

          {loading && <p className="text-xl text-blue-400">Loading...</p>}
          {error && <p className="text-xl text-red-400">{error}</p>}

          {/* Next 3 Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {forecastCards.map((entry, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-2xl shadow-lg p-2 text-center hover:bg-gray-700 transition-all"
              >
                <p className="text-xl font-semibold mb-3">
                  {new Date(entry.dt_txt).toDateString()}
                </p>
                <Image
                src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@4x.png`}
                alt="Weather Icon"
                width={300}
                height={300}
                className="mx-auto"
              />
                <p className="text-3xl font-bold mt-3">
                  {convertTemp(entry.main.temp).toFixed(1)}°{unit}
                </p>
              </div>
            ))}
          </div>

          {/* Wind and Humidity */}
          {/* {current && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all">
                <h3 className="text-2xl font-semibold mb-2">Wind Speed</h3>
                <p className="text-3xl">{current.wind.speed} m/s</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all">
                <h3 className="text-2xl font-semibold mb-2">Humidity</h3>
                <p className="text-3xl">{current.main.humidity}%</p>
              </div>
            </div>
          )} */}
          
          {/* Wind and Humidity */}
{current && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
  
{/* Wind Speed Card */}
<div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all flex flex-col justify-between">
  <h3 className="text-2xl font-semibold mb-4">Wind Speed</h3>
  
  <p className="text-5xl font-bold mb-6">{convertWindSpeed(current.wind.speed)} km/h</p>


  {/* Wind Direction Arrow with React Icon */}
  <div className="flex justify-center items-center mt-auto">
    <div
      className="flex justify-center items-center"
      style={{
        transform: `rotate(${current.wind.deg}deg)`, // Rotate the icon based on wind direction
        fontSize: '2rem', // Set size of the arrow
      }}
      title={`Wind Direction: ${current.wind.deg}°`}
    >
      <Arrow className="text-white  rounded-full border-4 p-2 text-5xl"  />
    </div>
    <p className="ml-2 text-white">{current.wind.deg}° {getCardinalDirection(current.wind.deg)}</p>

    {/* <p className="ml-2 text-white">Wind Direction: {current.wind.deg}°</p> */}
  </div>
</div>



    {/* Humidity Card */}
  <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all flex flex-col justify-between">
    <h3 className="text-2xl font-semibold mb-4">Humidity</h3>
    
    <p className="text-5xl font-bold mb-6">{current.main.humidity}%</p>

    {/* Progress Bar */}
    <div className="relative w-full bg-gray-600 rounded-full h-4 mt-auto">
      <div
        className="bg-blue-400 h-4 rounded-full transition-all"
        style={{ width: `${current.main.humidity}%` }}
      ></div>

      {/* Progress Bar Markings */}
      {/* <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400"> */}
      <div className="w-full flex justify-between text-md text-gray-400 px-1 py-1">

        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  </div>


  </div>
)}

        </section>
      </main>
    </>
  );
}








// export default function Home() {
//   const [city, setCity] = useState('');
//   const [unit, setUnit] = useState<'C' | 'F'>('C');
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async (e: React.FormEvent) => {
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
//     } catch (err: unknown) {
//       // setError(err.message);
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unexpected error occurred');
//       }
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
//         <div className="flex items-center mb-6">
//           <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
//           <TemperatureSwitcher unit={unit} setUnit={setUnit} />
//         </div>
//         {loading && <p className="text-lg">Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {weather && <WeatherCard data={weather} unit={unit} />}
//       </main>
//     </>
//   );
// }








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



