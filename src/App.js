import React, { useState } from 'react';

const api = {
  key: "84009787f1cf535ec560e599e2f3e859",
  base: "https://api.openweathermap.org/data/2.5/"
}
//shayor
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [color, setColor] = useState("app");


  const search = evt => {


// if (evt.key === "Enter") means that the event will only be triggered after pressing enter
    if (evt.key === "Enter") {

      /*
      the inpuit is saved in quarry in the line onChange={e => {setQuery(e.target.value)}} in the div search-box 
      then it is sent to the api to retreve the data.
      */
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          var temp = result.main.temp
          var t = result.weather.main
         if(temp>30 ){
            setColor("hot") 
          }else if(10 < temp < 30 ){
            setColor("clear")
          }else if(temp <= 10 ){
            setColor("cold")
          }
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={color}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => {
              setQuery(e.target.value)
            }}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
         <div>
         <div className="location-box">
           <div className="location">{weather.name}, {weather.sys.country}</div>
           <div className="date">{dateBuilder(new Date())}</div>
         </div>

         <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>

          <div className="add-info">
            <div className="info-item">
              Feels Like {Math.round(weather.main.feels_like)}°c
            </div>
            <div className="info-item">
              Humidity {Math.round(weather.main.humidity)}%
            </div>
            <div className="info-item">
              Air Pressure {Math.round(weather.main.pressure)} hPa
            </div>
            <div className="info-item">
              Wind Speed {(weather.wind.speed)}m/s
            </div>
      
          </div>
       </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;