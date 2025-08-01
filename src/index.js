import express from 'express';
import cors from 'cors';
import { ENV } from './config/ENV.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
// import testRoute from './routes/Test.route.js';

import { globalErrorHandler } from './middleware/errorHandler.js';

// routes imports
// import leadsRoute from './routes/admireHolidays/leads.route.js';
import leadsRoute from './routes/admireHolidays/leads.route.js';
import destinationRoute from './routes/admireHolidays/destination.route.js';
import blogRoute from './routes/admireHolidays/blog.route.js';
import testimonialRoute from './routes/admireHolidays/testimonial.route.js';
import userRouter from './routes/admireHolidays/user.route.js';
import adminRoute from './routes/adminRoutes/admin.route.js';
import customerGalleryRoute from './routes/admireHolidays/customerGallery.route.js';
import heroSectionRoute from './routes/admireHolidays/heroSection.route.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use('/api/v1', testRoute);

const allowedOrigins = [
  'http://localhost:3000',
  'https://admireholidays.com',
  'https://www.admireholidays.com',
  'http://192.168.68.106:5173',
  'http://192.168.68.114:3000',
  'http://localhost:5173',
  
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

// Middleware to log requests
app.use('/api/v1/', leadsRoute);
app.use('/api/v1/destination', destinationRoute);
app.use('/api/v1', blogRoute);
app.use('/api/v1/', testimonialRoute);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/', customerGalleryRoute);
app.use('/api/v1', heroSectionRoute);
app.use('/admin', adminRoute);

// Global error handler
app.use(globalErrorHandler);

app.listen(ENV.PORT, () => {
  console.log('Server is start ✅');
});
