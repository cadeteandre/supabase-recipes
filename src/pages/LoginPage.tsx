import { useRef, useState } from "react";
import supabase from "../utils/backend/setupSupabase";
import { AuthError } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

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
    return (  
        <div className='flex flex-col items-center justify-center h-screen gap-2'>
            <h1 className='text-3xl'>Login</h1>
            <div className='flex flex-col gap-2 w-80'>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" ref={emailRef} placeholder='E-Mail' />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
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