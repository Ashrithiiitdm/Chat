import { createSlice } from '@reduxjs/toolkit';

const initState = {
    modals: {
        audio: false,
        media: false,
        doc: false,
    },

};

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        updateAudioModal(state, action) {
            state.modals.audio = action.payload;
        },
        updateMediaModal(state, action) {
            state.modals.media = action.payload;
        },
        updateDocModal(state, action) {
            state.modals.doc = action.payload;
        },
    },
});

export default slice.reducer;

export const ToggleAudioModal = (val) => async (dispatch, getState) => {
    dispatch(slice.actions.updateAudioModal(val));
}

export const ToggleMediaModal = (val) => async (dispatch, getState) => {
    dispatch(slice.actions.updateMediaModal(val));
}

export const ToggleDocModal = (val) => async (dispatch, getState) => {
    dispatch(slice.actions.updateDocModal(val));
}