import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <Card className="user-card">
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Title className="mb-3">{user.username}</Card.Title>
        <Card.Text>
          Total Questions: {user.total}
        </Card.Text>
        <Button 
        as={Link} 
        to={`https://leetcode.com/${user.username}`} 
        variant="secondary" 
        className="btn-sm"
        target='_blank'
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;