import useWeatherService from "../../service/WeatherService";
import { useState, useEffect } from 'react';

const WeatherDays = () => {
    const {getWeatherDay} = useWeatherService();

    const [weatherDay, setWeatherDay] = useState([]);


    useEffect(() => {
        getWeatherDay()
            .then(setWeather)
        // eslint-disable-next-line
    }, [])

    const setWeather = (arrWeather) => {
        setWeatherDay(arrWeather)
    }

    const renderItem = (arr) => {
        const items = arr.map((item, index) => {
            let {day, icon, tempMin, tempMax} = item;
            const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            if(index === 0){
                day = 'Сьогодні';
            }

            return (
                <div key={index} className="item weather-days__item">
                    <p className="item__day">{day}</p>
                    <div className="item__weather">
                        <img className="item__weather-icon" src={src} alt="weatherIcon"/>
                    </div>
                    <div className="item__temp">
                        <div className="item__temp-min">
                            <span>{tempMin}°</span>
                        </div>
                        |
                        <div className="item__temp-max">
                            <span>{tempMax}°</span>
                        </div>
                    </div>
                </div> 
            )
        })

        return (
            <div className="weather-days__items">
                  {items}      
             </div>
        )
    }
    
    const weatherItems = renderItem(weatherDay)
    return (
        <div className="weather-days">
            <div className="weather-days__container">
                {weatherItems}
            </div>
        </div>
    )
}

export default WeatherDays;