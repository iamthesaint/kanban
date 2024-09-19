import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const Login = () => {
  const navigate = useNavigate(); 
  // State to manage the login form data

  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      navigate('/');  // redirect to the home page after successful login
    } catch (err) {
      setErrorMessage('Failed to login. Please check your credentials');  // Set an error message if login fails
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form">
          <label>Username</label>
          <input 
            className='form-input'
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form">
          <label>Password</label>
          <input 
            className='form-input'
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
      {/* error message */}
      {errorMessage && (
        <div className='error-message'>{errorMessage}</div>
      )}
        </div>
        
        {/* Submit button for the login form */}
        <div className='form-button'>
          <button className='button' type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
};

export default Login;
