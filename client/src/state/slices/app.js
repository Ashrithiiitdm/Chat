import { createSlice } from '@reduxjs/toolkit';

const initState = {
    modals: {
        gif: false,
    },
    selectedGifUrl: '',
};

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        updateGifModal(state, action) {
            state.modals.gif = action.payload.value;
            state.selectedGifUrl = action.payload.url;

        },
    },
});

export default slice.reducer;