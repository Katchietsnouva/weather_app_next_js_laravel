"use client";

import { useState } from "react";
import Head from "next/head";
import SearchBar from "./components/SearchBar";
import { WeatherSidebar } from "./components/WeatherSidebar";
import { WeatherCard } from "./components/WeatherCard";
import { WindHumidity } from "./components/WindHumidity";
import { SkeletonLoader } from "./components/SkeletonLoader";
import TemperatureSwitcher from "./components/TemperatureSwitcher";

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
      if (!res.ok) throw new Error("Network Error or server Error or area not located in the data");
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
      .map(([, values]) => values[4]);
  };

  const forecastCards = getNext3Days();

  const convertTemp = (tempC: number) => (unit === "C" ? tempC : (tempC * 9) / 5 + 32);

  const convertWindSpeed = (speedMs: number) => (speedMs * 3.6).toFixed(1);

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
        <WeatherSidebar weather={weather} unit={unit} convertTemp={convertTemp} />

        <section className="flex-1 flex flex-col justify-between space-y-8 min-h-[85vh]">

          <div className="flex flex-wrap w-full justify-between gap-4 items-center">
            <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
            <TemperatureSwitcher unit={unit} setUnit={setUnit} />
          </div>
          {!current && (<SkeletonLoader />)}

          {loading && <p className="text-xl text-blue-400">Loading...</p>}
          {error && <p className="text-xl text-red-400">{error}</p>}

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

