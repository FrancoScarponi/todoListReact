import React, { useState } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import {auth, createUserWithEmailAndPassword} from '../firebaseConfig/credenciales'


export const Register = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();


  const handleSignUp = async (e)=>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email,password)
      navigate('/login');
    } catch (error) {
     
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está registrado.');
          break;
        case 'auth/invalid-email':
          setError('La dirección de correo no es válida.');
          break;
        case 'auth/operation-not-allowed':
          setError('El registro de cuentas está deshabilitado.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
          break;
        default:
          setError('Ocurrió un error. Inténtalo de nuevo más tarde.');
      }

      console.log(error)
    }
  
  }

  return (
    <div className='h-full w-1/3 mx-auto flex flex-col justify-center gap-4 items-center'>
    <h1 className='font-bold'>Sign Up</h1>

    <div className=' min-h-64 w-96 flex justify-center bg-zinc-700 rounded-lg py-4'>
      <form onSubmit={handleSignUp} className='flex flex-col my-auto w-full mx-10 gap-3'>
        <div className='flex flex-col'>
          <label htmlFor="email" className='mb-1' >Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='bg-zinc-300 text-black px-1 rounded-lg h-8 ' id='email'/>
        </div>

        <div className='flex flex-col mb-1'>
          <label htmlFor="password" className='mb-1'>Contraseña</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='bg-zinc-300 text-black px-1 rounded-lg h-8' id='password'/>
        </div>
        
        {error?(<div className='text-red-500'>{error}</div>):null}

        <button type='submit'>Registrarse</button>
        <NavLink to='/login'>Iniciar Sesion</NavLink>
      </form>
    </div>
  </div>
  )
}
