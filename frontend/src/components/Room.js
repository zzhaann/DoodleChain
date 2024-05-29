import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from '../axiosConfig';

function Room() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const [tasks, setTasks] = useState([]);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    axios.get(`/api/rooms/${roomId}/tasks/`)
      .then(response => {
        setTasks(response.data);
      });

    setInviteLink(`${window.location.origin}/room/${roomId}`);
  }, [roomId]);

  const handleCreateTask = () => {
    axios.post(`/api/rooms/${roomId}/tasks/`, { creator: state.name })
      .then(response => {
        setTasks([...tasks, response.data]);
      });
  };

  return (
    <div>
      <h2>Room {roomId}</h2>
      <h3>Invite Link: {inviteLink}</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/task/${task.id}/draw`}>{task.description}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateTask}>Create Task</button>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Room;
