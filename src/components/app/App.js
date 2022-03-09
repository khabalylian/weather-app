import WeatherDays from '../weatherDays/WeatherDays';
import WeatherHours from '../weatherHours/WeatherHours';
import './App.scss';

const App = () => {
    
    return (
       <div className="weather">
            <WeatherDays/>
            <WeatherHours/>
       </div>
    )
}

export default App;