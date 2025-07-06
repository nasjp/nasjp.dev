"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const colors = [
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#808040",
  "#004040",
  "#0080FF",
  "#004080",
  "#8000FF",
  "#804000",
  "#FFFFFF",
  "#C0C0C0",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFF80",
  "#00FF80",
  "#80FFFF",
  "#8080FF",
  "#FF0080",
  "#FF8040",
];

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    
    if (context && canvas && container) {
      // コンテナのサイズを取得
      const containerRect = container.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      
      // アスペクト比を維持しながらサイズを計算
      const aspectRatio = 4 / 3; // 800:600の比率
      let width = containerRect.width;
      let height = width / aspectRatio;
      
      if (height > containerRect.height) {
        height = containerRect.height;
        width = height * aspectRatio;
      }
      
      // キャンバスのサイズを設定
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(scale, scale);
      
      // 白い背景を描画
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, width, height);

      // 自己紹介文を描画
      context.fillStyle = "#000000";
      // フォントサイズをキャンバスの幅に基づいて計算
      const baseFontSize = width / 40; // キャンバス幅の1/40
      const fontSize = Math.max(12, Math.min(24, baseFontSize)); // 12px〜24pxの範囲内
      context.font = `${fontSize}px Arial`;
      
      // テキストを折り返して描画する関数
      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split('');
        let line = '';
        let currentY = y;
        
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n];
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, currentY);
            line = words[n];
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, x, currentY);
        return currentY + lineHeight;
      };
      
      const lines = [
        "こんにちは、nasjp.devです。",
        "",
        "ソフトウェアエンジニアとして7年間の経験を積み、現在は株式会社コルモアナでCTOを務めています。",
        "",
        "WEBアプリケーションの0から1の開発が最も得意です。",
        "",
        "シンプルで効果的な技術を通じて、新しい価値を生み出すことを目指しています。",
      ];

      const margin = width * 0.05; // 幅の5%をマージンとして使用
      const x = margin;
      let y = height * 0.1; // 高さの10%から開始
      const maxWidth = width - (margin * 2);
      const lineHeight = fontSize * 1.5;
      
      lines.forEach((line) => {
        if (line === "") {
          y += lineHeight;
        } else {
          y = wrapText(line, x, y, maxWidth, lineHeight);
        }
      });
    }
  };

  useEffect(() => {
    resizeCanvas();
    
    // ウィンドウリサイズ時にキャンバスを再描画
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width) / (window.devicePixelRatio || 1);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height) / (window.devicePixelRatio || 1);
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width) / (window.devicePixelRatio || 1);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height) / (window.devicePixelRatio || 1);
      context.lineTo(x, y);
      context.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      context.lineWidth = tool === "eraser" ? 20 : 2;
      context.lineCap = "round";
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPosition({
      x: e.clientX - (containerRef.current?.offsetLeft || 0),
      y: e.clientY - (containerRef.current?.offsetTop || 0),
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const left = e.clientX - position.x;
      const top = e.clientY - position.y;
      if (containerRef.current) {
        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.top = `${top}px`;
      }
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  if (!isVisible) {
    return <div className="h-screen" />;
  }

  return (
    <div className="h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="absolute border-2 border-white shadow-md w-[90vw] md:w-[700px] lg:w-[800px] max-w-[90vw]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center cursor-move"
          onMouseDown={startDragging}
          onMouseMove={onDrag}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          <span className="text-xs sm:text-sm">nasjp.dev - Paint</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              className="h-5 w-5 sm:h-5 sm:w-5 p-0 min-w-0 text-white hover:bg-blue-700"
            >
              _
            </Button>
            <Button
              variant="ghost"
              className="h-5 w-5 sm:h-5 sm:w-5 p-0 min-w-0 text-white hover:bg-blue-700"
            >
              □
            </Button>
            <Button
              variant="ghost"
              className="h-5 w-5 sm:h-5 sm:w-5 p-0 min-w-0 text-white hover:bg-blue-700"
              onClick={() => setIsVisible(false)}
            >
              ×
            </Button>
          </div>
        </div>
        <div className="bg-gray-300 px-2 py-1 text-sm overflow-x-auto whitespace-nowrap">
          <span className="mr-4">File</span>
          <span className="mr-4">Edit</span>
          <span className="mr-4 hidden sm:inline">View</span>
          <span className="mr-4 hidden sm:inline">Image</span>
          <span className="mr-4 hidden md:inline">Options</span>
          <span className="hidden md:inline">Help</span>
        </div>
        <div className="flex">
          <div className="w-8 bg-gray-300 p-0.5 border-r border-gray-400">
            <Button
              variant="ghost"
              className={`w-7 h-7 p-0 min-w-0 mb-0.5 ${tool === "brush" ? "bg-gray-300 border border-gray-400 shadow-inner" : ""}`}
              onClick={() => setTool("brush")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 12l-8-8-6 6c-2 2-2 5 0 7s5 2 7 0l7-7" />
                <path d="M17 7l3 3" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className={`w-7 h-7 p-0 min-w-0 mb-0.5 ${tool === "eraser" ? "bg-gray-300 border border-gray-400 shadow-inner" : ""}`}
              onClick={() => setTool("eraser")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
                <path d="M17 17L7 7" />
              </svg>
            </Button>
          </div>
          <div
            className="flex-grow overflow-hidden border border-gray-400 h-[50vh] md:h-[400px] lg:h-[500px] bg-[#c0c0c0] flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
        </div>
        <div className="flex bg-gray-300 p-1 border-t border-gray-400">
          <div className="flex flex-wrap gap-1">
            {colors.map((c) => (
              <Button
                key={c}
                variant="ghost"
                className={`w-6 h-6 p-0 min-w-0 ${color === c ? "ring-1 ring-gray-600" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        <div className="bg-gray-300 px-2 py-1 text-sm border-t border-gray-400">
          Hi, I'm nasjp.dev.
        </div>
      </div>
    </div>
  );
}
