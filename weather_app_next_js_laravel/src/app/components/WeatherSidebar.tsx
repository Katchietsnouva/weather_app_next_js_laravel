
import Image from "next/image";
import { SkeletonLoader } from "./SkeletonLoader";

interface WeatherEntry {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
}

interface WeatherData {
    city: { name: string; country: string };
    list: WeatherEntry[];
}

interface WeatherSidebarProps {
    weather: unknown;
    unit: "C" | "F";
    convertTemp: (tempC: number) => number;
}

function isWeatherData(weather: unknown): weather is WeatherData {
    return (
        typeof weather === "object" &&
        weather !== null &&
        "city" in weather &&
        "list" in weather &&
        Array.isArray((weather as WeatherData).list)
    );
}

export const WeatherSidebar = ({ weather, unit, convertTemp }: WeatherSidebarProps) => {
    if (!isWeatherData(weather)) {
        return <SkeletonLoader />;
    }

    const current = weather.list[0]; 

    return (
        <aside className="md:w-1/4 bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col justify-between items-center">
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
                <p className="text-gray-400">{new Date(current.dt_txt).toDateString()}</p>
                <p className="font-semibold text-2xl mt-2">{weather.city.name}</p>
            </div>
        </aside>
    );
};
