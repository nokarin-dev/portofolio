"use client";

import { useRef, useEffect } from "react";
import { useMousePosition } from "@/lib/mouse";
import { useTheme } from "./theme-provider";

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    refresh?: boolean;
}

export default function Particle({
    className = "",
    quantity = 40,
    staticity = 50,
    ease = 50,
    refresh = false,
}: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<any[]>([]);
    const mousePosition = useMousePosition();
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    const { theme } = useTheme();
    const particleColorRGB = useRef<string>("255, 255, 255");
    const activeQuantity = useRef<number>(quantity);

    const updateParticleColor = () => {
        particleColorRGB.current = theme === "light" ? "24, 24, 27" : "255, 255, 255";

        if (typeof window !== "undefined") {
            const isMobile = window.innerWidth < 768;
            activeQuantity.current = isMobile ? Math.floor(quantity / 3) : quantity;
        }
    };

    useEffect(() => {
        updateParticleColor();
        initCanvas();
    }, [theme]);

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d");
        }

        let animationFrameId: number;

        const layoutPaintDelay = setTimeout(() => {
            updateParticleColor();
            initCanvas();

            const loop = () => {
                animateFrame();
                animationFrameId = window.requestAnimationFrame(loop);
            };
            loop();
        }, 100);

        window.addEventListener("resize", initCanvas);

        return () => {
            clearTimeout(layoutPaintDelay);
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", initCanvas);
        };
    }, []);

    useEffect(() => {
        onMouseMove();
    }, [mousePosition.x, mousePosition.y]);

    useEffect(() => {
        initCanvas();
    }, [refresh]);

    const initCanvas = () => {
        resizeCanvas();
        drawParticles();
    };

    const onMouseMove = () => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const { w, h } = canvasSize.current;
            const x = mousePosition.x - rect.left - w / 2;
            const y = mousePosition.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
            }
        }
    };

    type Circle = { x: number; y: number; translateX: number; translateY: number; size: number; alpha: number; targetAlpha: number; dx: number; dy: number; magnetism: number; };

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            context.current.scale(dpr, dpr);
        }
    };

    const circleParams = (): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const size = Math.floor(Math.random() * 2) + 0.1;
        const targetAlpha = parseFloat((Math.random() * 0.4 + 0.05).toFixed(2));
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const magnetism = 0.1 + Math.random() * 4;
        return { x, y, translateX: 0, translateY: 0, size, alpha: 0, targetAlpha, dx, dy, magnetism };
    };

    const drawCircle = (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = `rgba(${particleColorRGB.current}, ${alpha})`;
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!update) circles.current.push(circle);
        }
    };

    const drawParticles = () => {
        if (context.current) context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        for (let i = 0; i < activeQuantity.current; i++) drawCircle(circleParams());
    };

    const animateFrame = () => {
        if (context.current) context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

        circles.current.forEach((circle: Circle, i: number) => {
            const e1 = circle.x + circle.translateX - circle.size;
            const e2 = canvasSize.current.w - circle.x - circle.translateX - circle.size;
            const e3 = circle.y + circle.translateY - circle.size;
            const e4 = canvasSize.current.h - circle.y - circle.translateY - circle.size;

            const closestEdge = Math.min(e1, e2, e3, e4);
            const remapClosestEdge = closestEdge > 20 ? 1 : Math.max(0, closestEdge / 20);

            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            circle.x += circle.dx;
            circle.y += circle.dy;
            circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
            circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

            if (
                circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
                circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size
            ) {
                circles.current.splice(i, 1);
                drawCircle(circleParams());
            } else {
                drawCircle({ ...circle }, true);
            }
        });
    };

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true" draggable="false">
            <canvas ref={canvasRef} />
        </div>
    );
}