import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = (props) => {
  
  // setNewUser allows switching beween login and signup forms
  const { setNewUser } = props;

  // Use state for the email and password variables
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  // use mutation for login route
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  
  // when the input fields change this handles those changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // makes a call to login when the use submits the login form
  const handleFormSubmit = async (event) => {

    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      if (error) { throw new Error('something went wrong!'); }

      Auth.login(data.login.token);

    } catch (err) {
      console.error(`
      ===========================
      ERROR
      ===========================
      ${err}
      `);
    }

    // resets the login form
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="auth_wrapper">
      <p>User login: </p>
      <input
        type="text"
        name="email" 
        placeholder="email"
        onChange={handleInputChange}
        value={ userFormData.email }
        />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleInputChange}
        value={ userFormData.password }
        />
      <button
        disabled={!(userFormData.email && userFormData.password)}
        type='submit'
        onClick={handleFormSubmit}>
        Login
      </button>
      <button
        type='submit'
        onClick={() => setNewUser(true) }>
          New User
        </button>
        {error && 'Invalid Credentials'}
    </div>
  );
};

export default LoginForm;