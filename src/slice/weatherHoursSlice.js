import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';

const initialState = {
    weatherHours: [],
    activeItem: {},
    hoursLoadingStatus: 'idle',
    viewComp: false,
}


export const fetchWeatherHours = createAsyncThunk(
    'hours/fetchWeatherHours',
    async (cord) => {
        const {getWeatherHourse} = useWeatherService();

        return await getWeatherHourse(cord);
        
    }
)

const weatherSlice = createSlice({
    name: 'hours',
    initialState,
    reducers: {
        weatherActive: (state, action) => {
            state.activeItem = action.payload;
            state.viewComp = true;
        },
        weatherInactive: (state) => {
            state.viewComp = false
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchWeatherHours.pending, (state, action) => {
                state.hoursLoadingStatus = 'loading';
            })
            .addCase(fetchWeatherHours.fulfilled, (state, action) => {
                state.weatherHours = action.payload;
                state.hoursLoadingStatus = 'idle';
            })
            .addCase(fetchWeatherHours.rejected, (state, action) => {
                state.hoursLoadingStatus = 'error';
            })
    }
})


const {actions, reducer} = weatherSlice;

export default reducer;

export const {
    weatherActive,
    weatherInactive,
} = actions;