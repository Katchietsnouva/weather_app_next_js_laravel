// components/WindHumidity.tsx
import { FaChevronUp as Arrow } from "react-icons/fa";

interface WeatherEntry {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
}

interface WindHumidityProps {
    current: WeatherEntry; 
    convertWindSpeed: (speedMs: number) => string;
    getCardinalDirection: (deg: number) => string;
}

export const WindHumidity = ({
    current,
    convertWindSpeed,
    getCardinalDirection,
}: WindHumidityProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full my-0">
            
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

            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition-all flex flex-col justify-between">
                <h3 className="text-2xl font-semibold my-10">Humidity</h3>
                <p className="text-5xl font-bold my-10">{current.main.humidity}%</p>
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
    );
};
