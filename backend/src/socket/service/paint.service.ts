import type { IIncomingDataPaint } from '../../types/paint.type.ts';
import type { IPainPixel } from '../../types/paint.type.ts';
import type { WebSocket } from 'ws';

interface IPaintService {
  pixelState: IPainPixel[];
  getDraw: () => IPainPixel[];
  draw: (data: IIncomingDataPaint) => IPainPixel;
  broadcast: (clients: Set<WebSocket>, data: string, currentClient: WebSocket) => void;
}

const PaintService: IPaintService = {
  pixelState: [],

  getDraw: function () {
    return this.pixelState;
  },

  draw: function (data) {
    const pixel = data.payload as IPainPixel;
    this.pixelState.push(pixel);

    return pixel;
  },

  broadcast: function (clients, data, currentClient) {
    clients.forEach((client) => {
      if (client !== currentClient) {
        client.send(data);
      }
    });
  },
};

export default PaintService;
