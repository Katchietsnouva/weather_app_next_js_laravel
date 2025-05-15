"use client";

// Importing necessary dependencies
import { useState } from "react"; // React state hook
import Head from "next/head";
import SearchBar from "./components/SearchBar"; // Custom SearchBar component
import { WeatherSidebar } from "./components/WeatherSidebar"; // Custom WeatherSidebar component
import { WeatherCard } from "./components/WeatherCard"; // Custom WeatherCard component
import { WindHumidity } from "./components/WindHumidity"; // Custom WindHumidity component
import { SkeletonLoader } from "./components/SkeletonLoader"; // Skeleton loader for loading state
import TemperatureSwitcher from "./components/TemperatureSwitcher"; // Switch between Celsius and Fahrenheit

// Define types for weather forecast entry and the full forecast data structure
interface ForecastEntry {
  dt_txt: string; // Timestamp of the weather data
  main: { temp: number; humidity: number }; // Main weather data (temperature and humidity)
  weather: { description: string; icon: string }[]; // Weather description and icon data
  wind: { speed: number; deg: number }; // Wind speed and direction
}

interface ForecastWeatherData {
  city: { name: string; country: string }; // City name and country
  list: ForecastEntry[]; // List of weather forecast entries
}

export default function Home() {
  // React state hooks for city name, weather data, temperature unit, loading state, and errors
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState<ForecastWeatherData | null>(null); 
  const [unit, setUnit] = useState<"C" | "F">("C"); // Default to Celsius
  const [loading, setLoading] = useState(false); // Loading state to handle API request delays
  const [error, setError] = useState(""); // Error state to capture and display any errors

  // Handle the search form submission to fetch weather data based on the city
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submit behavior
    if (!city) return; // If city input is empty, do nothing
    setLoading(true); // Set loading to true while the API call is made
    setError(""); // Clear any previous error messages
    setWeather(null); // Clear previous weather data

    try {
      // Make an API request to get the weather data for the provided city
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);
      if (!res.ok) throw new Error("Network Error or server Error or area not located in the data");
      const data = await res.json(); // Parse the response as JSON
      setWeather(data); // Update the state with the fetched weather data
    } catch (err: unknown) {
      // Handle any errors that occur during the fetch
      if (err instanceof Error) setError(err.message); // If error is an instance of Error, use the error message
      else setError("An unexpected error occurred"); // Fallback error message
    } finally {
      setLoading(false); // Set loading to false when the API call finishes (either success or failure)
    }
  };

  // Get the current weather data (the first entry in the weather list)
  const current = weather?.list?.[0];

  // Get the forecast for the next 3 days
  const getNext3Days = () => {
    const days: Record<string, ForecastEntry[]> = {};
    weather?.list?.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0]; // Extract the date (first part of the timestamp)
      if (!days[date]) days[date] = [];
      days[date].push(entry); // Group entries by date
    });

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    return Object.entries(days)
      .filter(([date]) => date !== today) // Exclude today's weather
      .slice(0, 3) // Limit to the next 3 days
      .map(([, values]) => values[4]); // Get the forecast entry for each day (the 5th entry)
  };

  // Get the forecast cards for the next 3 days
  const forecastCards = getNext3Days();

  // Convert temperature from Celsius to Fahrenheit if needed
  const convertTemp = (tempC: number) => (unit === "C" ? tempC : (tempC * 9) / 5 + 32);

  // Convert wind speed from meters per second to kilometers per hour
  const convertWindSpeed = (speedMs: number) => (speedMs * 3.6).toFixed(1);

  // Convert wind direction from degrees to cardinal direction (N, NE, E, etc.)
  const getCardinalDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((deg + 22.5) / 45) % 8; // Calculate direction index based on degree
    return directions[index];
  };

  return (
    <>
      <Head>
        <title>Weather App</title> {/* Set the title of the page for SEO */}
      </Head>

      {/* Main layout of the weather app */}
      <main className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-8">
        {/* Weather Sidebar */}
        <WeatherSidebar weather={weather} unit={unit} convertTemp={convertTemp} />

        {/* Main section displaying the search bar, forecast, and wind/humidity data */}
        <section className="flex-1 flex flex-col justify-between space-y-8 min-h-[85vh]">
          
          {/* Search and Temperature Unit Switcher */}
          <div className="flex flex-wrap w-full justify-between gap-4 items-center">
            <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
            <TemperatureSwitcher unit={unit} setUnit={setUnit} />
          </div>

          {/* If no current weather data, show skeleton loader */}
          {!current && (<SkeletonLoader />)}

          {/* Show loading message while fetching data */}
          {loading && <p className="text-xl text-blue-400">Loading...</p>}
          
          {/* Show error message if an error occurred during the fetch */}
          {error && <p className="text-xl text-red-400">{error}</p>}

          {/* Display the weather forecast for the next 3 days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {forecastCards.map((entry, idx) => (
              <WeatherCard
                key={idx}
                entry={entry}
                unit={unit}
                convertTemp={convertTemp}
              />
            ))}
          </div>

          {/* Display wind and humidity data if available */}
          {current && (
            <WindHumidity
              current={current}
              convertWindSpeed={convertWindSpeed}
              getCardinalDirection={getCardinalDirection}
            />
          )}
        </section>
      </main>
    </>
  );
}
