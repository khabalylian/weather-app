import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';


const initialState = {
    weather: [],
    activeItem: {},
    viewComp: false,
    targetEl: ''
}

export const fetchWeather = createAsyncThunk(
    'heroes/fetchWeather',
    async () => {
        const {getWeatherHourse} = useWeatherService();

        return await getWeatherHourse()
        
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
            .addCase(fetchWeather.pending, (state) => {})
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.weather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state) => {})
    }
})


const {actions, reducer} = weatherSlice;

export default reducer;

export const {
    weatherActive,
    weatherInactive,
} = actions;