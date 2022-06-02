import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = (props) => {
  const { setNewUser } = props;
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // use mutation for login route
  const [addUser, { error }] = useMutation(ADD_USER);
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  const handleFormSubmit = async (event) => {

    event.preventDefault();

    try {

      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (error) {
        throw new Error('something went wrong!');
      }

      Auth.login(data.login.token);

    } catch (err) {
      console.error(`
      ===========================
      ERROR
      ===========================
      ${err}
      `);

      // setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="auth_wrapper">
      <p>New User: </p>
      <input
        type="text"
        name="username" 
        placeholder="username"
        onChange={handleInputChange}
        value={ userFormData.username }
        />
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
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type='submit'
        onClick={handleFormSubmit}>
        Sign up
      </button>
      <button
        onClick={() => setNewUser(false)}
        >
          Login
      </button>      
    </div>
  );
};

export default LoginForm;