import { configureStore } from '@reduxjs/toolkit';
import weather from '../slice/weatherSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {weather},
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,
    stringMiddleware}),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;