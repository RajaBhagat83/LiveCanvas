"use client";
import initDraw from "@/draw";
import { useEffect, useRef } from "react";

export default function CanvasComponent({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    socket?.send(
      JSON.stringify({
        type: "join_room",
        roomId: roomId,
      }),
    );

    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div className="h-screen w-screen border-4  text-white">
      <canvas
        ref={canvasRef}
        height={1200}
        width={1500}
        className="border-4 "
      ></canvas>
    </div>
  );
}
