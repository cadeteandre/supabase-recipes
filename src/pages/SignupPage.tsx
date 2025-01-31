import { useRef, useState } from 'react';
import supabase from '../utils/backend/setupSupabase';
import { AuthError } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setMessage('');
    setError('');

    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const firstName = firstNameRef.current?.value || '';
    const lastName = lastNameRef.current?.value || '';

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      console.log(data);
      if (error) throw error;
      setMessage('Registration successful! Please confirm your email.');
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-2'>
        <h1 className='text-3xl'>Sign Up</h1>
        <div className='flex flex-col gap-2 w-80'>
        <label className="input input-bordered flex items-center gap-2">
            <img src="/svg/person.svg" alt="person-icon" className="h-4 w-4 opacity-70" />
            <input type="text" className="grow" ref={firstNameRef} placeholder='First Name' />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            <img src="/svg/person.svg" alt="person-icon" className="h-4 w-4 opacity-70" />
            <input type="text" className="grow" ref={lastNameRef} placeholder='Last Name' />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            <img className="h-4 w-4 opacity-70" src='./svg/email.svg' alt="email-icon" />
            <input type="text" className="grow" ref={emailRef} placeholder='E-Mail' />
        </label>
        <label className="input input-bordered flex items-center gap-2">
            <img src="/svg/key.svg" alt="key-icon" className="h-4 w-4 opacity-70" />
            <input type="password" className="grow" ref={passwordRef} placeholder='Password' />
        </label>
        <button className='btn' onClick={handleSignUp}>Register</button>
        <div className="flex flex-row items-center justify-center gap-2">
                  <p className="text-indigo-950">I already have an account:</p>
                  <Link to="/login" className="link link-hover link-secondary">Login</Link>
                </div>
        </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}