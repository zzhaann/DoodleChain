import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function Home() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    axios.post('/api/rooms/', { creator: name })
      .then(response => {
        navigate(`/room/${response.data.id}`);
      });
  };

  const handleJoinRoom = () => {
    navigate(`/room/${roomCode}`, { state: { name } });
  };

  return (
    <div>
      <h2>Enter your name</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleCreateRoom}>Create Room</button>
      <input type="text" placeholder="Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}

export default Home;
