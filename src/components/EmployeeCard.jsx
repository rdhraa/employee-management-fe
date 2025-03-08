import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EmployeeCard = ({ employee, handleDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{employee.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{employee.department}</Card.Subtitle>
        
        <div>
          <strong>Email:</strong> {employee.email}
        </div>
        <div>
          <strong>Phone:</strong> {employee.phone}
        </div>
        <div>
          <strong>Hire Date:</strong> {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'N/A'}
        </div>
        
        <Button variant="danger" onClick={() => handleDelete(employee._id)} className="mt-3">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmployeeCard;

