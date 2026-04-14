import { WebSocketServer } from 'ws';
import http from 'http';
import registerHandlersWebsocket from './handlers/paintHandler.ts';
import WebSocket from 'ws';

const connectedClients: WebSocket[] = [];

const registerWebsocket = (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    connectedClients.push(ws);
    registerHandlersWebsocket(ws, wss.clients);
  });
};

export default registerWebsocket;
