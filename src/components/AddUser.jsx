import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://leetcode-leaderboardbackend.vercel.app/add_user', { username: username }, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        toast.success(response.data.message);
        setUsername('');
        setToken('');
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <Container className="text-center">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="my-4">Add User</h2>
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
        <Form.Group className="mb-3">
          <Form.Label>Leetcode Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', borderRadius: '4px' }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Admin Token</Form.Label>
          <Form.Control
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ width: '100%', borderRadius: '4px' }}
          />
        </Form.Group>
        <Button variant="secondary" type="submit" style={{ width: '100%', marginTop: '10px', borderRadius: '4px' }}>
          Add User
        </Button>
      </Form>
    </Container>
  );
};

export default AddUser;