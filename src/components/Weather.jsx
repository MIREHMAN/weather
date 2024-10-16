import "../components/Weather.css";
import { useEffect, useState } from "react";

function Weather() {
  const [temp, setTemp] = useState("35");
  const [city, setCity] = useState("Rawalpindi");
  const [humidity, setHumidity] = useState("35");
  const [wind, setWind] = useState("1.4");
  const [input, setInput] = useState("");

  const api_key=process.env.REACT_APP_API_KEY;

  const Search = async (city1) => {

    try {
      const url= `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${api_key}`;

      const response= await fetch(url);
      const data= await response.json();
      console.log(data);

    } catch (error) {
      
    }
useEffect(()=>{
  Search('London');
},[])

    
  };
  

  
  return (
    <div className="Main-Container">
      <div className="header-box">
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Enter city name"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <input type="button" value={"Se"}  />
          </form>
        </div>
      </div>
      <div className="body-box">
        <div className="weather-image">
          <img src="/" alt="weather" />
        </div>
        <div className="temp-value">{`${temp} C`}</div>
        <div className="city-name">{city}</div>
      </div>
      <div className="footer-box">
        <div className="humidity-box">
          <img src="/" alt="humidity" />
          <div className="humidity">
            <div className="humidity-value">{`${humidity} %`}</div>
            <div className="humidity-text">Humidity</div>
          </div>
        </div>
        <div className="wind-speed-box">
          <img src="/" alt="wind speed" />
          <div className="windspeed">
            <div className="windspeed-value">{`${wind}km/hr`}</div>
            <div className="windspeed-text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
