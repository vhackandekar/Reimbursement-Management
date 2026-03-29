let io;
const users = new Map(); // Map of userId -> socket instances

const init = (server) => {
    const { Server } = require('socket.io');
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join', (userId) => {
            console.log(`User ${userId} joined via socket ${socket.id}`);
            users.set(userId, socket);
        });

        socket.on('disconnect', () => {
            for (const [userId, s] of users.entries()) {
                if (s.id === socket.id) {
                    console.log(`User ${userId} disconnected`);
                    users.delete(userId);
                    break;
                }
            }
        });
    });

    return io;
};

const sendNotification = (userId, data) => {
    const socket = users.get(userId);
    if (socket) {
        socket.emit('notification', data);
        console.log(`Notification sent to User ${userId}:`, data.message);
    } else {
        console.log(`User ${userId} not connected, notification stored? (mocked)`);
    }
};

const broadcast = (data) => {
    if (io) {
        io.emit('notification', data);
    }
};

module.exports = { init, sendNotification, broadcast };
