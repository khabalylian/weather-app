import { useSelector } from 'react-redux';

const CardMoreInfo = () => {
    const activeItem = useSelector(state => state.hours.activeItem);
    const {pressure, humidity, windSpeed, windGust} = activeItem;


    return (
        <div className="weather-more-info__block">
            <p className="weather-more-info_position weather-more-info__pressure">Тиск: <span>{pressure} мм</span></p>
            <p className="weather-more-info_position weather-more-info__humidity">Вологість: <span>{humidity}%</span></p>
            <p className="weather-more-info_position weather-more-info__windSpeed">Помірний вітер: <span>({windSpeed} м/с)</span></p>
            <p className="weather-more-info_position weather-more-info__windGust">Пориви вітру: <span>({windGust} м/с)</span></p>
        </div>
    )
}

export default CardMoreInfo;