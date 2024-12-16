import React, { useEffect } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import {TodoList} from '../views/TodoList'
import { Login } from '../views/Login'
import { Register } from '../views/Register'
import {  useDispatch, useSelector } from 'react-redux'
import { auth, onAuthStateChanged } from '../firebaseConfig/credenciales'
import {login} from '../redux/userSlice'

export const AppRoutes = () => {
  
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("Usuario actual en Redux:", user);
  }, [user]);
  

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser.toJSON()));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <Routes>
        
      <Route path='/' element={<Navigate to={'/login'} replace/>}/>

      <Route path='/login' element={user? <Navigate to='/home' /> :<Login/>}/>
      
      <Route path='/register' element={<Register/>}/>
      
      <Route path='/home' element={user ? <TodoList/> : <Navigate to='/login' /> } />
      
    </Routes>
  )
}
