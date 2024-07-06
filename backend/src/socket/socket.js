import { Server } from "socket.io";
import http from "http";
import express from "express";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://lingioconnect-tutor.onrender.com",
            "https://lingio-connect.onrender.com",
            "https://lingio-connect-l8k2.onrender.com",
            "https://lingio-connect-tutor.onrender.com",

        ],
        methods: ["GET", "POST"]
    }
});

const roomCallIds = {}; // Memory storage for callIds

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ senderId, receiverId }) => {
        const roomId = [senderId, receiverId].sort().join('-');
        console.log("roomId is", roomId);
        socket.join(roomId);

        // Send the stored callId to the newly connected client if it exists
        if (roomCallIds[roomId]) {
            io.to(roomId).emit('receiveCallId', roomCallIds[roomId]);
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        try {
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                });
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            const roomId = [senderId, receiverId].sort().join('-');
            io.to(roomId).emit('receiveMessage', newMessage);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('sendCallId', ({ senderId, receiverId, callId }) => {
        try {
            console.log(callId + " this is callId");
            const roomId = [senderId, receiverId].sort().join('-');
            console.log("roomId is", roomId);

            // Store the callId in memory
            roomCallIds[roomId] = callId;

            // io.to(roomId).emit('receiveCallId', callId);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export { app, io, server };
