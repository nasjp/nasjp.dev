"use client";

import { useEffect, useRef, useState } from "react";

export default function MysticalEye() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const svg = svgRef.current;
    if (!svg) return;

    let mouseX = 300;
    let mouseY = 300;
    let isBlinking = false;
    let pupilSize = 8;

    // Much more dramatic mouse tracking for eye movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 600;
      mouseY = ((e.clientY - rect.top) / rect.height) * 600;

      // Calculate eye movement with MUCH larger range
      const centerX = 300;
      const centerY = 300;
      const maxOffset = 35;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      let offsetX = 0;
      let offsetY = 0;

      if (distance > 0) {
        offsetX = (deltaX / distance) * Math.min(distance / 5, maxOffset);
        offsetY = (deltaY / distance) * Math.min(distance / 5, maxOffset);
      }

      // Pupil dilation based on distance from center
      const distanceFromCenter = Math.min(distance / 10, 20);
      pupilSize = 8 + distanceFromCenter * 0.3;

      // Move the iris and pupil with dramatic effect
      const iris = svg.querySelector("#iris");
      const pupil = svg.querySelector("#pupil");
      const irisTexture = svg.querySelector("#iris-texture");

      if (iris) {
        iris.setAttribute(
          "transform",
          `translate(${offsetX}, ${offsetY}) scale(${1 + distanceFromCenter * 0.01})`,
        );
      }
      if (pupil) {
        pupil.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);
        const pupilCircle = pupil.querySelector("circle");
        if (pupilCircle) {
          pupilCircle.setAttribute("r", pupilSize.toString());
        }
      }
      if (irisTexture) {
        irisTexture.setAttribute(
          "transform",
          `translate(${offsetX}, ${offsetY})`,
        );
      }
    };

    // Blinking animation
    const blink = () => {
      if (isBlinking) return;

      isBlinking = true;
      const eyelids = svg.querySelectorAll(".eyelash-line");

      // Close eye
      eyelids.forEach((line, i) => {
        const currentY2 = line.getAttribute("y2");
        line.setAttribute("data-original-y2", currentY2 || "");
        line.setAttribute("y2", "300"); // Close to center
      });

      // Open eye after 150ms
      setTimeout(() => {
        eyelids.forEach((line) => {
          const originalY2 = line.getAttribute("data-original-y2");
          if (originalY2) {
            line.setAttribute("y2", originalY2);
          }
        });
        isBlinking = false;
      }, 150);
    };

    // Random blinking every 2-4 seconds
    const blinkInterval = setInterval(
      () => {
        if (Math.random() > 0.3) {
          blink();
        }
      },
      2000 + Math.random() * 2000,
    );

    // Add mouse move listener
    document.addEventListener("mousemove", handleMouseMove);

    // SUPER dynamic floating animation for the entire eye
    const eye = svg.querySelector("#central-eye");
    if (eye) {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;

        // Much more dramatic floating
        const floatY =
          Math.sin(elapsed * 1.5) * 8 + Math.cos(elapsed * 0.8) * 3;
        const floatX =
          Math.cos(elapsed * 1.2) * 6 + Math.sin(elapsed * 0.6) * 2;
        const scale =
          1 + Math.sin(elapsed * 2) * 0.08 + Math.cos(elapsed * 1.3) * 0.04;
        const rotation = Math.sin(elapsed * 0.5) * 2;

        eye.setAttribute(
          "transform",
          `translate(${floatX}, ${floatY}) scale(${scale}) rotate(${rotation})`,
        );
        requestAnimationFrame(animate);
      };

      animate();
    }

    // Color shifting iris animation
    const iris = svg.querySelector("#iris circle");
    if (iris) {
      const startTime = Date.now();

      const animateColor = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const saturation = 70 + Math.sin(elapsed * 3) * 20;
        const lightness = 25 + Math.sin(elapsed * 2) * 10;

        iris.setAttribute(
          "fill",
          `hsl(${220 + Math.sin(elapsed) * 40}, ${saturation}%, ${lightness}%)`,
        );
        requestAnimationFrame(animateColor);
      };

      animateColor();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <svg
        ref={svgRef}
        width="600"
        height="600"
        viewBox="0 0 600 600"
        className="w-full h-auto max-w-2xl"
      >
        {/* Background */}
        <rect width="600" height="600" fill="#ffffff" />

        {/* Central eye structure - ONLY eye and eyelashes */}
        <g
          id="central-eye"
          style={{
            transformOrigin: "300px 300px",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Outer eyelash-like radiating lines */}
          {isClient && Array.from({ length: 60 }, (_, i) => {
            const angle = (i * 6 * Math.PI) / 180;
            const innerRadius = 120;
            const outerRadius = 160 + Math.sin(i * 0.5) * 20;
            const x1 = 300 + Math.cos(angle) * innerRadius;
            const y1 = 300 + Math.sin(angle) * innerRadius;
            const x2 = 300 + Math.cos(angle) * outerRadius;
            const y2 = 300 + Math.sin(angle) * outerRadius;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#2c3e50"
                strokeWidth="1.5"
                opacity={0.8}
                className="eyelash-line"
              />
            );
          })}

          {/* Inner detailed radiating pattern */}
          {isClient && Array.from({ length: 40 }, (_, i) => {
            const angle = (i * 9 * Math.PI) / 180;
            const innerRadius = 80;
            const outerRadius = 115;
            const x1 = 300 + Math.cos(angle) * innerRadius;
            const y1 = 300 + Math.sin(angle) * innerRadius;
            const x2 = 300 + Math.cos(angle) * outerRadius;
            const y2 = 300 + Math.sin(angle) * outerRadius;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#2c3e50"
                strokeWidth="1"
                opacity={0.9}
              />
            );
          })}

          {/* Central iris - dark blue circle */}
          <g
            id="iris"
            style={{
              transformOrigin: "300px 300px",
              transition: "transform 0.05s ease-out",
            }}
          >
            <circle
              cx="300"
              cy="300"
              r="75"
              fill="#1e3a8a"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="300"
              r="65"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Add pulsing inner rings */}
            <circle
              cx="300"
              cy="300"
              r="55"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="0.5"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="55;45;55"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="300"
              cy="300"
              r="35"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="0.5"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="35;25;35"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Iris texture lines */}
          <g
            id="iris-texture"
            style={{
              transformOrigin: "300px 300px",
              transition: "transform 0.1s ease-out",
            }}
          >
            {isClient && Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x1 = 300 + Math.cos(angle) * 45;
              const y1 = 300 + Math.sin(angle) * 45;
              const x2 = 300 + Math.cos(angle) * 70;
              const y2 = 300 + Math.sin(angle) * 70;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#3b82f6"
                  strokeWidth="0.8"
                  opacity="0.7"
                />
              );
            })}
          </g>

          {/* Pupil highlight */}
          <g
            id="pupil"
            style={{
              transformOrigin: "300px 300px",
              transition: "transform 0.1s ease-out",
            }}
          >
            <circle cx="290" cy="290" r="8" fill="#60a5fa" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}
