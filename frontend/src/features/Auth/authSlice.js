// Slice :

import { createSlice , createAsyncThunk, findNonSerializableValue, isAsyncThunkAction } from "@reduxjs/toolkit"
import authService from "./authService"

// Get user from localStorage 
const user = JSON.parse(localStorage.getItem("user"))

// STATE : 
// we go back a little thing when we login or register
// Get user from localStorage b json

const initialState = {
    user : user ? user : null ,
    isError : false,
    isSuccess : false,
    isLoading : false ,
    message : "",
}
// REGISTER tHE USER //
// createAsyncThunk : A function that accepts a Redux ACTION *type string and a callback function that should return a PROMISE
// and returns a thunk action creator that will run the promise callback and dispatch the lifecycle actions based on the returned promise.

// thunkAPI: an object containing all of the parameters that are normally passed to a Redux thunk function
export const register = createAsyncThunk("auth/register" , async (user , thunkAPI) => {

    try{
         return await authService.register(user) 
    }

    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
 
})

// Login
export const login = createAsyncThunk("auth/login" , async (user , thunkAPI) => {

    try{
         return await authService.login(user) 
    }

    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
 
})

// Log Out 
export const logout = createAsyncThunk("/auth/logout" , 
async () =>{
        return await authService.logout()
   
})



export const authSlice = createSlice({
    // auth.slice
    name : "auth",

    // The initial state for the reducer
    initialState,

    // An object of "case reducers". Key names will be used to generate actions.
    reducers : {
        // ACTION RESET : To Reset Our State to Initial Data 
        //these will show up in the Redux DevTools Extension when they are dispatched
       reset : (state)  => {
        // does not return 
       // state.user = null
       state.isError = false 
       state.isSuccess= false
       state.isLoading = false 
       state.message = ""
       }
    },

      // object : { func }
    // a slice reducer needs to respond to other actions that weren't defined as part of this slice's reducers field. We can do that using the slice extraReducers field instead
    // builder.addCase(actionCreator, reducer)

    extraReducers : (builder) => {
        builder.addCase(register.pending , (state , action) =>
        {
            state.isLoading =  true 

        }).addCase(register.fulfilled , (state , action) => {

            state.isLoading =  false
            state.isSuccess = true
            // The payload that's coming back from our register function in the service
            state.user = action.payload

        }).addCase(register.rejected , (action , state) => {

            state.isLoading =  false
            state.isError = true
            // in the catch in register , we rejectwithValue, gonna reject and pass in the message as the value as the payload
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled , (action , state) => {
            state.user = null
        })
        builder.addCase(login.pending , (state , action) =>
        {
            state.isLoading =  true 

        }).addCase(login.fulfilled , (state , action) => {

            state.isLoading =  false
            state.isSuccess = true
            // The payload that's coming back from our login function in the service
            state.user = action.payload

        }).addCase(login.rejected , (action , state) => {

            state.isLoading =  false
            state.isError = true
            // in the catch in register , we rejectwithValue, gonna reject and pass in the message as the value as the payload
            state.message = action.payload
            state.user = null
        })


    }
})

// Reset is an action Of authSlice
export const { reset } = authSlice.actions 

export default authSlice.reducer

