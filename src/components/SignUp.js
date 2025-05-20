import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
      const {name, email, password, cpassword} = credentials
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/CreateUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name})
      });
  
      const json = await response.json();
      console.log(json);

          localStorage.setItem("token", json.authToken);  // ✅ Fixed spelling
        navigate('/home');

    };
  
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div>
            <h2 className='mx-3'>Create Account To Continue To iNoteBook</h2>

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Enter Your Full Name</label>
    <input type="name" name='name' className="form-control"  onChange={onChange} id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name='email'  onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password'  onChange={onChange} className="form-control" id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" name='cpassword'   onChange={onChange} className="form-control" id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>    </div>
  )
}

export default SignUp
