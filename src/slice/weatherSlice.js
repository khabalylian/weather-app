import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';


const initialState = {
    weather: [],
    weatherNow: {},
    activeItem: {},
    viewComp: false,
    targetEl: ''
}

export const fetchWeatherHours = createAsyncThunk(
    'weather/fetchWeatherHours',
    async () => {
        const {getWeatherHourse} = useWeatherService();

        return await getWeatherHourse();
        
    }
)

export const fetchWeatherNow = createAsyncThunk(
    'weather/fetchWeatherNow',
    async () => {
        const {getWeatherHourse} = useWeatherService();
        const res = await getWeatherHourse();
        return res[0];
        
    }
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        weatherActive: (state, action) => {
            state.activeItem = action.payload;
            state.viewComp = true;
        },
        weatherInactive: (state) => {
            state.viewComp = false
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchWeatherHours.fulfilled, (state, action) => {
                state.weather = action.payload;
            })
        builder
            .addCase(fetchWeatherNow.fulfilled, (state, action) => {
                state.weatherNow = action.payload;
            })
    }
})


const {actions, reducer} = weatherSlice;

export default reducer;

export const {
    weatherActive,
    weatherInactive,
} = actions;