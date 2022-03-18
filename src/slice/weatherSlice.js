import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';

const initialState = {
    weatherDay: [],
    weatherNow: {},
    weatherCordCity: ['49.8358', '24.0193'],
    dayLoadingStatus: 'idle',
    nowLoadingStatus: 'idle',
}

export const fetchWeatherDays = createAsyncThunk(
    'weather/fetchWeatherDays',
    async (cord) => {
        const {getWeatherDay} = useWeatherService();

        return await getWeatherDay(cord);
        
    }
)

export const fetchWeatherNow = createAsyncThunk(
    'weather/fetchWeatherNow',
    async (cord) => {
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
            state.weatherCordCity = action.payload;
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