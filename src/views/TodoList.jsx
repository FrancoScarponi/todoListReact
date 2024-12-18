import React, { useState } from 'react'
import { TodoItem } from '../components/TodoItem'
import { useSelector,useDispatch } from 'react-redux'
import { addTodo } from '../redux/toDoSlice'
import {logout } from '../redux/userSlice'
import {useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebaseConfig/credenciales'
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

import { useEffect } from 'react'


export const TodoList = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [task,setTask] = useState("");
  const user = useSelector((state)=>state.auth.user)
  const [tareas,SetTareas] = useState([]);

  const handleAddTask = async(e)=>{
    e.preventDefault()
    setTask("");
    try{
      const userId = auth.currentUser.uid;
      const nuevaTarea = {
        texto:task,
        completada:false
      }
      await addDoc(collection(db,"usuarios",userId,"tareas"), nuevaTarea);
    }catch(error){
      console.log(error)
    }
  }

  const handleLogout = async ()=>{
    try{
      await signOut(auth);
      dispatch(logout())
      navigate('/login');
    }catch(error){
      console.error("Error al cerrar sesión: ", error);
      alert("No se pudo cerrar la sesión.");
    }

  }

 
  useEffect(()=>{
    const unsub = onSnapshot(
      collection(db,"usuarios",user.uid,"tareas"),
      (snapshot)=>{
        const tareasObtenidas = snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }));
        SetTareas(tareasObtenidas)
      }
    )
  },[user])

  return (
    <div className='flex flex-col h-screen justify-center items-center' >
      <h1 className='font-bold text-4xl pb-5'>Lista de tareas</h1>
      <div className='flex flex-col h-3/4 w-1/3 bg-zinc-700 justify-start aling-center gap-2 p-2 rounded-lg min-w-96'>
        <form onSubmit={(e)=>handleAddTask(e)} className='flex gap-2 justify-center'>
          <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} 
          placeholder='Escribe una FUCKING tarea' className='w-full rounded-lg px-2 bg-zinc-950'/>
          <button type='submit' className='bg-zinc-900'>Agregar</button>
        </form>
      
        <div className='bg-zinc-900 rounded-lg h-full p-2 gap-2 overflow-y-auto'>
          <ul className='flex flex-col gap-2 '>
            {tareas.map((tarea)=>(
              
              <TodoItem key={tarea.id} {...tarea}/>

            ))}
         
          </ul>
        </div>

      </div>
    
      <div className='w-1/3 flex justify-end mt-2'>
        <button onClick={handleLogout} className='bg-red-900'>Logout</button>
      </div>
      
    </div>
  )
}

