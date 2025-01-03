import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const WS_URL = 'http://localhost:8000';

export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(WS_URL);

        newSocket.on('connect', () => {
            console.log('Connected to socket', newSocket.id);
            setSocket(newSocket);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket', newSocket.id);
            setSocket(null);
        });

        return () => {
            newSocket.disconnect();
        }


    }, []);
    return socket;

};