const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Customise the server using "use" function to for static serving
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aman Saharan',
    age: 34,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Aman Saharan',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HELP CONTENT',
    name: 'Aman Saharan',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide the location' });
  }
  console.log(req.query.address);
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ forecast: forecastData, location: place });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found',
    name: 'Aman Saharan',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page do not exist',
    name: 'Aman Saharan',
  });
});

app.listen(3000, () => {
  console.log('Server is running on PORT 3000');
});
