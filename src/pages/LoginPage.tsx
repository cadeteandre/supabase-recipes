import { useRef, useState } from "react";
import supabase from "../utils/backend/setupSupabase";
import { AuthError } from "@supabase/supabase-js";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setMessage('');
        setError('');
      
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
      
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) throw error;
      
          setMessage('Login successful!');
          console.log('User logged in:', data.user);

        } catch (err) {
          if (err instanceof AuthError) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred during login.');
          }
        }
      };

      if(message === 'Login successful!') return <Navigate to="/profile" replace />

    return (  
        <div className='flex flex-col items-center justify-center min-h-screen gap-2'>
            <h1 className='text-3xl'>Login</h1>
            <div className='flex flex-col gap-2 w-80'>
                <label className="input input-bordered flex items-center gap-2">
                    <img className="h-4 w-4 opacity-70" src='./svg/email.svg' alt="email-icon" />
                    <input type="text" className="grow" ref={emailRef} placeholder='E-Mail' />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <img src="/svg/key.svg" alt="key-icon" className="h-4 w-4 opacity-70" />
                    <input type="password" className="grow" ref={passwordRef} placeholder='Password' />
                </label>
                <button className='btn' onClick={handleLogin}>Login</button>
                <div className="flex flex-row items-center justify-center gap-2">
                  <p className="text-indigo-950">I don't have an account:</p>
                  <Link to="/signup" className="link link-hover link-secondary">Register</Link>
                </div>
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default LoginPage;