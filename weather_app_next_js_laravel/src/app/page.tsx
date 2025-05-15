"use client";

import { useState } from "react";
import Head from "next/head";
import SearchBar from "./components/SearchBar";
import TemperatureSwitcher from "./components/TemperatureSwitcher";
import Image from "next/image";
import { FaChevronUp as Arrow } from "react-icons/fa";

interface ForecastEntry {
  dt_txt: string;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number; deg: number };
}

interface ForecastWeatherData {
  city: { name: string; country: string };
  list: ForecastEntry[];
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<ForecastWeatherData | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);
      if (!res.ok) throw new Error("Network Error or server Error");
      const data = await res.json();
      setWeather(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
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
      .map(([_, values]) => values[4]);
  };

  const forecastCards = getNext3Days();

  const convertTemp = (tempC: number) => (unit === "C" ? tempC : (tempC * 9) / 5 + 32);

  const convertWindSpeed = (speedMs: number) => (speedMs * 3.6).toFixed(1); // km/h

  const getCardinalDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((deg + 22.5) / 45) % 8;
    return directions[index];
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
              <div className="flex flex-col items-center">
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
                <p className="text-gray-400">
                  {new Date(current.dt_txt).toDateString()}
                </p>
                <p className="font-semibold text-2xl mt-2">
                  {weather?.city.name}
                </p>
              </div>
            </>
          )}
        </aside>

        {/* Main Section */}
        <section className="flex-1 flex flex-col justify-between space-y-8 min-h-[85vh]">
          {/* Search and Unit Switcher */}
          <div className="flex flex-wrap w-full justify-between gap-4 items-center">
            <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
            <TemperatureSwitcher unit={unit} setUnit={setUnit} />
          </div>

          {loading && <p className="text-xl text-blue-400">Loading...</p>}
          {error && <p className="text-xl text-red-400">{error}</p>}

          {/* Next 3 Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full ">
            {forecastCards.map((entry, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-2xl shadow-lg p-2 text-center hover:bg-gray-700 transition-all "
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
                <p className="text-3xl font-bold my-10">
                  {convertTemp(entry.main.temp).toFixed(1)}°{unit}
                </p>
              </div>
            ))}
          </div>

          {/* Wind and Humidity */}
          {current && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full my-0">
              {/* Wind */}
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all flex flex-col justify-between">
                <h3 className="text-2xl font-semibold my-10">Wind Speed</h3>
                <p className="text-5xl font-bold my-10">
                  {convertWindSpeed(current.wind.speed)} km/h
                </p>
                <div className="flex justify-center items-center mt-auto ">
                  <div
                    className="flex justify-center items-center "
                    style={{
                      transform: `rotate(${current.wind.deg}deg)`,
                      fontSize: "2rem",
                    }}
                    title={`Wind Direction: ${current.wind.deg}°`}
                  >
                    <Arrow className="text-white rounded-full border-4 p-2 text-5xl" />
                  </div>
                  <p className="ml-2 text-white my-10">
                    {current.wind.deg}° {getCardinalDirection(current.wind.deg)}
                  </p>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all flex flex-col justify-between">
                <h3 className="text-2xl font-semibold my-10">Humidity</h3>
                <p className="text-5xl font-bold my-10">
                  {current.main.humidity}%
                </p>
                <div className="relative w-full bg-gray-600 rounded-full h-10 mt-auto my-10">
                  <div
                    className="bg-blue-400 h-10 rounded-full transition-all"
                    style={{ width: `${current.main.humidity}%` }}
                  ></div>
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
// sdf
