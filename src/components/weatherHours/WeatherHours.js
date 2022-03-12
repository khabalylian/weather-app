import CardMoreInfo from '../cardMoreInfo/CardMoreInfo';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherHours, weatherActive, weatherInactive } from '../../slice/weatherSlice';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const WeatherHours = () => {
    const dispatch = useDispatch();

    const weatherHours = useSelector(state => state.weather.weatherHours);
    const viewComp = useSelector(state => state.weather.viewComp);
    const hoursLoadingStatus = useSelector(state => state.weather.hoursLoadingStatus);

    useEffect(() => {
        dispatch(fetchWeatherHours());
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTextBeforeItem();
    }, [weatherHours])


    const setActiveItem = (e) => {

        const parent = e.closest('.weather-hours__item');
        const targetActive = parent.querySelector('.item-hours__hours');
        const arrActiveEl = document.querySelectorAll('.active');

        if(targetActive.classList.contains('active')){
            targetActive.classList.remove('active');
            dispatch(weatherInactive());
        }else{
            targetActive.classList.add('active');
        }

        arrActiveEl.forEach(item => item.classList.remove('active'));
    }
    
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
                    onClick={(e) => {
                        dispatch(weatherActive(item));
                        setActiveItem(e.target);
                    }}
                    >
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
    
    const weatherHoursItem = hoursLoadingStatus === 'loading' ? <Spinner/> : renderItem(weatherHours); 
    const weatherHoursError = hoursLoadingStatus === 'error' ? <Error/> : null;
    const weatherMoreInfo = viewComp ?  <CardMoreInfo/> : <span>Виберіть годину для детальнішої інформації</span>;

    return (
        <div className="weather-hours">
            <div className="weather-hours__container">
                {weatherHoursError}
                {weatherHoursItem}
                <div className="weather-more-info">
                    {weatherMoreInfo}
                </div>
            </div>
        </div>
    )
}

export default WeatherHours;