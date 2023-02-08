import React, { useRef, useState } from 'react';
import './App.css';
import { fetchWeather } from './api/fetchWeather'
// import { fetchIp } from './api/fetchIpData'
import './styles/Button.css'
const App = () => {

    
    
    const nameOfLocn = useRef(null);
    const [name, setName] = useState("");
    const [weather, setWeather] = useState({});

    const onChange = (e) => {
        setName({ ...name, [e.target.name]: e.target.value });
        console.log(e.target.value)
    }

    let vname = ''
    // function to search the name in the api json file.
    const search = async (e) => {


        // get the name of thelocation from the input field.
        const form = nameOfLocn.current;
        vname = form['name'].value;

        const data = await fetchWeather(vname);
        console.log(vname)
        console.log(data)
        setWeather(data)
    }
//  function to find your devices IP address and send it to weather API call to fetch the results even without searching for the location
//     const fetchIpData = async() => {
//         if (vname == '') {
//             const data = await fetchIp();
//             const locn = await fetchWeather(data["city"]);
//             console.log(data["city"])
//             setWeather(locn)
//         }
    
// }

// fetchIpData()
    return (
        <div>

            <div className="main-container">

                <div className='container grid grid-two-column'>
                    <div>   <form ref={nameOfLocn}>
                        <input type="text" className="search" name="name" placeholder="Search.." 
                            onChange={onChange}
                        />
                    </form>
                    </div>
                    <div>   <button type="button" className="btn" disabled={name.length < 3} onClick={search}>search</button>
                    </div>

                </div>
                {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}


            </div>


        </div>
    )
}

export default App
