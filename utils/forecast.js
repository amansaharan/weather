const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e5166da960e5feeeeded635118a2b4e7&query=${lat},${long}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to servers', undefined);
    } else if (response.body.error) {
      callback('Unable to find location weather', undefined);
    } else {
      callback(
        undefined,
        `THE temperature is ${response.body.current.temperature} degree celsius and it feels like ${response.body.current.feelslike} degree celsius`
      );
    }
  });
};

module.exports = forecast;
