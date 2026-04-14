import { WebSocketServer } from 'ws';
import registerHandlersWebsocket from './handlers/paintHandler.ts';
import WebSocket from 'ws';
import type { Server } from 'http';

const connectedClients: WebSocket[] = [];

const registerWebsocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    connectedClients.push(ws);
    registerHandlersWebsocket(ws, wss.clients);
  });
};

export default registerWebsocket;
