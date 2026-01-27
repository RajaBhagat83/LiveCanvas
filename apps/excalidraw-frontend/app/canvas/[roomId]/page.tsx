"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let clicked = false;
      canvas.addEventListener("mouseup", (e) => {
        if (clicked) {
          console.log("Mouse up", e.clientX);
          console.log("Mouse up", e.clientY);
        }
      });
      canvas.addEventListener("mousemove", (e) => {
        clicked = false;
        console.log(e.clientX);
        console.log(e.clientY);
      });
      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        console.log("Mouse up", e.clientX);
        console.log("Mouse up", e.clientY);
      });
    }
  }, [canvasRef]);
  return (
    <div>
      <canvas ref={canvasRef} className="h-screen w-screen"></canvas>
    </div>
  );
}
