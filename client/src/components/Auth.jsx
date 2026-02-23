import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

const Auth = () => {
    const { axios, setToken, setUser } = useAppContext();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const payload = isLogin 
                ? { email: formData.email, password: formData.password }
                : formData;

            const { data } = await axios.post(endpoint, payload);
            
            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                axios.defaults.headers.common['Authorization'] = data.token;
                
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
                
                toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className='text-gray-600'>
                        {isLogin 
                            ? 'Enter your credentials to access your account' 
                            : 'Fill in your details to get started'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {!isLogin && (
                        <>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    placeholder='First name'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    placeholder='Last name'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition'
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='your@email.com'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader size="small" />
                                <span className="ml-2">{isLogin ? 'Signing In...' : 'Signing Up...'}</span>
                            </div>
                        ) : (
                            isLogin ? 'Sign In' : 'Sign Up'
                        )}
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-gray-600'>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type='button'
                            onClick={() => setIsLogin(!isLogin)}
                            className='ml-2 text-primary font-medium hover:underline'
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
