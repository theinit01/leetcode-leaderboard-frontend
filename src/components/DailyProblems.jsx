import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyProblems = () => {
  const [problems, setProblems] = useState({ Algorithms: [], Database: [] });
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
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">Algorithms</h3>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {problems.Algorithms.map((problem, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span><h6>{problem.title}</h6></span>
                <a href={`https://leetcode.com/problems/${problem.titleSlug}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Solve Now</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">
          <h3 className="card-title">Database</h3>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {problems.Database.map((problem, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span><h6>{problem.title}</h6></span>
                <a href={`https://leetcode.com/problems/${problem.titleSlug}`} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">Solve Now</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyProblems;
