export interface IIncomingDataPaint {
  type: 'DRAW' | 'CANVAS' | 'BROADCAST_DRAW';
  payload: IPainPixel[] | IPainPixel;
}

export interface IPainPixel {
  x: number;
  y: number;
}
