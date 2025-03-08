import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../addemployee.css';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [hireDate, setHireDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login'); 
      return;
    }

    try {
      await axios.post(
        'https://employee-management-be-j9ck.onrender.com/api/employees',
        {
          name,
          email,
          phone,
          department,
          hireDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/employees'); 
      alert('employee added successfully!')
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <div className="mt-5 add-employee-page">
      <h2>Add New Employee</h2>
      <Form onSubmit={handleSubmit} className='form-container'>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDepartment" className="mt-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formHireDate" className="mt-3">
          <Form.Label>Hire Date</Form.Label>
          <Form.Control
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Employee
        </Button>
      </Form>
    </div>
  );
};

export default AddEmployee;
