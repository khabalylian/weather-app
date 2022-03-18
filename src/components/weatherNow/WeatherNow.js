import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherNow, weatherCord } from "../../slice/weatherSlice";
import { weatherInactive } from "../../slice/weatherHoursSlice";
import Spinner from "../spinner/Spinner";

const WeatherNow = () => {
    const dispatch = useDispatch();
    const {temp} = useSelector(state => state.weather.weatherNow);
    const nowLoadingStatus = useSelector(state => state.weather.nowLoadingStatus);
    const weatherCordCity = useSelector(state => state.weather.weatherCordCity);

    const weatherCity = {
        'Lviv' : {
            lat: 49.8382600,
            lon: 24.0232400,
        },
        'Kiev' : {
            lat: 50.4546600,
            lon: 30.5238000,
        }
    }

    const renderCity = () => {
        const items = Object.keys(weatherCity).map((item, index) => {
            return (
                <option key={index} value={[weatherCity[item]['lat'], weatherCity[item]['lon']]}>{item}</option>
            )
        })
        return (
            <select onChange={(e) => changeCity(e)} className="weather-now__select" name="select">
                {items}
            </select>
        )
    };

    const changeCity = (e) => {
        const arrCord = e.target.value.split(',');
        dispatch(weatherCord(arrCord))
        dispatch(weatherInactive());
    };

    useEffect(() => {
        dispatch(fetchWeatherNow(weatherCordCity));
        // eslint-disable-next-line
    }, [weatherCordCity])

    const renderComponent =() => {
        return (
            <p className="block__temp">{temp}<span>°</span></p>
        )
    };

    const weatherNowComponent = nowLoadingStatus === 'loading' || nowLoadingStatus === 'error' ? <Spinner/> : renderComponent();
    const itemComp = renderCity();

    return (
        <div className="weather-now">
            <div className="block__container">
                <p className="block__text">Зараз</p>
                <h1 className="block__city">
                    {itemComp}
                </h1>
            </div>
            {weatherNowComponent}
        </div>
    )   
}

export default WeatherNow;