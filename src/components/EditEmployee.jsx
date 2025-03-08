import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const navigate = useNavigate();
  const { id } = useParams(); 
  console.log(id);
  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
          return;
        }

        
        const response = await axios.get(
          `https://employee-management-be-j9ck.onrender.com/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Failed to load employee data:', error);
        setError('Failed to load employee data'); 
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
     
      const response = await axios.put(
        `https://employee-management-be-j9ck.onrender.com/api/employees/${id}`, 
        employee, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee'); 
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5">
      <h2>Edit Employee</h2>
      {error && <p className="text-danger">{error}</p>} 
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDepartment" className="mt-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
