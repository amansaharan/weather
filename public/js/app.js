console.log('Client side JS file loaded');

fetch('http://localhost:3000/weather?address=delhi').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
