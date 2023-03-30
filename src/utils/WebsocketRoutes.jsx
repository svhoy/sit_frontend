import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { WebSocketProvider } from '../context/WebSoketContex';


const WebsocketRoutes = () => {
  return (
    <WebSocketProvider>
        <Outlet />
    </WebSocketProvider>
  );
};

export default WebsocketRoutes;