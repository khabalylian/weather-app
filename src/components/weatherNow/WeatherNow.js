import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherNow } from "../../slice/weatherSlice";
import Spinner from "../spinner/Spinner";

const WeatherNow = () => {
    const dispatch = useDispatch();
    const weatherNow = useSelector(state => state.weather.weatherNow)
    const hoursLoadingStatus = useSelector(state => state.weather.hoursLoadingStatus)
    const {temp} = weatherNow;

    useEffect(() => {
        dispatch(fetchWeatherNow());
        // eslint-disable-next-line
    }, [])

    const renderComponent = () => {
        return (
            <div className="block weather-now__block">
                <div className="block__container">
                    <p className="block__text">Зараз</p>
                    <h1 className="block__city">Львів</h1>
                </div>
                <p className="block__temp">{temp}<span>°</span></p>
            </div>
        )
    }

    const weatherNowComponent = hoursLoadingStatus === 'loading' || hoursLoadingStatus === 'error' ? <Spinner/> : renderComponent();

    return (
        <div className="weather-now">
            {weatherNowComponent}
        </div>
    )   
}

export default WeatherNow;