import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchWeatherDays } from "../../slice/weatherSlice";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const WeatherDays = () => {
    const dispatch = useDispatch();
    const weatherDay = useSelector(state => state.weather.weatherDay);
    const dayLoadingStatus = useSelector(state => state.weather.dayLoadingStatus);
    const weatherCordCity = useSelector(state => state.weather.weatherCordCity);
    
    useEffect(() => {
        dispatch(fetchWeatherDays(weatherCordCity));
        // eslint-disable-next-line
    }, [weatherCordCity])

    const renderItem = (arr) => {
        const items = arr.map((item, index) => {
            let {day, icon, tempMin, tempMax} = item;
            const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            if(index === 0)day = 'Сьогодні';
            else if (index === 1) day = 'Завтра';

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
    
    const weatherItems = dayLoadingStatus === 'loading' ? <Spinner/> : renderItem(weatherDay);
    const error = dayLoadingStatus === 'error' ? <Error/> : null;

    return (
        <div className="weather-days">
            <div className="weather-days__container">
                {error}
                {weatherItems}
            </div>
        </div>
    )
}

export default WeatherDays;