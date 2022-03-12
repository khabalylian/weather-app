import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useWeatherService from '../service/WeatherService';


const initialState = {
    weatherDay: [],
    weatherHours: [],
    weatherNow: {},
    activeItem: {},
    dayLoadingStatus: 'idle',
    hoursLoadingStatus: 'idle',
    viewComp: false,
}

export const fetchWeatherDays = createAsyncThunk(
    'weather/fetchWeatherDays',
    async () => {
        const {getWeatherDay} = useWeatherService();

        return await getWeatherDay();
        
    }
)

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
        builder
            .addCase(fetchWeatherNow.fulfilled, (state, action) => {
                state.weatherNow = action.payload;
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
    weatherActive,
    weatherInactive,
} = actions;