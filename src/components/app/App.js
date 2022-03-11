import WeatherDays from '../weatherDays/WeatherDays';
import WeatherHours from '../weatherHours/WeatherHours';
import WeatherNow from '../weatherNow/WeatherNow';
import './App.scss';

const App = () => { 

    return (
       <div className="weather">
            <WeatherNow/>
            <WeatherDays/>
            <WeatherHours/>
       </div>
    )
}

export default App;