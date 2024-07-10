import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from './UserCard';

const LeaderboardUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://leetcode-leaderboardbackend.vercel.app/all_users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Container className="text-center container-full-height">
      <h1 className="my-4">All Users</h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
        {users.map((user) => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LeaderboardUsers;
