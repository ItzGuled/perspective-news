import React, {useState } from "react";
import Auth from '../utils/auth';


const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      username: '',
      email: '',
    });
  };



  console.log(userFormData)


  return (
    <div>
      <input
        name="email" 
        placeholder="email"
        onChange={handleInputChange}
        />
      <input
        name="password"
        placeholder="password"
        onChange={handleInputChange}
        />
      <button
        disabled={!(userFormData.email && userFormData.password)}
        type='submit'
        onClick={handleFormSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;