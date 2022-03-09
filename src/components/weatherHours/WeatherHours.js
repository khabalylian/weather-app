import useWeatherService from '../../service/WeatherService';
import { useState, useEffect, useCallback, useMemo } from 'react';

const WeatherHours = () => {
    const {getWeatherHourse} = useWeatherService();

    const [weatherHours, setWeatherHours] = useState([]);
    const [moreInfo, setMoreInfo] = useState({});

    useEffect(() => {

        getWeatherHourse()
            .then(setWeather)
    }, [])

    useEffect(() => {
        setTextBeforeItem();
    }, [weatherHours])

    // useEffect(() => {
    //     setActiveItem();
    // }, [weatherHours, moreInfo])

    const setActiveItem = (e, item) => {
        const parent = e.closest('.weather-hours__item');
        const targetActive = parent.querySelector('.item-hours__hours');
        const arrActiveEl = document.querySelectorAll('.active');

        if(targetActive.classList.contains('active')){
            targetActive.classList.remove('active');
            setMoreInfo({})
        }else{
            targetActive.classList.add('active');
            setMoreInfo(item);
        }

        arrActiveEl.forEach(item => item.classList.remove('active'));
    }

    console.log('hours');
    const setTextBeforeItem = () => {
        const arrHoursItem = document.querySelectorAll('.item-hours__hours');
        let text = 'Завтра';

        arrHoursItem.forEach((item, index) => {
            let span = document.createElement('SPAN');
            let parent = item.closest('.weather-hours__item');

            if(item.innerHTML === '00:00'){
                span.classList.add('item-hours__span')
                span.textContent = text;

                if(index !== 0){
                    parent.before(span);
                    text = 'Післязавтра';
                }else{
                    text = 'Завтра';
                }
            }
        }) 
    }


    const setWeather = (arrWeather) => {
        //setMoreInfo(arrWeather[1]);
        setWeatherHours(arrWeather);
    }

    const renderItem = (arr) => {
        const items = arr.map((item, index) => {
            let {hours, temp, icon} = item;
            const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            if(index === 0) return false;
            

            if(hours < 10){
                hours = `0${hours}`;
            }

            return (
                <div 
                    key={index} 
                    className="item-hours weather-hours__item"
                    onClick={(e) => setActiveItem(e.target, item) }>
                    <p className="item-hours__hours">{hours}:00</p>
                    <p className="item-hours__temp">{temp}<span>°</span></p>
                    <div className="item-hours__img">
                        <img className="item-hours__weather-icon" src={src} alt="weatherIcon"/>
                    </div>
                </div>
            )
        })

        return (
            <div className="weather-hours__items">
                {items}    
            </div>
        )
    }
    const renderMoreInfo = (objectInfo) => {
        const {pressure, humidity, windSpeed, windGust} = objectInfo;
        return (
            <div className="weather-more-info__block">
                <p className="weather-more-info__pressure">Тиск: <span>{pressure} мм</span></p>
                <p className="weather-more-info__humidity">Вологість: <span>{humidity}%</span></p>
                <p className="weather-more-info__windSpeed">Помірний вітер: <span>({windSpeed} м/с)</span></p>
                <p className="weather-more-info__windGust">Пориви вітру: <span>({windGust} м/с)</span></p>
            </div>
        )
    };

    const weatherHoursItem = renderItem(weatherHours);
    const weatherMoreInfo = JSON.stringify(moreInfo) !== '{}' ? renderMoreInfo(moreInfo) : <span>Виберіть годину для детальнішої інформації</span>;

    return (
        <div className="weather-hours">
            <div className="weather-hours__container">
                {weatherHoursItem}
                <div className="weather-more-info">
                    {weatherMoreInfo}
                </div>
            </div>
        </div>
    )
}

export default WeatherHours;