import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';

const initialState = {
    weatherDay: [],
    weatherNow: {},
    weatherCordCheak: false,
    weatherCity: {
        'Lviv' : {
            lat: 49.8382600,
            lon: 24.0232400,
        },
        'Kiev' : {
            lat: 50.4546600,
            lon: 30.5238000,
        }
    },
    dayLoadingStatus: 'idle',
    nowLoadingStatus: 'idle',
}

export const fetchWeatherDays = createAsyncThunk(
    'weather/fetchWeatherDays',
    async (cord) => {
        cord = JSON.parse(cord);
        const {getWeatherDay} = useWeatherService();

        return await getWeatherDay(cord);    
    }
)

export const fetchWeatherNow = createAsyncThunk(
    'weather/fetchWeatherNow',
    async (cord) => {
        cord = JSON.parse(cord);
        const {getWeatherHourse} = useWeatherService();
        const res = await getWeatherHourse(cord);
        return res[0];
        
    }
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        weatherCord: (state, action) => {
            state.weatherCordCheak = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherNow.pending, (state, action) => {
                state.nowLoadingStatus = 'loading';
            })
            .addCase(fetchWeatherNow.fulfilled, (state, action) => {
                state.weatherNow = action.payload;
                state.nowLoadingStatus = 'idle';
            })
            .addCase(fetchWeatherNow.rejected, (state, action) => {
                state.nowLoadingStatus = 'error';
            })
        builder
            .addCase(fetchWeatherDays.pending, (state, action) => {
                state.dayLoadingStatus = 'loading';
            })
            .addCase(fetchWeatherDays.fulfilled, (state, action) => {
                state.weatherDay = action.payload;
                state.dayLoadingStatus = 'idle';
            })
            .addCase(fetchWeatherDays.rejected, (state, action) => {
                state.dayLoadingStatus = 'error';
            })
    }
})


const {actions, reducer} = weatherSlice;

export default reducer;

export const {
    weatherCord
} = actions;