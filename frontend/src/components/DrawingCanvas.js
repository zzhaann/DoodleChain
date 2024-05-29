import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function DrawingCanvas() {
  const { taskId } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSaveDrawing = () => {
    const formData = new FormData();
    formData.append('task', taskId);
    formData.append('image', file);

    axios.post(`/api/drawings/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      navigate(`/room/${response.data.task.room}`);
    });
  };

  return (
    <div>
      <h2>Draw something for task {taskId}</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSaveDrawing}>Save Drawing</button>
    </div>
  );
}

export default DrawingCanvas;
