import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRouter from './AppRoutes';
import useBeforeWindowUnload from './shared/hooks/useBeforeWindowUnload';
import { socketService } from './sockets/socket.service';
const App = () => {
    useBeforeWindowUnload();
    useEffect(() => {
        socketService.setupSocketConnection();
    }, []);
    return (_jsx(_Fragment, { children: _jsx(BrowserRouter, { children: _jsxs("div", { className: "w-screen min-h-screen flex flex-col relative", children: [_jsx(AppRouter, {}), _jsx(ToastContainer, {})] }) }) }));
};
export default App;
