export interface IPainPixel {
  x: number;
  y: number;
}

export interface IIncomingDataPaint {
  type: 'DRAW' | 'CANVAS' | 'BROADCAST_DRAW';
  payload: IPainPixel | IPainPixel[];
}
