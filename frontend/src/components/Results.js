import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';

function Results() {
  const { roomId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`/api/rooms/${roomId}/results/`)
      .then(response => {
        setResults(response.data);
      });
  }, [roomId]);

  return (
    <div>
      <h2>Results for Room {roomId}</h2>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <p>Task: {result.taskDescription}</p>
            <img src={result.drawing} alt="Drawing" />
          </li>
        ))}
      </ul>
      <Link to={`/room/${roomId}`}>Back to Room</Link>
    </div>
  );
}

export default Results;
