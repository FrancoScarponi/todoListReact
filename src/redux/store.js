import {configureStore} from '@reduxjs/toolkit'
import todoReducer  from "./toDoSlice";
import authReducer from './userSlice'

export const store = configureStore({
    reducer:{
        todos: todoReducer,
        auth: authReducer,
    }
})

