export interface IPaintPixel {
  x: number;
  y: number;
}

export interface IIncomingDataPaint {
  type: 'DRAW' | 'CANVAS' | 'BROADCAST_DRAW';
  payload: IPaintPixel | IPaintPixel[];
}
