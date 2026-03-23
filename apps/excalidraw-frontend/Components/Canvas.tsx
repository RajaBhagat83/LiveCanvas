"use client";
import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";

export default function CanvasComponent({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [type, setType] = useState('line')
  const typeRef = useRef('line')
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width,setWidth] = useState<number>(); 
  const [height,setHeight] = useState<number>(); 
  const canvas = canvasRef.current;
  

  // Keep typeRef in sync whenever the user switches tools
  useEffect(() => {
    typeRef.current = type;
  }, [type]);

  useEffect(() => {
    if (canvasRef.current && socket) {
      const cleanup = initDraw(canvasRef.current, roomId, socket, typeRef);
      return () => {
        cleanup.then((clean) => {
          clean?.();
        })
      }
    }
  // Do NOT include type/typeRef here — we want initDraw to run only once
  // per canvas/socket/roomId, and read the latest type via the ref.
  }, [canvasRef, socket, roomId]);
  
useEffect(() => {
  const resizeCanvas = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  resizeCanvas(); // initial full size

  window.addEventListener("resize", resizeCanvas);

  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}, []);
return (
  <div
    style={{
      height: "100vh",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      className="border-4"
    ></canvas>

    {/* 🎯 Floating Toolbar (Excalidraw Style) */}
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-2xl px-4 py-2 flex gap-3 items-center border">
      
      <button
        className={`p-2 px-4 rounded-xl border ${
          type === "rect" ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => setType("rect")}
      >
        Rect
      </button>

      <button
        className={`p-2 px-4 rounded-xl border ${
          type === "circle" ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => setType("circle")}
      >
        Circle
      </button>

      <button
        className={`p-2 px-4 rounded-xl border ${
          type === "line" ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => setType("line")}
      >
        Line
      </button>

      <button
        className={`p-2 px-4 rounded-xl border ${
          type === "eraser" ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => {
          setType("eraser");
        }}
      >
        Eraser
      </button>
    </div>
  </div>
);
}
