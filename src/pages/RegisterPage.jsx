import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const RegisterPage = () => {
  const {handleUserRegister} = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: ""
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };


  return (
    <div>
      <div className="auth--container">
        <div className="form--wrapper">
          <form onSubmit={(e) => { handleUserRegister(e, credentials)}}>
            <div className="field--wrapper">
              <lable>Name:</lable>
              <input
                id="input--style"
                type="text"
                required
                name="name"
                placeholder="Enter your name..."
                value={credentials.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <lable>Email:</lable>
              <input
                id="input--style"
                type="email"
                required
                name="email"
                placeholder="Enter your email..."
                value={credentials.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="field--wrapper">
              <lable>Password:</lable>
              <input
                id="input--style"
                type="password"
                required
                name="password1"
                placeholder="Enter your password..."
                value={credentials.password1}
                onChange={handleInputChange}
              />
            </div>

            <div className="field--wrapper">
              <lable>Confirm Password:</lable>
              <input
                id="input--style"
                type="password"
                required
                name="password2"
                placeholder="Conform your password..."
                value={credentials.password2}
                onChange={handleInputChange}
              />
            </div>

            <div className="field--wrapper">
              <input
                className="btn btn--lg btn--main"
                type="submit"
                value="Login"
              />
            </div>
          </form>

          <p>
            Already have an account? Register <Link to="/login">here</Link>
          </p>
        </div>
      </div>{" "}
    </div>
  );
}

export default RegisterPage