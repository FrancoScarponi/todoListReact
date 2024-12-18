import React, { useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import {auth, signInWithEmailAndPassword} from '../firebaseConfig/credenciales'
import { useDispatch, useSelector} from 'react-redux'
import {login} from '../redux/userSlice'

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const [error,setError] = useState("")

  const handleLogin = async (e)=>{
    e.preventDefault();
    try{

      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(userCredentials.user.toJSON()));
      navigate('/home');
      
    }catch(error){

      switch (error.code) {
        case "auth/too-many-requests":
          setError("Demasiados intentos fallidos.");
          break;
        default:
          setError("Usuario o contraseña incorrecta.");
          break;
      }
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  return (
    <div className='h-full w-1/3 mx-auto flex flex-col justify-center gap-4 items-center'>
      <h1 className='font-bold'>Login</h1>

      <div className=' min-h-64 w-96 flex justify-center bg-zinc-700 rounded-lg py-4'>
        <form onSubmit={handleLogin} className='flex flex-col my-auto w-full mx-10 gap-3'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='mb-1'>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='bg-zinc-300 text-black px-1 rounded-lg h-8 ' id='email'/>
          </div>
  
          <div className='flex flex-col mb-1'>
            <label htmlFor="password" className='mb-1'>Contraseña</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='bg-zinc-300 text-black px-1 rounded-lg h-8' id='password'/>
          </div>
          {error?(<div className='text-red-500'>{error}</div>):null}
          <button type='submit'>Entrar</button>
          <NavLink to='/register'>Registrarse</NavLink>
        </form>
      </div>
    </div>
  )
}
