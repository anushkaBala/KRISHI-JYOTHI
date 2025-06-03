"use server";

export interface Location {
  lat: number;
  lng: number;
}

export interface Weather {
  temperature: number;
  condition: string;
  temperatureHigh: number;
  temperatureLow: number;
  icon: string;
}

/**
 * Asynchronously retrieves weather data from the OpenWeather API.
 *
 * @param location An object containing latitude and longitude coordinates.
 * @returns A promise that resolves to a Weather object.
 */
export async function getCurrentWeather(location: Location): Promise<Weather> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Weather API key is missing. Please set OPENWEATHER_API_KEY in your .env file.');
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const weather: Weather = {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      temperatureHigh: data.main.temp_max,
      temperatureLow: data.main.temp_min,
      icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    };

    return weather;
  } catch (error) {
    console.error('Could not fetch weather data:', error);
    throw error;
  }
}
