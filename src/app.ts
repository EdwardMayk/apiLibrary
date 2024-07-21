import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setupSwagger } from './swagger/swagger';
import routes from './routes';

const app = express();

setupSwagger(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);






export default app;
