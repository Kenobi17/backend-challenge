import config from '../config';
import {
  CityLocation,
  IpApiLocationResponse,
  OpenWeatherCurrentWeatherResponse,
  OpenWeatherLocationResponse,
} from '../utils/interfaces';

export const fetchLocation = async (city?: string): Promise<CityLocation> => {
  try {
    const url = city
      ? `${config.OW_GET_LOCATION_URL?.replace('{{city}}', city)}${
          config.OW_API_KEY
        }`
      : `${config.IP_API_GET_LOCATION_URL}`;

    const response = await fetch(url);

    const data: OpenWeatherLocationResponse[] & IpApiLocationResponse =
      await response.json();

    const cityLocation = city
      ? {
          lat: data[0].lat,
          lon: data[0].lon,
          country: data[0].country,
        }
      : {
          lat: data.lat,
          lon: data.lon,
          country: data.country,
        };

    return cityLocation;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fecth location: ${error}`);
  }
};

export const fetchCurrentWeather = async (
  city: string
): Promise<OpenWeatherCurrentWeatherResponse> => {
  try {
    const cityLocation = await fetchLocation(city);

    const response = await fetch(
      `${config.OW_GET_CURRENT_WEATHER_URL?.replace(
        '{{lat}}',
        cityLocation.lat.toString()
      ).replace('{{lon}}', cityLocation.lon.toString())}${config.OW_API_KEY}`
    );

    const data: OpenWeatherCurrentWeatherResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Failed to fecth current weather from open weather api: ${error}`
    );
  }
};

export const fetchForecast = async (city: string) => {
  try {
    const cityLocation = await fetchLocation(city);

    const response = await fetch(
      `${config.OW_GET_FORECAST_URL?.replace(
        '{{lat}}',
        cityLocation.lat.toString()
      ).replace('{{lon}}', cityLocation.lon.toString())}${config.OW_API_KEY}`
    );

    const data: OpenWeatherCurrentWeatherResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Failed to fecth current weather from open weather api: ${error}`
    );
  }
};
