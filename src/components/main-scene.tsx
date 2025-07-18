"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MainScene() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showScrollText, setShowScrollText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 200, y: 600 });
  const [currentText, setCurrentText] = useState("Hey");
  const [eyeOpacity, setEyeOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showProfile, setShowProfile] = useState(false);
  const isBlinkingRef = useRef(false);
  const showScrollTextRef = useRef(false);

  useEffect(() => {
    setIsClient(true);

    // ウィンドウサイズ監視
    const updateWindowSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width < 640);
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // 10秒後にプロフィールに遷移
    const transitionTimer = setTimeout(() => {
      setShowProfile(true);
    }, 10000);

    const svg = svgRef.current;
    if (!svg) {
      clearTimeout(transitionTimer);
      window.removeEventListener("resize", updateWindowSize);
      return;
    }

    // 目のフェードイン（3秒）
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
    let eyeScaleY = 1;

    // まばたきアニメーション
    const blink = (isDouble = false) => {
      if (isBlinkingRef.current) return;

      isBlinkingRef.current = true;
      const eyelids = svg.querySelectorAll(".eyelash-line");

      const originalPositions: { x2: string; y2: string }[] = [];
      for (const line of eyelids) {
        originalPositions.push({
          x2: line.getAttribute("x2") || centerX.toString(),
          y2: line.getAttribute("y2") || centerY.toString(),
        });
      }

      const centralEye = svg.querySelector("#central-eye");
      const eyelashesGroup = svg.querySelector("#eyelashes-group");
      const iris = svg.querySelector("#iris");

      if (centralEye && eyelashesGroup && iris) {
        centralEye.appendChild(eyelashesGroup);
      }

      for (const line of eyelids) {
        line.setAttribute("y2", centerY.toString());
      }

      const pupil = svg.querySelector("#pupil");
      const irisTexture = svg.querySelector("#iris-texture");
      eyeScaleY = 0;

      if (iris) iris.setAttribute("transform", `scale(1, ${eyeScaleY})`);
      if (pupil) pupil.setAttribute("transform", `scale(1, ${eyeScaleY})`);
      if (irisTexture)
        irisTexture.setAttribute("transform", `scale(1, ${eyeScaleY})`);

      setTimeout(() => {
        let index = 0;
        for (const line of eyelids) {
          line.setAttribute("y2", originalPositions[index].y2);
          index++;
        }

        eyeScaleY = 1;
        if (iris) iris.setAttribute("transform", `scale(1, ${eyeScaleY})`);
        if (pupil) pupil.setAttribute("transform", `scale(1, ${eyeScaleY})`);
        if (irisTexture)
          irisTexture.setAttribute("transform", `scale(1, ${eyeScaleY})`);

        if (isDouble) {
          setTimeout(() => {
            for (const line of eyelids) {
              line.setAttribute("y2", centerY.toString());
            }

            eyeScaleY = 0;
            const iris2 = svg.querySelector("#iris");
            const pupil2 = svg.querySelector("#pupil");
            const irisTexture2 = svg.querySelector("#iris-texture");
            if (iris2)
              iris2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
            if (pupil2)
              pupil2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
            if (irisTexture2)
              irisTexture2.setAttribute("transform", `scale(1, ${eyeScaleY})`);

            setTimeout(() => {
              let idx = 0;
              for (const line of eyelids) {
                line.setAttribute("y2", originalPositions[idx].y2);
                idx++;
              }

              eyeScaleY = 1;
              if (iris2)
                iris2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
              if (pupil2)
                pupil2.setAttribute("transform", `scale(1, ${eyeScaleY})`);
              if (irisTexture2)
                irisTexture2.setAttribute(
                  "transform",
                  `scale(1, ${eyeScaleY})`,
                );

              isBlinkingRef.current = false;

              const centralEye = svg.querySelector("#central-eye");
              const eyelashesGroup = svg.querySelector("#eyelashes-group");
              const iris = svg.querySelector("#iris");
              if (centralEye && eyelashesGroup && iris) {
                centralEye.insertBefore(eyelashesGroup, iris);
              }
            }, 150);
          }, 100);
        } else {
          isBlinkingRef.current = false;
        }

        if (centralEye && eyelashesGroup && iris) {
          centralEye.insertBefore(eyelashesGroup, iris);
        }
      }, 150);
    };

    // まばたきタイマー
    const blinkInterval = setInterval(
      () => {
        if (Math.random() > 0.3) {
          blinkCount++;
          const isDoubleBlink = blinkCount % 3 === 0;
          blink(isDoubleBlink);
        }
      },
      1500 + Math.random() * 1500,
    );

    // 目の浮遊アニメーション
    const eye = svg.querySelector("#central-eye");
    if (eye) {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
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

    // 色変化アニメーション
    const iris = svg.querySelector("#iris circle");
    if (iris) {
      const startTime = Date.now();

      const animateColor = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const loopDuration = 20;
        const loopTime = elapsed % loopDuration;

        if (loopTime < 5) {
          iris.setAttribute("fill", "hsl(0, 0%, 20%)");
        } else if (loopTime < 8) {
          const fadeProgress = (loopTime - 5) / 3;
          const lightness = 20 + fadeProgress * 20;
          iris.setAttribute("fill", `hsl(0, 0%, ${lightness}%)`);
        } else if (loopTime < 17) {
          const adjustedTime = loopTime - 8;
          const lightness = 40 + Math.sin(adjustedTime * 0.8) * 15;
          iris.setAttribute("fill", `hsl(0, 0%, ${lightness}%)`);
        } else {
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

    // まつげアニメーション
    const animateEyelashes = () => {
      const eyelashLines = svg.querySelectorAll(".eyelash-line");
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        let index = 0;
        for (const line of eyelashLines) {
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

          const wavePhase = elapsed * 2 + index * 0.2;
          const lengthMultiplier = 1 + Math.sin(wavePhase) * 0.3;

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

    setTimeout(() => {
      animateEyelashes();
    }, 100);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(transitionTimer);
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  // ループ機能: プロフィールシーン表示後に目のシーンに戻る遷移
  useEffect(() => {
    if (!showProfile) return;

    const loopTimer = setTimeout(() => {
      setShowProfile(false);
    }, 10000); // 10秒後に目のシーンに戻る

    return () => {
      clearTimeout(loopTimer);
    };
  }, [showProfile]);

  // ループ機能: 目のシーン表示後にプロフィールシーンに戻る遷移
  useEffect(() => {
    if (showProfile) return;

    const returnTimer = setTimeout(() => {
      setShowProfile(true);
    }, 10000); // 10秒後にプロフィールシーンに戻る

    return () => {
      clearTimeout(returnTimer);
    };
  }, [showProfile]);

  // 目のシーン表示時にテキスト表示を1回実行
  useEffect(() => {
    if (showProfile) return;

    const textTimer = setTimeout(() => {
      const showTextAtRandomPosition = () => {
        const casualGreetings = [
          "Hey",
          "Yo",
          "Sup?",
          "Howdy",
          "Hey there",
          "Morning!",
          "Evening!",
          "You good?",
          "All good?",
          "Yo dude",
          "Hey you",
          "Hiya",
          "OK?",
          "Heya",
          "You there?",
        ];

        const displayText =
          casualGreetings[Math.floor(Math.random() * casualGreetings.length)];
        setCurrentText(displayText);

        let angle: number;
        const currentIsMobile = window.innerWidth < 640;

        if (currentIsMobile) {
          const ranges = [
            { min: 45, max: 135 },
            { min: 225, max: 315 },
          ];
          const selectedRange =
            ranges[Math.floor(Math.random() * ranges.length)];
          const degrees =
            selectedRange.min +
            Math.random() * (selectedRange.max - selectedRange.min);
          angle = (degrees * Math.PI) / 180;
        } else {
          angle = Math.random() * Math.PI * 2;
        }

        const baseDistance = 180;
        const randomOffset = currentIsMobile ? 30 : 40;
        const distance = baseDistance + Math.random() * randomOffset;

        const centerX = 400;
        const centerY = 400;
        const x = centerX + Math.cos(angle) * distance - 50;
        const y = centerY + Math.sin(angle) * distance;

        setTextPosition({ x, y });

        setShowScrollText(true);
        showScrollTextRef.current = true;
        setTimeout(() => {
          setShowScrollText(false);
          showScrollTextRef.current = false;
        }, 1000);
      };

      showTextAtRandomPosition();
    }, 6000); // フェード完了後（5秒）+ 1秒余裕でテキスト表示

    return () => {
      clearTimeout(textTimer);
    };
  }, [showProfile]);

  // レスポンシブスタイル計算
  const getSvgStyle = () => {
    const { width } = windowSize;
    if (width < 640) {
      // モバイル
      return { width: "85vw", height: "85vw" };
    }
    if (width < 768) {
      // sm: タブレット
      return { width: "100%", height: "auto", maxWidth: "576px" };
    }
    if (width < 1024) {
      // md: デスクトップ
      return { width: "100%", height: "auto", maxWidth: "672px" };
    }
    // lg: 大画面
    return { width: "100%", height: "auto", maxWidth: "768px" };
  };

  const getProfileContainerStyle = () => {
    const { width } = windowSize;
    return {
      position: "absolute" as const,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      padding: width >= 640 ? "16px" : "0",
      opacity: showProfile ? 1 : 0,
      transition: "opacity 5s ease-in-out",
    };
  };

  const getImageContainerStyle = () => {
    const { width } = windowSize;
    return {
      width: width >= 640 ? "300px" : "60vw",
      height: width >= 640 ? "300px" : "60vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const getGapStyle = () => {
    const { width } = windowSize;
    return {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: width >= 640 ? "24px" : "16px",
    };
  };

  const getTitleStyle = () => {
    const { width } = windowSize;
    return {
      fontSize: width >= 640 ? "3rem" : "2.25rem", // text-5xl : text-4xl
      lineHeight: width >= 640 ? "1" : "1",
      fontWeight: "bold" as const,
      margin: 0,
    };
  };

  const getTextStyle = () => {
    return {
      fontSize: "0.875rem", // text-sm
      color: "#4b5563", // text-gray-600
      textAlign: "center" as const,
      maxWidth: "28rem", // max-w-md
      lineHeight: "1.625", // leading-relaxed
      margin: 0,
    };
  };

  return (
    <div
      style={{
        height: "100dvh",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 目のシーン */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          overflow: "hidden",
          opacity: showProfile ? 0 : 1,
          transition: "opacity 5s ease-in-out",
        }}
      >
        <svg
          ref={svgRef}
          width="800"
          height="800"
          viewBox={isMobile ? "100 100 600 600" : "0 0 800 800"}
          style={getSvgStyle()}
        >
          <title>nasjp.dev's watching you</title>
          <rect width="800" height="800" fill="#ffffff" />

          <g
            id="central-eye"
            style={{
              transformOrigin: "400px 400px",
              transition: "transform 0.3s ease",
              opacity: eyeOpacity,
            }}
          >
            {/* まつげグループ */}
            <g id="eyelashes-group">
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
                      key={`eyelash-outer-${angle.toFixed(4)}-${innerRadius}-${outerRadius.toFixed(2)}`}
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
                      key={`eyelash-inner-${angle.toFixed(4)}-${innerRadius}-${outerRadius}`}
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

            {/* 虹彩 */}
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

            {/* 虹彩のテクスチャ */}
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
                      key={`iris-texture-${angle.toFixed(4)}-${x1.toFixed(1)}-${y1.toFixed(1)}`}
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

            {/* 瞳孔のハイライト */}
            <g
              id="pupil"
              style={{
                transformOrigin: "400px 400px",
                transition: "transform 0.15s ease-out",
              }}
            >
              <circle cx="390" cy="390" r="8" fill="#d0d0d0" opacity="0.8" />
            </g>

            {/* 挨拶テキスト */}
            <text
              x={textPosition.x}
              y={textPosition.y}
              fontSize="28"
              fontFamily="inherit"
              fontWeight="700"
              fill="#000000"
              opacity={showScrollText ? 0.9 : 0}
              style={{
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {currentText}
            </text>
          </g>
        </svg>
      </div>

      {/* プロフィールシーン */}
      <div style={getProfileContainerStyle()}>
        <div style={getGapStyle()}>
          <div style={getImageContainerStyle()}>
            <Image
              src="/gohan.webp"
              alt="Gohan"
              width={360}
              height={343}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%",
                objectFit: "contain",
                filter: "contrast(1.25) brightness(1.1) saturate(0)",
              }}
            />
          </div>
          <h1 style={getTitleStyle()}>nasjp.dev</h1>
          <p style={getTextStyle()}>
            Software engineer, looking for
            <br />
            an adrenaline-pumping opportunity
          </p>
        </div>
      </div>
    </div>
  );
}
