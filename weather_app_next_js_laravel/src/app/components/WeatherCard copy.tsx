import React from 'react';

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

interface WeatherCardProps {
    data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const { name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="card bg-primary text-primary-content p-6 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{name}</h2>
                <img src={iconUrl} alt={weather[0].description} className="w-16 h-16" />
            </div>
            <p className="text-lg capitalize">{weather[0].description}</p>
            <div className="mt-4">
                <p>🌡️ Temperature: {main.temp}°C</p>
                <p>💧 Humidity: {main.humidity}%</p>
                <p>💨 Wind Speed: {wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherCard;
