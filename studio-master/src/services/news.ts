"use client";

import { Weather, getCurrentWeather } from '@/services/weather';
import { useEffect, useState } from 'react';
import { Icons } from "@/components/icons";
import { motion } from 'framer-motion';

interface Location {
  lat: number;
  lng: number;
}

async function getWeatherData(location: Location): Promise<Weather> {
  try {
    return await getCurrentWeather(location);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return {
      temperature: 0,
      condition: 'Unknown',
      temperatureHigh: 0,
      temperatureLow: 0,
      icon: ''
    };
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WeatherPage() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  useEffect(() => {
    const userLocation: Location = {
      lat: 40.7128,
      lng: -74.0060,
    };

    getWeatherData(userLocation)
      .then(weatherData => {
        setWeather(weatherData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Weather Insights</h1>
        <p className="text-sm md:text-base text-muted-foreground">Current and future weather conditions for your location.</p>
      </header>

      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col space-y-4">
          {weather ? (
            <>
              <motion.div variants={fadeIn} className="flex items-center">
                <Icons.sun className="mr-2 h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Conditions:</span> {weather.condition}
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Icons.thermometer className="mr-2 h-5 w-5 text-red-500" />
                <span className="font-semibold">Temperature:</span> {weather.temperature}°C
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Icons.arrowUp className="mr-2 h-5 w-5 text-green-500" />
                <span className="font-semibold">High:</span> {weather.temperatureHigh}°C
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Icons.arrowDown className="mr-2 h-5 w-5 text-blue-500" />
                <span className="font-semibold">Low:</span> {weather.temperatureLow}°C
              </motion.div>
            </>
          ) : (
            <p className="text-center lead text-muted-foreground">Loading weather data...</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
