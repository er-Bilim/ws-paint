import type { WebSocket } from 'ws';
import type { IIncomingDataPaint } from '../../types/paint.type.ts';

const registerHandlersWebsocket = (ws: WebSocket) => {

  ws.on('message', (data) => {
    try {
      const decodedData = JSON.parse(data.toString())  as IIncomingDataPaint;

      switch (decodedData.type) {
        case 'CANVAS':
          break;
        case 'DRAW': 
          break;
        case 'BROADCAST_DRAW':
          break;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', console.error);
};

export default registerHandlersWebsocket;
