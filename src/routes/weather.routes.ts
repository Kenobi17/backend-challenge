import { Router } from 'express';
import {
  getCurrentWeather,
  getLocationByIP,
  getForecast,
} from '../controllers/weather.controller';

const router: Router = Router();

router.get('/location', getLocationByIP);
router.get('/current/:city?', getCurrentWeather);
router.get('/forecast/:city?', getForecast);

export default router;
