const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let rooms = {};

io.on('connection', (socket) => {
    console.log('Новый клиент подключен');

    socket.on('createRoom', (callback) => {
        const roomId = uuidv4();
        rooms[roomId] = { participants: [], tasks: [], drawings: [] };
        callback(roomId);
        console.log(`Комната создана с ID: ${roomId}`);
    });

    socket.on('joinRoom', ({ roomId, participant }, callback) => {
        if (rooms[roomId]) {
            rooms[roomId].participants.push(participant);
            socket.join(roomId);
            callback({ success: true });
            console.log(`${participant} присоединился к комнате ${roomId}`);
        } else {
            callback({ success: false, message: 'Комната не найдена' });
            console.log(`Попытка присоединиться к несуществующей комнате ${roomId}`);
        }
    });

    socket.on('startGame', ({ roomId }) => {
        if (rooms[roomId]) {
            io.to(roomId).emit('gameStarted');
            console.log(`Игра началась в комнате ${roomId}`);
        }
    });

    socket.on('submitTask', ({ roomId, task }) => {
        if (rooms[roomId]) {
            rooms[roomId].tasks.push(task);
            io.to(roomId).emit('taskSubmitted', task);
            console.log(`Задание получено в комнате ${roomId}: ${task}`);
        }
    });

    socket.on('submitDrawing', ({ roomId, drawing }) => {
        if (rooms[roomId]) {
            rooms[roomId].drawings.push(drawing);
            io.to(roomId).emit('drawingSubmitted', drawing);
            console.log(`Рисунок получен в комнате ${roomId}: ${drawing}`);
        }
    });

    socket.on('getResults', ({ roomId }, callback) => {
        if (rooms[roomId]) {
            const results = {
                tasks: rooms[roomId].tasks,
                drawings: rooms[roomId].drawings,
            };
            callback(results);
            console.log(`Результаты запрошены в комнате ${roomId}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('Клиент отключен');
    });
});

server.listen(3000, () => console.log('Сервер запущен на порту 3000'));
