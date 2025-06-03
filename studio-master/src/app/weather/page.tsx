"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Icons } from "@/components/icons";
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface WeatherForecast {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WeatherPage() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [location, setLocation] = useState('Delhi');
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        console.error('Weather API key is missing. Please set OPENWEATHER_API_KEY in your .env file.');
        toast({
            variant: "destructive",
            title: "API Key Missing",
            description: "Please set OPENWEATHER_API_KEY in your .env file."
        });
        return;
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          toast({
            variant: "destructive",
            title: "Weather Fetch Error",
            description: `Could not fetch weather data for ${location}. Status: ${response.status}`
          });
          setForecasts([]);
          return;
        }

        const data = await response.json();
        const dailyData = data.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 3);

        const formattedForecasts = dailyData.map((item: any) => ({
          date: format(new Date(item.dt * 1000), 'MMMM dd'),
          temperature: item.main.temp,
          condition: item.weather[0].description,
          icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`
        }));

        setForecasts(formattedForecasts);
      } catch (error) {
        console.error('Could not fetch weather data:', error);
          toast({
            variant: "destructive",
            title: "Weather Fetch Error",
            description: "Failed to fetch weather data. Please try again."
          });
        setForecasts([]);
      }
    };

    fetchWeatherData();
  }, [location, toast]);

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">3-Day Weather Forecast</h1>
        <p className="text-sm md:text-base text-muted-foreground">Weather conditions for the next three days.</p>
        <form className="flex justify-center mt-4">
          <Input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full max-w-xs rounded-md"
          />
        </form>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecasts && forecasts.length > 0 ? (
          forecasts.map((forecast, index) => (
            <motion.div key={index} className="card bg-base-100 shadow-xl" variants={fadeIn}>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{forecast.date}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <img src={forecast.icon} alt="Weather Icon" className="w-12 h-12 mr-2" />
                    <p className="text-lg">{forecast.condition}</p>
                  </div>
                  <p className="text-muted-foreground">Temperature: {forecast.temperature}°C</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No forecast data available.</p>
        )}
      </div>
    </motion.div>
  );
}
