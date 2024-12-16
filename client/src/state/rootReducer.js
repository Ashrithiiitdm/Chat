import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/index.js'; // Explicit import path

import appReducer from './slices/app';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
    app: appReducer,
});


export { rootReducer, rootPersistConfig };
