"use client";

import { useEffect, useRef, useState } from "react";

export default function MysticalEye() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showScrollText, setShowScrollText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 200, y: 600 });
  const [eyeOpacity, setEyeOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isBlinkingRef = useRef(false);
  const showScrollTextRef = useRef(false);

  useEffect(() => {
    setIsClient(true);

    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const svg = svgRef.current;
    if (!svg) return;

    // 3秒かけてフェードイン
    const fadeInDuration = 3000;
    const fadeInStartTime = Date.now();

    const fadeIn = () => {
      const elapsed = Date.now() - fadeInStartTime;
      const progress = Math.min(elapsed / fadeInDuration, 1);
      setEyeOpacity(progress);

      if (progress < 1) {
        requestAnimationFrame(fadeIn);
      }
    };
    fadeIn();

    const centerX = 400;
    const centerY = 400;
    let blinkCount = 0;
    let eyeScaleY = 1; // Track eye scale for blinking

    // Blinking animation
    const blink = (isDouble = false) => {
      if (isBlinkingRef.current) return;

      isBlinkingRef.current = true;
      const eyelids = svg.querySelectorAll(".eyelash-line");

      // Store current positions before closing
      const originalPositions: { x2: string; y2: string }[] = [];
      for (const line of eyelids) {
        originalPositions.push({
          x2: line.getAttribute("x2") || centerX.toString(),
          y2: line.getAttribute("y2") || centerY.toString(),
        });
      }

      // Move eyelashes to front and close eye
      const centralEye = svg.querySelector("#central-eye");
      const eyelashesGroup = svg.querySelector("#eyelashes-group");
      const iris = svg.querySelector("#iris");

      if (centralEye && eyelashesGroup && iris) {
        // Move eyelashes group after iris so it appears on top
        centralEye.appendChild(eyelashesGroup);
      }

      // Close eye
      for (const line of eyelids) {
        line.setAttribute("y2", centerY.toString()); // Close to center
      }

      // Hide iris and pupil
      const pupil = svg.querySelector("#pupil");
      const irisTexture = svg.querySelector("#iris-texture");
      eyeScaleY = 0;

      // Apply scale transform
      if (iris) {
        iris.setAttribute("transform", `scale(1, ${eyeScaleY})`);
      }
      if (pupil) {
        pupil.setAttribute("transform", `scale(1, ${eyeScaleY})`);
      }
      if (irisTexture) {
        irisTexture.setAttribute("transform", `scale(1, ${eyeScaleY})`);
      }

      // Open eye after 150ms
      setTimeout(() => {
        // Restore original positions
        let index = 0;
        for (const line of eyelids) {
          line.setAttribute("y2", originalPositions[index].y2);
          index++;
        }

        // Show iris and pupil
        eyeScaleY = 1;

        // Apply scale transform
        if (iris) {
          iris.setAttribute("transform", `scale(1, ${eyeScaleY})`);
        }
        if (pupil) {
          pupil.setAttribute("transform", `scale(1, ${eyeScaleY})`);
        }
        if (irisTexture) {
          irisTexture.setAttribute("transform", `scale(1, ${eyeScaleY})`);
        }

        // If double blink, do second blink
        if (isDouble) {
          setTimeout(() => {
            // Close again
            for (const line of eyelids) {
              line.setAttribute("y2", centerY.toString());
            }

            // Hide iris and pupil again
            eyeScaleY = 0;

            // Apply scale transform
            const iris2 = svg.querySelector("#iris");
            const pupil2 = svg.querySelector("#pupil");
            const irisTexture2 = svg.querySelector("#iris-texture");
            if (iris2) {
              iris2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
            }
            if (pupil2) {
              pupil2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
            }
            if (irisTexture2) {
              irisTexture2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
            }

            // Open again
            setTimeout(() => {
              // Restore original positions
              let idx = 0;
              for (const line of eyelids) {
                line.setAttribute("y2", originalPositions[idx].y2);
                idx++;
              }

              // Show iris and pupil again
              eyeScaleY = 1;

              // Apply scale transform
              if (iris2) {
                iris2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
              }
              if (pupil2) {
                pupil2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
              }
              if (irisTexture2) {
                irisTexture2.setAttribute(
                  "transform",
                  `scale(1, ${eyeScaleY})`,
                );
              }

              isBlinkingRef.current = false;

              // Move eyelashes back behind iris after double blink
              const centralEye = svg.querySelector("#central-eye");
              const eyelashesGroup = svg.querySelector("#eyelashes-group");
              const iris = svg.querySelector("#iris");
              if (centralEye && eyelashesGroup && iris) {
                centralEye.insertBefore(eyelashesGroup, iris);
              }
            }, 150);
          }, 100); // Shorter pause between blinks
        } else {
          isBlinkingRef.current = false;
        }

        // Move eyelashes back behind iris
        if (centralEye && eyelashesGroup && iris) {
          centralEye.insertBefore(eyelashesGroup, iris);
        }
      }, 150);
    };

    // Random blinking every 1.5-3 seconds
    const blinkInterval = setInterval(
      () => {
        if (Math.random() > 0.3) {
          blinkCount++;
          // Every 3rd blink is a double blink
          const isDoubleBlink = blinkCount % 3 === 0;
          blink(isDoubleBlink);
        }
      },
      1500 + Math.random() * 1500,
    );

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
        // 20秒周期でループ（黒5秒 + フェード3秒 + グラデーション9秒 + 黒に戻るフェード3秒）
        const loopDuration = 20;
        const loopTime = elapsed % loopDuration;

        if (loopTime < 5) {
          // 0〜5秒：黒（20%）
          iris.setAttribute("fill", "hsl(0, 0%, 20%)");
        } else if (loopTime < 8) {
          // 5〜8秒：黒からグレーにじわーっと変化
          const fadeProgress = (loopTime - 5) / 3;
          const lightness = 20 + fadeProgress * 20;
          iris.setAttribute("fill", `hsl(0, 0%, ${lightness}%)`);
        } else if (loopTime < 17) {
          // 8〜17秒：グラデーションアニメーション（25%から55%）
          const adjustedTime = loopTime - 8;
          const lightness = 40 + Math.sin(adjustedTime * 0.8) * 15;
          iris.setAttribute("fill", `hsl(0, 0%, ${lightness}%)`);
        } else {
          // 17〜20秒：グレーから黒にじわーっと戻る
          // 17秒時点のグラデーション値を計算
          const endGradientValue = 40 + Math.sin(9 * 0.8) * 15;
          const fadeProgress = (loopTime - 17) / 3;
          const lightness =
            endGradientValue - (endGradientValue - 20) * fadeProgress;
          iris.setAttribute("fill", `hsl(0, 0%, ${lightness}%)`);
        }

        requestAnimationFrame(animateColor);
      };

      animateColor();
    }

    // Eyelash length animation
    const animateEyelashes = () => {
      const eyelashLines = svg.querySelectorAll(".eyelash-line");
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;

        let index = 0;
        for (const line of eyelashLines) {
          // Skip animation if blinking
          if (isBlinkingRef.current) {
            index++;
            continue;
          }

          const x1 = Number.parseFloat(
            line.getAttribute("x1") || centerX.toString(),
          );
          const y1 = Number.parseFloat(
            line.getAttribute("y1") || centerY.toString(),
          );
          const angle = Math.atan2(y1 - centerY, x1 - centerX);

          // Create wave effect with phase shift based on index
          const wavePhase = elapsed * 2 + index * 0.2;
          const lengthMultiplier = 1 + Math.sin(wavePhase) * 0.3;

          // Calculate new endpoint based on original angle and varying length
          const baseLength = index < 60 ? 40 + Math.sin(index * 0.5) * 20 : 35;
          const newLength = baseLength * lengthMultiplier;
          const x2 = x1 + Math.cos(angle) * newLength;
          const y2 = y1 + Math.sin(angle) * newLength;

          line.setAttribute("x2", x2.toString());
          line.setAttribute("y2", y2.toString());
          index++;
        }

        requestAnimationFrame(animate);
      };

      animate();
    };

    // Start eyelash animation after a short delay
    setTimeout(() => {
      animateEyelashes();
    }, 100);

    // Function to show text at random position around eye
    const showTextAtRandomPosition = () => {
      // Random angle around the eye
      const angle = Math.random() * Math.PI * 2;
      // Distance from center (outside eyelashes)
      const baseDistance = 180;
      const randomOffset = isMobile ? 30 : 40;
      const distance = baseDistance + Math.random() * randomOffset;

      // Calculate position
      const x = centerX + Math.cos(angle) * distance - 50; // Offset for text width
      const y = centerY + Math.sin(angle) * distance;

      // Set position
      setTextPosition({ x, y });

      setShowScrollText(true);
      showScrollTextRef.current = true;
      setTimeout(() => {
        setShowScrollText(false);
        showScrollTextRef.current = false;
      }, 1000);
    };

    // Show scroll text periodically
    const scrollTextInterval = setInterval(showTextAtRandomPosition, 5000);

    // Show scroll text initially after 2 seconds
    setTimeout(showTextAtRandomPosition, 2000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(scrollTextInterval);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-0 overflow-hidden">
      <svg
        ref={svgRef}
        width="800"
        height="800"
        viewBox={isMobile ? "100 100 600 600" : "0 0 800 800"}
        className="w-[85vw] h-[85vw] sm:w-full sm:h-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      >
        <title>nasjp.dev's watching you</title>
        {/* Background */}
        <rect width="800" height="800" fill="#ffffff" />

        {/* Central eye structure - ONLY eye and eyelashes */}
        <g
          id="central-eye"
          style={{
            transformOrigin: "400px 400px",
            transition: "transform 0.3s ease",
            opacity: eyeOpacity,
          }}
        >
          {/* Eyelashes group */}
          <g id="eyelashes-group">
            {/* Outer eyelash-like radiating lines */}
            {isClient &&
              Array.from({ length: 60 }, (_, i) => {
                const angle = (i * 6 * Math.PI) / 180;
                const innerRadius = 120;
                const outerRadius = 160 + Math.sin(i * 0.5) * 20;
                const x1 = 400 + Math.cos(angle) * innerRadius;
                const y1 = 400 + Math.sin(angle) * innerRadius;
                const x2 = 400 + Math.cos(angle) * outerRadius;
                const y2 = 400 + Math.sin(angle) * outerRadius;

                return (
                  <line
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static array with fixed positions
                    key={`eyelash-outer-${i}`}
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
            {isClient &&
              Array.from({ length: 40 }, (_, i) => {
                const angle = (i * 9 * Math.PI) / 180;
                const innerRadius = 80;
                const outerRadius = 115;
                const x1 = 400 + Math.cos(angle) * innerRadius;
                const y1 = 400 + Math.sin(angle) * innerRadius;
                const x2 = 400 + Math.cos(angle) * outerRadius;
                const y2 = 400 + Math.sin(angle) * outerRadius;

                return (
                  <line
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static array with fixed positions
                    key={`eyelash-inner-${i}`}
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
          </g>

          {/* Central iris - dark blue circle */}
          <g
            id="iris"
            style={{
              transformOrigin: "400px 400px",
              transition: "transform 0.15s ease-out",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="75"
              fill="#4a4a4a"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <circle
              cx="400"
              cy="400"
              r="65"
              fill="none"
              stroke="#707070"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Add pulsing inner rings */}
            <circle
              cx="400"
              cy="400"
              r="55"
              fill="none"
              stroke="#909090"
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
              cx="400"
              cy="400"
              r="35"
              fill="none"
              stroke="#b0b0b0"
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
              transformOrigin: "400px 400px",
              transition: "transform 0.15s ease-out",
            }}
          >
            {isClient &&
              Array.from({ length: 16 }, (_, i) => {
                const angle = (i * 22.5 * Math.PI) / 180;
                const x1 = 400 + Math.cos(angle) * 45;
                const y1 = 400 + Math.sin(angle) * 45;
                const x2 = 400 + Math.cos(angle) * 70;
                const y2 = 400 + Math.sin(angle) * 70;

                return (
                  <line
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static array with fixed positions
                    key={`iris-texture-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#707070"
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
              transformOrigin: "400px 400px",
              transition: "transform 0.15s ease-out",
            }}
          >
            <circle cx="390" cy="390" r="8" fill="#d0d0d0" opacity="0.8" />
          </g>

          {/* Scroll down text */}
          <text
            x={textPosition.x}
            y={textPosition.y}
            fontSize="28"
            fontFamily="'Noto Serif JP', serif"
            fontWeight="700"
            fill="#000000"
            opacity={showScrollText ? 0.9 : 0}
            style={{
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            scroll down
          </text>
        </g>
      </svg>
    </div>
  );
}
