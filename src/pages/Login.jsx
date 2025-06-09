import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router';
import {AuthContext} from '../context/AuthContext';
import {login} from '../services/api';

const Login = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {login: authLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const {token, uuid} = await login(credentials);
            authLogin(token, uuid);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
            <div className="max-w-md w-full p-6 bg-white shadow-xl rounded-xl flex items-center justify-center h-full">
                <div className="flex flex-col w-full px-4 py-2">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-sky-800">WebEtu - Login</h1>
                        <p className="text-sky-600 mt-2">Access your student portal</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 text-center">
                                <i className="fas fa-warning mr-2"></i>
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="username"
                                   className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="fas fa-user text-sky-300"></i>
                    </span>
                                <input type="text" name="username" id="username"
                                       required
                                       value={credentials.username}
                                       className="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-200 rounded-md text-sky-600 focus:ring-sky-500 focus:border-sky-500"
                                       onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                       placeholder="Enter your username"/>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="fas fa-lock text-sky-300"></i>
                    </span>
                                <input type={showPassword ? 'text' : 'password'}
                                       name="password" id="password"
                                       required
                                       value={credentials.password}
                                       className="w-full pl-10 pr-10 py-2 bg-blue-50 border border-blue-200 rounded-md text-sky-600 focus:ring-sky-500 focus:border-sky-500"
                                       onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                       placeholder="Enter your password"/>
                                <button type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <i className="fas fa-eye-slash text-sky-300"></i>
                                    ) : (
                                        <i className="fas fa-eye text-sky-300"></i>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                       className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"/>
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember
                                    me</label>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1]">
                                <i className="fas fa-arrow-right-to-bracket mr-2 mt-0.5"></i>
                                {loading ? 'Authenticating...' : 'Sign in'}
                            </button>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Having issues with logging in? <a href="https://www.mesrs.dz/"
                                                          className="font-medium text-sky-600 hover:text-sky-500">Contact MESRS</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center mt-8">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                    <i className="fas fa-shield-alt mr-2 text-gray-400"></i>
                    Your information and credentials are safe and stored locally
                </p>
            </div>
        </div>
    );
};

export default Login;