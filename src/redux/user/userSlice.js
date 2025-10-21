import { createSlice } from '@reduxjs/toolkit'

const initialState = {           //give the intial state
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({     //create slice
    name: 'user',              //gave the name
    initialState,             // intial state already given
    reducers: {                // reducers is belong to the function or method
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;  // action.payload acsepting the values
            state.error = false;
            state.loading = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null
        },
        deleteUserFailure: (state, payload) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutUserStart: (state) => {
            state.loading = true;
        },
        signoutUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null
        },
        signoutUserFailure: (state, payload) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure,signoutUserStart,signoutUserSuccess,signoutUserFailure } = userSlice.actions;

export default userSlice.reducer
