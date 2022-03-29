import CardMoreInfo from '../cardMoreInfo/CardMoreInfo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherHours, weatherActive, weatherInactive } from '../../slice/weatherHoursSlice';
import { CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const WeatherHours = () => {
    const dispatch = useDispatch();

    const weatherHours = useSelector(state => state.hours.weatherHours);
    const viewComp = useSelector(state => state.hours.viewComp);
    const hoursLoadingStatus = useSelector(state => state.hours.hoursLoadingStatus);
    const weatherCordCheak = useSelector(state => state.weather.weatherCordCheak);
    
    useEffect(() => {
        dispatch(fetchWeatherHours(localStorage.getItem('Cord')));
        // eslint-disable-next-line
    }, [weatherCordCheak])

    useEffect(() => {
        removeTextBeforeItem();
        setTextBeforeItem();
    }, [weatherHours]);

    const setActiveItem = (e, item) => {
        const parent = e.closest('.weather-hours__item');
        const targetActive = parent.querySelector('.item-hours__hours');
        const arrActiveEl = document.querySelectorAll('.active');
        if(targetActive.classList.contains('active')){
            targetActive.classList.remove('active');
            dispatch(weatherInactive());
        }else{
            targetActive.classList.add('active');
            dispatch(weatherActive(item));
        }
        arrActiveEl.forEach(item => item.classList.remove('active'));
    }

    const removeTextBeforeItem = () => {
        const arrSpan = document.querySelectorAll('.item-hours__span');

        arrSpan.forEach(item => {
            item.remove();
        })
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
                    onClick={(e) => setActiveItem(e.target, item)}
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
    const weatherMoreInfo = viewComp ? <CardMoreInfo/> : <span>Виберіть годину для детальнішої інформації</span>;

    return (
        <div className="weather-hours">
            <div className="weather-hours__container">
                {weatherHoursError}
                {weatherHoursItem}
                <div className="weather-more-info">
                    <CSSTransition
                        in={viewComp}
                        classNames="example"
                        timeout={1000}>
                        <div className="div">
                            {weatherHoursError || weatherMoreInfo}
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </div>
    )
}

export default WeatherHours;