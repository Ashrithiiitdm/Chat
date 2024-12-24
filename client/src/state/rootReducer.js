import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Explicit import path
import appReducer from './slices/app';
import authReducer from './slices/auth';
import profileReducer from './slices/profile';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
});


export { rootReducer, rootPersistConfig };
