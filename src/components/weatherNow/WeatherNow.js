import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherNow, weatherCord } from "../../slice/weatherSlice";
import { weatherInactive } from "../../slice/weatherHoursSlice";
import Spinner from "../spinner/Spinner";

const WeatherNow = () => {
    const dispatch = useDispatch();
    const {temp} = useSelector(state => state.weather.weatherNow);
    const nowLoadingStatus = useSelector(state => state.weather.nowLoadingStatus);
    const weatherCordCheak = useSelector(state => state.weather.weatherCordCheak);
    const weatherCity = useSelector(state => state.weather.weatherCity);

    useEffect(() => {
        let select = document.querySelector('.weather-now__select');
        if(localStorage.getItem('Cord') === null){
            localStorage.setItem("Cord", JSON.stringify({
                lat: 49.8382600,
                lon: 24.0232400,
            }));
            localStorage.setItem('City', 'Lviv');
        }
        select.value = localStorage.getItem('City');
    },[]);

    const renderCity = () => {
        const items = Object.keys(weatherCity).map((item, index) => {
            return (
                <option key={index} value={item}>{item}</option>
            )
        })
        return (
            <select onChange={(e) => changeCity(e)} className="weather-now__select" name="select">
                {items}
            </select>
        )
    };

    const changeCity = (e) => {
        const arrCord = JSON.stringify(weatherCity[e.target.value]);
        localStorage.setItem('Cord', arrCord);
        localStorage.setItem('City', e.target.value);
        dispatch(weatherCord(true));
        dispatch(weatherInactive());
    };

    useEffect(() => {
        dispatch(fetchWeatherNow(localStorage.getItem('Cord')));
        dispatch(weatherCord(false));
        // eslint-disable-next-line
    }, [weatherCordCheak])

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
                <div className="block__city">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 64 64"
                        height='40px'
                        width='40px'>
                        <path stroke="#000000" fill="#E8F3F9" d="M52.708 20.849C52.708 8.185 44.584 0 32 0S11.292 8.185 11.292 20.849c0 10.556 16.311 31.747 18.175 34.118l2.278 2.928c-9.542.025-17.237 1.38-17.237 3.051 0 1.686 7.836 3.053 17.502 3.053s17.502-1.367 17.502-3.053c0-1.672-7.704-3.028-17.255-3.051l2.292-2.928c1.847-2.386 18.159-23.577 18.159-34.118zm-27.414-.014c0-3.604 3.002-6.526 6.706-6.526 3.704 0 6.706 2.922 6.706 6.526S35.704 27.361 32 27.361c-3.704 0-6.706-2.922-6.706-6.526z"></path>
                    </svg>
                    {itemComp}
                </div>
            </div>
            {weatherNowComponent}
        </div>
    )   
};

export default WeatherNow;