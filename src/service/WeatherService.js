import { useHttp } from "../hooks.js/http.hook";

const useWeatherService = () => {
    const _apiKey = '8a2b72db8de4e93b0c8619d5fb894f1a';
    const {request} = useHttp();
    const arrDayOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]

    const getWeatherDay = async () => {
        const res = await request(`https://api.openweathermap.org/data/2.5/onecall?lat=49.8358&lon=24.0193&exclude=minutely&appid=${_apiKey}`);

        return res.daily.map(_transformWeatherDay);
    }

    const getWeatherHourse = async () => {
        const res = await request(`https://api.openweathermap.org/data/2.5/onecall?lat=49.8358&lon=24.0193&exclude=minutely&appid=${_apiKey}`);

        return res.hourly.map(_transformWeatherHourly);
    }

    const _transformWeatherDay = (weather) => {
        const date = new Date(weather.dt*1000);

        return {
            day: arrDayOfWeek[date.getDay()],
            icon: weather.weather[0].icon,
            tempMin: Math.floor(weather.temp.min - 272.15),
            tempMax: Math.floor(weather.temp.max - 272.15),
        }
    }


    const _transformWeatherHourly = (weather) => {
        const date = new Date(weather.dt*1000);

        return {
            temp: Math.floor(weather.temp - 272.15),
            hours: Math.floor(date.getHours()),
            icon: weather.weather[0].icon,
            humidity: weather.humidity,
            windSpeed: weather.wind_speed,
            windGust: weather.wind_gust,
            pressure: weather.pressure
        }
    }
    
    return {getWeatherDay, getWeatherHourse};
}

export default useWeatherService;