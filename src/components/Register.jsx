import React, { useState,useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-register-page');
    return () => {
      document.body.classList.remove('login-register-page');
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
     
      await axios.post('https://employee-management-be-j9ck.onrender.com/api/register', { email, password });

      alert('Registration Successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5 register-container">
      <h2 className="mb-4">Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && (
          <div className="mt-3 text-danger">{errorMessage}</div>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>

      <div className="mt-3">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register; 