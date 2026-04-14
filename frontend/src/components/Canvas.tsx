import { useEffect, useRef, useState } from 'react';
import classes from './Canvas.module.scss';
import type { MouseEvent } from 'react';
import type { IIncomingDataPaint } from '../types/paint.type';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);

  const drawOnCanvas = (x: number, y: number, isNewStroke = false) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    if (isNewStroke) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as IIncomingDataPaint;

      if (data.type === 'CANVAS' && Array.isArray(data.payload)) {
        data.payload.forEach((pixel, index) =>
          drawOnCanvas(pixel.x, pixel.y, index === 0),
        );
      }

      if (data.type === 'BROADCAST_DRAW' && !Array.isArray(data.payload)) {
        drawOnCanvas(data.payload.x, data.payload.y);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    drawOnCanvas(offsetX, offsetY, true);

    setIsDrawing(true);

    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({ type: 'DRAW', payload: { x: offsetX, y: offsetY } }),
    );
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;

    drawOnCanvas(offsetX, offsetY);

    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'DRAW',
        payload: { x: offsetX, y: offsetY },
      }),
    );
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className={classes.paint}>
      <canvas
        width={500}
        height={300}
        className={classes.paint_canvas}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={startDrawing}
      />
    </div>
  );
};

export default Canvas;
