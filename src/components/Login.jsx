import React, { useState,useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-register-page'); 
    return () => {
      document.body.classList.remove('login-register-page'); 
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://employee-management-be-j9ck.onrender.com/api/login', {
        email, 
        password,
      });
      alert('Login Successful.');
      
      localStorage.setItem('token', response.data.token);

      navigate('/employees');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="mt-5 login-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
