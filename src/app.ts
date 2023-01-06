import { config } from 'dotenv';
config();
import express from 'express';
import router from './routes/weather.routes';

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', router);

export default app;
