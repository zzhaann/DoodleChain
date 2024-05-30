import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CanvasComponent from './CanvasComponent';

const socket = io('http://localhost:3000');

function App() {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isInRoom, setIsInRoom] = useState(false);
    const [task, setTask] = useState('');
    const [results, setResults] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const createRoom = () => {
        socket.emit('createRoom', (roomId) => {
            console.log(`Room created with ID: ${roomId}`);
            setRoomId(roomId);
            setIsInRoom(true);
        });
    };

    const joinRoom = () => {
        socket.emit('joinRoom', { roomId, participant: name }, (response) => {
            if (response.success) {
                console.log('Successfully joined the room');
                setIsInRoom(true);
            } else {
                alert(response.message);
            }
        });
    };

    const startGame = () => {
        socket.emit('startGame', { roomId });
    };

    const submitTask = () => {
        socket.emit('submitTask', { roomId, task });
    };

    const submitDrawing = (drawing) => {
        socket.emit('submitDrawing', { roomId, drawing });
    };

    const getResults = () => {
        socket.emit('getResults', { roomId }, (results) => {
            setResults(results);
            console.log(results);
        });
    };

    return (
        <div>
            {!isInRoom ? (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                    />
                    <button onClick={createRoom}>Создать комнату</button>
                    <input
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Код комнаты"
                    />
                    <button onClick={joinRoom}>Присоединиться к комнате</button>
                </div>
            ) : (
                <div>
                    <p>Комната: {roomId}</p>
                    <button onClick={startGame}>Начать игру</button>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Введите задание"
                    />
                    <button onClick={submitTask}>Отправить задание</button>
                    <CanvasComponent onSave={submitDrawing} />
                    <button onClick={getResults}>Получить результаты</button>
                    {results && (
                        <div>
                            <h2>Результаты</h2>
                            <p>Задания:</p>
                            <ul>
                                {results.tasks.map((t, index) => (
                                    <li key={index}>{t}</li>
                                ))}
                            </ul>
                            <p>Рисунки:</p>
                            <ul>
                                {results.drawings.map((d, index) => (
                                    <li key={index}>
                                        <img src={d} alt={`Drawing ${index}`} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
