import { WebSocketServer } from 'ws';
import http from 'http';
import registerHandlersWebsocket from './handlers/paintHandler.ts';

const registerWebsocket = (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected!');

    registerHandlersWebsocket(ws);
  });
};

export default registerWebsocket;
