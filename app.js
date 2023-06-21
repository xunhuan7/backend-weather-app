const express = require("express");
const axios = require("axios");

const app = express();

const port = 8080;

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/api/weather", (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send("城市名不能为空");
  }
  // Open Weather APP ID
  const appid = "0ab5139ae3bb9a7f63ca67e69131793e"
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${appid}`)
    .then((response) => {
      res.json({
        city: response.data.name,
        temp: response.data.main.temp,
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      })
    })
    .catch(() => {
      res.status(500).send("找不到该城市的天气信息");
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
