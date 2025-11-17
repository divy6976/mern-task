require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 7777;

const rawOrigins =
  process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = rawOrigins
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json()); //read the JSOn object and convert it into js object and add it to req.body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);





connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT}`);
    }); // now it can take requests
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });

