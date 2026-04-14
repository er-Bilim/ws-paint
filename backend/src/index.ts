import express from 'express';
import type { Express } from 'express';
import { PORT } from './constants/constants.ts';
import cors from 'cors';
import registerWebsocket from './socket/websocket.ts';
import { createServer } from 'http';

const app: Express = express();
const server = createServer(app);

registerWebsocket(server);

app.use(cors());

const run = async () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
  });
};

run().catch((error) => console.error(error));
