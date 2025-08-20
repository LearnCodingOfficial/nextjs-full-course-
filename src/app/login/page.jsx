'use client';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, register, loginWithGoogle, user} = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isLogin) {
        await login(email, password);
        } else {
        await register(email, password);
        }
        router.push('/'); // Redirect to home page after login/register
    } catch (error) {
        console.error("Error logging in/creating account:", error);
    }
  }

  useEffect(() => {
    if (user){
        router.push('/'); // Redirect to home page if user is already logged in
    }
  }, [user, router])
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
                {isLogin ? "Welcome Back!" : "Create an Account"}
            </h2>
            <p className='text-center text-gray-500 mb-6 text-sm'>
                {isLogin ? "Please enter your credentials." : "Please fill in the details to create an account."}
            </p>

            <form className='space-y-5' onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500'
                />
                <button type='submit' className='w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300'>
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <div className='flex items-center my-6'>
                <hr className='flex-1 border-gray-300'></hr>
                <span className='mx-4 text-gray-500'>or</span>
                <hr className='flex-1 border-gray-300'></hr>
            </div>

            <button onClick={loginWithGoogle} className='w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition duration-300'>
                <img
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    alt='Google Logo'
                    className='w-5 h-5'
                />
                <span className='text-sm font-medium'>
                {isLogin ? "Login with Google" : "Sign up with Google"}
                </span>
            </button>
            
            <p className='mt-6 text-center text-sm text-gray-500'>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button className='text-blue-500 font-semibold ml-1' onClick={() => setIsLogin(!isLogin)} type='button'>
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    </div>
  )
}
