export interface IIncomingDataPaint {
  type: 'DRAW' | 'CANVAS' | 'BROADCAST_DRAW';
  payload: ICoordinates[]

}

export interface ICoordinates {
  x: number;
  y: number;
}