import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('total');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard(sortType);
  }, [sortType]);

  const fetchLeaderboard = (type) => {
    setLoading(true);
    axios.get(`https://leetcode-leaderboardbackend.vercel.app/leaderboard/${type}`)
      .then(response => {
        // Assign ranks based on the index of each user
        const rankedUsers = response.data.map((user, index) => ({
          ...user,
          rank: index + 1
        }));
        setUsers(rankedUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching ${type} leaderboard:`, error);
        toast.error(`Error fetching ${type} leaderboard: ${error.message}`);
        setLoading(false);
      });
  };

  const renderQuestions = (user) => {
    switch (sortType) {
      case 'easy':
        return (<><strong>Easy:</strong> {user.easy}</>);
      case 'medium':
        return (<><strong>Medium:</strong> {user.medium}</>);
      case 'hard':
        return (<><strong>Hard:</strong> {user.hard}</>);
      case 'total':
      default:
        return (<><strong>Total:</strong> {user.total}</>);
    }
  };

  const getCardVariant = (rank) => {
    switch (rank) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return 'bronze';
      default:
        return 'default';
    }
  };

  return (
    <Container className="leaderboard-container text-center container-full-height">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="my-4">LeetCode Leaderboard</h1>
      <div className="button-group mb-3">
        <Button variant="secondary" className="me-2" onClick={() => setSortType('easy')}>Easy</Button>
        <Button variant="secondary" className="me-2" onClick={() => setSortType('medium')}>Medium</Button>
        <Button variant="secondary" className="me-2" onClick={() => setSortType('hard')}>Hard</Button>
        <Button variant="secondary" onClick={() => setSortType('total')}>Total</Button>
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="justify-content-center">
          {users.map((user, index) => (
            <Col key={user.username} xs={10} md={10} lg={7} className="mb-2">
              <Card className="leaderboard-card" id={`${getCardVariant(index + 1)}`}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="rank">
                    <Card.Text className="mb-0">#{user.rank} &nbsp;</Card.Text>
                  </div>
                  <div className="username">
                    <Card.Title className="mb-0">{user.username}</Card.Title>
                  </div>
                  <div className="questions">
                    <Card.Text className="mb-0">
                      {renderQuestions(user)}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Leaderboard;