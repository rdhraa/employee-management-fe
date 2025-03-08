import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from './EmployeeCard';
import '../employeelist.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.get('https://employee-management-be-j9ck.onrender.com/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: 10,
        },
      });
      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`https://employee-management-be-j9ck.onrender.com/api/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchEmployees();
  };

  const handleEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const filteredEmployees = employees
    .filter((employee) => employee.department.includes(departmentFilter))
    .filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{
      background: 'linear-gradient(to right, #FF7E5F, #FEB47B)',
      minHeight: '100vh',
      padding: '20px',
    }}>
      <h2>Employee List</h2>
      <Button onClick={() => navigate('/add-employee')} className="mb-3">Add Employee</Button>

      <Form>
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />
        <Form.Control
          as="select"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="mb-3"
        >
          <option value="">Filter by Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Designer">Designer</option>
          <option value="Marketing">Marketing</option>
        </Form.Control>
      </Form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          {filteredEmployees.map((employee) => (
            <Col key={employee.id} md={4} className="mb-3">
              <EmployeeCard employee={employee} handleDelete={handleDeleteEmployee} />
              {/* Edit button */}
              <Button
                variant="warning"
                onClick={() => handleEditEmployee(employee.id)}
                className="mt-2"
              >
                Edit
              </Button>
            </Col>
          ))}
        </Row>
      )}

      <div className="pagination mt-3">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmployeeList;
