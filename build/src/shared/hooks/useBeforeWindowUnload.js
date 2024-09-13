import { useEffect } from 'react';
import { socket } from 'src/sockets/socket.service';
import { getDataFromSessionStorage } from '../utils/util.service';
const useBeforeWindowUnload = () => {
    useEffect(() => {
        // If the user closes the browser or tab, we emit the socketio event
        window.addEventListener('beforeunload', () => {
            const loggedInUsername = getDataFromSessionStorage('loggedInUser');
            socket.emit('removeLoggedInUser', loggedInUsername);
        });
    }, []);
};
export default useBeforeWindowUnload;
