import express, { Router } from 'express';
import ServerlessHttp from 'serverless-http';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

const routes = Router();

routes.post('/users', async (request, response) => {
  const { email, password, first_name, last_name, birthdate, phone } =
    request.body;

  const user = await prisma.users.create({
    data: {
      email,
      password,
      birthdate: new Date(birthdate),
      first_name,
      last_name,
      phone,
    },
  });

  response.json(user);
});

routes.patch('/users/:id', async (request, response) => {
  const { id } = request.params;

  const { email, password, first_name, last_name, birthdate, phone } =
    request.body;

  const user = await prisma.users.update({
    where: {
      id,
    },
    data: {
      email,
      password,
      birthdate: new Date(birthdate),
      first_name,
      last_name,
      phone,
    },
  });

  response.json(user);
});

routes.get('/users', async (request, response) => {
  const users = await prisma.users.findMany();

  response.json(users);
});

routes.get('/users/:id', async (request, response) => {
  const { id } = request.params;

  const users = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  response.json(users);
});

routes.delete('/users/:id', async (request, response) => {
  const { id } = request.params;

  const users = await prisma.users.delete({
    where: {
      id,
    },
  });

  response.json(users);
});

app.use(routes);

const handler = ServerlessHttp(app);

export { handler };
