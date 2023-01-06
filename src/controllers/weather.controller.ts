import { Request, Response } from 'express';
import {
  fetchLocation,
  fetchCurrentWeather,
  fetchForecast,
} from '../services/weather.service';

export const getLocationByIP = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).send(await fetchLocation());
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Internal server error: ${error}`);
  }
};

export const getCurrentWeather = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { city } = req.params;
    return res.status(200).send(await fetchCurrentWeather(city));
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Internal server error: ${error}`);
  }
};

export const getForecast = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { city } = req.params;
    return res.status(200).send(await fetchForecast(city));
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Internal server error: ${error}`);
  }
};
