import express, { Router } from 'express';
import ServerlessHttp from 'serverless-http';

const app = express();

app.use(express.json());

const routes = Router();

routes.get('/test', (request, response) => response.json({ message: 'hello' }));

app.use(routes);

const handler = ServerlessHttp(app);

export { handler };
