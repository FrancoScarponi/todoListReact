import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toggleTodo} from '../redux/toDoSlice'
import {deleteTodo} from '../redux/toDoSlice'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/credenciales'

export const TodoItem = ({id,texto,completada}) => {
  
  const usuario = useSelector((state)=>state.auth.user)

  const handleDelete = async()=>{
    try{
      await deleteDoc(doc(db,"usuarios",usuario.uid,"tareas",id));
    }catch(error){
      console.log(error)
    }
  }

  const handleCompleted = async()=>{
    try{
      await updateDoc(doc(db,"usuarios",usuario.uid,"tareas",id),{
        completada:!completada,
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <li className={`flex p-2 rounded-lg justify-between items-center ${
      completada ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      <p className=' text-xl align-middle'>{texto}</p> 
      <div className='flex gap-2'>

        <button className='text-sm 'onClick={handleCompleted} >{completada?"Completa":"Incompleta"}</button>  
        <button className='text-sm text-red-800' onClick={handleDelete}>Eliminar</button>

      </div>   
      
    </li>
  )
}
