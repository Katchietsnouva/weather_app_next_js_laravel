import Image from "next/image";
interface WeatherEntry {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
}

interface WeatherCardProps {
    entry: unknown; 
    unit: "C" | "F";
    convertTemp: (tempC: number) => number;
}
function isWeatherEntry(entry: unknown): entry is WeatherEntry {
    return (
        typeof entry === "object" &&
        entry !== null &&
        "dt_txt" in entry &&
        "main" in entry &&
        "weather" in entry &&
        "wind" in entry
    );
}

export const WeatherCard = ({ entry, unit, convertTemp }: WeatherCardProps) => {
    if (!isWeatherEntry(entry)) {
        return <div className="text-red-400">Invalid weather data</div>;
    }

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-2 text-center hover:bg-gray-700 transition-all">
            <p className="text-xl font-semibold mb-3">{new Date(entry.dt_txt).toDateString()}</p>
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
    );
};
