import "../components/Weather.css";
import { useEffect, useRef, useState } from "react";
import clearIcon from '../assets/clear.png';
import searchIcon from '../assets/search1.png';
import windIcon from '../assets/wind1.png';
import humidityIcon from '../assets/humidity.png';

function Weather() {
  useEffect(()=>{
    Search('Islamabad');
  },[])

  const inputRef=useRef();
  const [temp, setTemp] = useState("35");
  const [city, setCity] = useState("Rawalpindi");
  const [humidity, setHumidity] = useState("35");
  const [wind, setWind] = useState("1.4");
  

  const api_key='edf7342cbaecac186be5d986e2672268';

  const Search = async (input) => {

    try {
      const url= `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api_key}`;

      const response= await fetch(url);
      const data= await response.json();
      setCity(data.name);
      setTemp(Math.floor(data.main.temp));
      setWind(data.wind.speed);
      setHumidity(data.main.humidity)

    } catch (error) {
      
    }


    
  };
  

  
  return (
    <div className="Main-Container">
      <div className="header-box">
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Enter city name"
              ref={inputRef}

              
              
            />
            </form>
            <img className="search-icon" src={searchIcon} onClick={()=>Search(inputRef.current.value)} />
          
        </div>
      </div>
      <div className="body-box">
        <div className="weather-image">
          <img src={clearIcon} alt="weather" />
        </div>
        <div className="temp-value">{temp}°C</div>
        <div className="city-name">{city}</div>
      </div>
      <div className="footer-box">
      <div className="wind-speed-box">
          <img src={windIcon} alt="wind speed" />
          <div className="windspeed">
            <div className="windspeed-value">{wind} km/hr</div>
            <div className="windspeed-text">Wind Speed</div>
          </div>
        </div>
        <div className="humidity-box">
          <img src={humidityIcon} alt="humidity" />
          <div className="humidity">
            <div className="humidity-value">{`${humidity} %`}</div>
            <div className="humidity-text">Humidity</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Weather;
