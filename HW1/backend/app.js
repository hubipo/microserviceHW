// 4. app.js - Entry File for the Application
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Routes
const generalRoutes = require('./routes/generalRoutes');
const economyRoutes = require('./routes/economyRoutes');
const newsRoutes = require('./routes/newsRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const locationRoutes = require('./routes/locationRoutes');
const touristRoutes = require('./routes/touristRoutes');
//const imageRoutes = require('./routes/imageRoutes');

app.use('/api/city/general', generalRoutes);
app.use('/api/city/economy', economyRoutes);
app.use('/api/city/news', newsRoutes);
app.use('/api/city/weather', weatherRoutes);
app.use('/api/city/location', locationRoutes);
app.use('/api/city/tourist', touristRoutes);
//app.use('/api/city/image', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));