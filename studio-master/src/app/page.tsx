"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { Icons } from "@/components/icons";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Weather, getCurrentWeather } from '@/services/weather';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

interface Location {
  lat: number;
  lng: number;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
};

const DashboardPage = () => {
  const [location, setLocation] = useState('Delhi');
  const [weather, setWeather] = useState<Weather | null>(null);
  const news: NewsArticle[] = [
    { title: 'New Irrigation Techniques Boost Crop Yields', description: 'Innovative irrigation methods are showing promising results in increasing crop production.', url: '#' },
    { title: 'Government Announces New Subsidies for Farmers', description: 'The government has unveiled a new subsidy program to support farmers and promote sustainable agriculture.', url: '#' },
    { title: 'Drought-Resistant Crops Gaining Popularity', description: 'Farmers are increasingly adopting drought-resistant crops to combat water scarcity.', url: '#' }
  ];
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        console.error('Weather API key is missing. Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env file.');
        toast({
          variant: "destructive",
          title: "API Key Missing",
          description: "Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env file."
        });
        setWeather({ temperature: 0, condition: 'Please check your .env file', temperatureHigh: 0, temperatureLow: 0, icon: '' });
        return;
      }

      try {
        const userLocation: Location = {
          lat: 28.7041,
          lng: 77.1025,
        };

        const weatherData = await getCurrentWeather(userLocation);
        setWeather(weatherData);
      } catch (error: any) {
        console.error('Could not fetch weather data:', error);
        toast({
          variant: "destructive",
          title: "Weather Fetch Error",
          description: "Failed to fetch weather data. Please try again."
        });
        setWeather({ temperature: 0, condition: 'Could not fetch weather', temperatureHigh: 0, temperatureLow: 0, icon: '' });
      }
    };

    fetchWeatherData();
  }, [toast]);

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      {/* Hero Section */}
      <motion.header
        className="text-center mb-8 md:mb-10"
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-primary mb-2"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
        >
          Krishi Jyothi
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-muted-foreground"
        >
          Empowering you with essential agricultural insights.
        </motion.p>
      </motion.header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Direct Farmer-to-Consumer Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.store className="mr-2 h-5 w-5 text-primary" />
                Direct to Consumer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                Buy directly from farmers and eliminate the middleman.
              </CardDescription>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Explore Marketplace
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Crop Doc AI Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.leaf className="mr-2 h-5 w-5 text-primary" />
                Crop Doctor AI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                Diagnose crop diseases with AI. Upload an image to get started.
              </CardDescription>
              <Link
                href="/crop-diagnosis"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Diagnose Crop
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Crop Price Predictor Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.calculator className="mr-2 h-5 w-5 text-primary" />
                Crop Price Predictor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                Predict crop prices using our AI-driven estimator.
              </CardDescription>
              <Link
                href="/crop-price-estimator"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Estimate Price
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flash News Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.newspaper className="mr-2 h-5 w-5 text-primary" />
                Flash News
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                Latest agricultural news and updates.
              </CardDescription>
              <ul>
                {news.map((item, index) => (
                  <li key={index} className="mb-1">
                    <Link href={item.url} className="text-primary hover:underline">{item.title}</Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View All News
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather Module Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.cloud className="mr-2 h-5 w-5 text-primary" />
                Weather Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                {weather ? `Current weather: ${weather.condition}, ${weather.temperature}°C` : 'Loading weather...'}
              </CardDescription>
              {weather?.icon && (
                <img
                  src={weather.icon}
                  alt="Weather Icon"
                  className="inline-block h-6 w-6 mr-2"
                />
              )}
               <Link
                href="/weather"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Full Weather Details
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Forum Section */}
        <motion.div className="h-full" variants={cardVariants} whileHover="whileHover" initial="initial" animate="animate">
          <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 space-y-0 pb-2">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                <Icons.community className="mr-2 h-5 w-5 text-primary" />
                Community Forum
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardDescription className="text-sm text-muted-foreground mb-4">
                Ask questions, share knowledge, and connect with other farmers.
              </CardDescription>
              <Link
                href="/community"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Join Forum
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
