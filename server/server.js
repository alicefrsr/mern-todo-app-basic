import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import todoRoutes from './routes/todoRoutes.js';

// SET UP APP, MIDDLEWARE, ENV VARIABLES
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// CORS:
// Option 1: Allow all origins with defautl of cors(*)
// app.use(cors());
// Option 2: Allow custom origins, better, more control
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT || 5173}`,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
// const corsOptions = {
//   origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
//   optionSuccessStatus: 200,
// };
app.use(cors(corsOptions));
app.use(express.json());

// DATABASE CONNECTION
// with then()
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((connect) => {
//     console.log('MongoDB connected'.cyan);
//     console.log(`Database: ${connect.connection.name}`);
//     console.log(`Host: ${connect.connection.host}`);
//   })
//   .catch((error) => console.log(`Error: ${error.message}`));

// with async / await, + refactor  (to reuse in seeder.js)
import connectDB from './config/db.js';
connectDB();

// ROUTES
app.get('/api', (req, res) => {
  console.log('Home page');
  res
    .status(200)
    .json({ message: 'Boiler plate API - Home page - Basic CRUD with todos' });
});

app.post('/api/test', (req, res) => {
  console.log('POST Test page');
  res.status(200).json({ message: 'POST Test page' });
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () =>
  console.log(
    `Express server listening on port ${PORT}. BoilerPlate API home page: /api`
      .yellow
  )
);
