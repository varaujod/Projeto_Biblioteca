import express from 'express';
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from './config/Swagger';

const app = express();
const PORT = 3090;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);

app.use('/library', apiRouter);

RegisterRoutes(app);

setupSwagger(app);

app.listen(PORT, () => console.log("API ONLINE na porta " + PORT));