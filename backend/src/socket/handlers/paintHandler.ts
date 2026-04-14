import type { WebSocket } from 'ws';
import type { IIncomingDataPaint } from '../../types/paint.type.ts';
import PaintService from '../service/paint.service.ts';

const registerHandlersWebsocket = (ws: WebSocket, clients: Set<WebSocket>) => {
  console.log('Connected clients:', clients.size);

  const pixels = PaintService.getDraw();

  ws.send(
    JSON.stringify({
      type: 'CANVAS',
      payload: pixels,
    }),
  );

  ws.on('message', (data) => {
    try {
      const decodedData = JSON.parse(data.toString()) as IIncomingDataPaint;

      switch (decodedData.type) {
        case 'DRAW':
          const pixel = PaintService.draw(decodedData);

          const data = JSON.stringify({
            type: 'BROADCAST_DRAW',
            payload: pixel,
          });

          PaintService.broadcast(clients, data, ws);

          break;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  ws.on('close', () => {
    console.log('Connected clients after disconnect', clients.size);
  });

  ws.on('error', console.error);
};

export default registerHandlersWebsocket;
