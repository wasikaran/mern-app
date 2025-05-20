import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authToken);  // ✅ Fixed spelling
      navigate('/home');
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className='mx-3'>Log In To Continue To iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
