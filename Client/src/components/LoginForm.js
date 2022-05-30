import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = (props) => {
  
  const { setNewUser } = props;

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  // use mutation for login route
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  const handleFormSubmit = async (event) => {

    event.preventDefault();

    try {

      const { data } = await loginUser({
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
      email: '',
      password: '',
    });
  };


  console.log(userFormData)


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
        type="text"
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
    </div>
  );
};

export default LoginForm;