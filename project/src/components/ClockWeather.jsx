import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow } from 'lucide-react';

const WEATHER_ICONS = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
  default: Cloud
};

export function ClockWeather() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: null, condition: 'Clear' });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // For demo purposes, set mock weather data
    setWeather({
      temp: 22,
      condition: 'Clear'
    });

    return () => clearInterval(timer);
  }, []);

  const WeatherIcon = WEATHER_ICONS[weather.condition] || WEATHER_ICONS.default;

  return (
    <div className="absolute top-8 left-8 z-20">
      <div className="bg-[#FF6B6B]/30 backdrop-blur-md rounded-2xl p-6 border border-[#FF6B6B]/40 shadow-lg shadow-[#FF6B6B]/20">
        <div className="text-4xl font-light mb-4 text-white tracking-wider">
          {format(time, 'HH:mm:ss', { locale: ja })}
        </div>
        <div className="flex items-center gap-3 text-[#FFE5E5]">
          <WeatherIcon className="w-7 h-7" />
          <span className="text-2xl font-light">{weather.temp}°C</span>
        </div>
      </div>
    </div>
  );
}