import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../employeelist.css';

const EmployeeCard = ({ employee, handleDelete, handleEdit }) => {
  return (
    <Card className="employee-card-container">
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
        
        <div className="card-actions">
          {/* Edit Button */}
          <Button
            variant="warning"
            onClick={() => handleEdit(employee._id)}
            className="mt-3 edit-btn"
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Button
            variant="danger"
            onClick={() => handleDelete(employee._id)}
            className="mt-3 delete-btn"
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeCard;
