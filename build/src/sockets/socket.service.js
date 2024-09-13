import { io } from 'socket.io-client';
export let socket;
class SocketService {
    setupSocketConnection() {
        socket = io(import.meta.env.VITE_BASE_ENDPOINT, {
            transports: ['websocket'],
            secure: true
        });
        this.socketConnectionEvents();
    }
    socketConnectionEvents() {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', (reason) => {
            console.log(`Reason: ${reason}`);
            socket.connect();
        });
        socket.on('connect_error', (error) => {
            console.log(`${error}`);
            socket.connect();
        });
    }
}
export const socketService = new SocketService();
