import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyProblems = () => {
  const [problems, setProblems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://leetcode-leaderboardbackend.vercel.app/daily');
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div>;
  if (error) return <div className="alert alert-danger mt-5" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Daily Problems</h2>
      {Object.keys(problems).map((category, index) => (
        <div key={index} className="card mb-4 shadow-sm">
          <div className={`card-header bg-${getCategoryColor(category)} text-white`}>
            <h3 className="card-title">{category}</h3>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><h6>{problems[category].title}</h6></span>
                <a href={`https://leetcode.com/problems/${problems[category].titleSlug}`} target="_blank" rel="noopener noreferrer" className={`btn btn-${getButtonColorForCategory(category)} btn-sm`}>Solve Now</a>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to determine card header color based on category
const getCategoryColor = (category) => {
  switch (category) {
    case 'Arrays':
      return 'primary';
    case 'Database':
      return 'success';
    case 'Dynamic Programming':
      return 'info';
    case 'Graph':
      return 'warning';
    case 'String':
      return 'danger';
    case 'Tree':
      return 'secondary';
    default:
      return 'primary';
  }
};

// Function to determine button color based on category
const getButtonColorForCategory = (category) => {
  switch (category) {
    case 'Arrays':
      return 'primary';
    case 'Database':
      return 'success';
    case 'Dynamic Programming':
      return 'info';
    case 'Graph':
      return 'warning';
    case 'String':
      return 'danger';
    case 'Tree':
      return 'secondary';
    default:
      return 'primary';
  }
};

export default DailyProblems;
