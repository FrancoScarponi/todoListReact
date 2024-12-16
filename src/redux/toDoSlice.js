import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    list:[]
}

const toDoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo:(state,action)=>{
        state.list.push({
            id:uuidv4(),
            text:action.payload,
            completed:false
        })
    },
    toggleTodo:(state,action)=>{
      const todo = state.list.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed
    },
    deleteTodo:(state,action)=>{
      const todo = state.list.filter((todo) => todo.id != action.payload);
      state.list = todo;
    }
  }
});

export const {addTodo, toggleTodo, deleteTodo} = toDoSlice.actions

export default toDoSlice.reducer