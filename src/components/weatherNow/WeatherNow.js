import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherNow } from "../../slice/weatherSlice";

const WeatherNow = () => {
    const dispatch = useDispatch();
    const weatherNow = useSelector(state => state.weather.weatherNow)
    const {temp} = weatherNow;

    useEffect(() => {
        dispatch(fetchWeatherNow());
        // eslint-disable-next-line
    }, [])

    return (
        <div className="weather-now">
            <div className="block weather-now__block">
                <div className="block__container">
                    <p className="block__text">Зараз</p>
                    <h1 className="block__city">Львів</h1>
                </div>
                <p className="block__temp">{temp}°</p>
            </div>
        </div>
    )   
}

export default WeatherNow;