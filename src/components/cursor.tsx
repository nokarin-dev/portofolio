"use client";

import * as motion from "motion/react-client";
import { useMotionValue } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CursorMode = "default" | "large" | "outline" | "caret" | "hidden" | "content" | "drag";

const DEFAULT_SIZE = 14;
const CARET_W = 2;
const CARET_H = 22;

function isTextElement(el: Element | null) {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "textarea") return true;
    if (tag === "input") {
        const t = (el as HTMLInputElement).type || "text";
        return ["text", "search", "email", "password", "url", "tel"].includes(t);
    }
    if (el.getAttribute && el.getAttribute("contenteditable") === "true") return true;
    return ["p", "span", "label", "b", "i", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "li", "div"].includes(tag);
}

function getTextHeight(el: Element | null) {
    if (!el) return CARET_H;
    const styles = window.getComputedStyle(el);
    const lineHeight = parseFloat(styles.lineHeight);
    const fontSize = parseFloat(styles.fontSize);

    if (!isNaN(lineHeight)) {
        return Math.max(lineHeight, 16);
    } else if (!isNaN(fontSize)) {
        return Math.max(fontSize * 1.2, 16);
    }

    return CARET_H;
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <CursorShell />
            {children}
        </div>
    );
}

function CursorShell() {
    const mx = useMotionValue(-9999);
    const my = useMotionValue(-9999);

    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<CursorMode>("default");
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [forceHide, setForceHide] = useState(false);
    const [coreSize, setCoreSize] = useState(DEFAULT_SIZE);
    const [coreRadius, setCoreRadius] = useState(DEFAULT_SIZE / 2);
    const [coreScale, setCoreScale] = useState(1);
    const [caretHeight, setCaretHeight] = useState(CARET_H);
    const hoverTarget = useRef<Element | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);

            if (!visible) setVisible(true);
        };

        const onPointerEnter = () => setVisible(true);

        const onMouseOut = (e: MouseEvent) => {
            if ((e as any).relatedTarget === null) setVisible(false);
        };

        const onVisibility = () => {
            if (document.visibilityState === "visible") setVisible(true);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerenter", onPointerEnter);
        window.addEventListener("mouseout", onMouseOut);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerenter", onPointerEnter);
            window.removeEventListener("mouseout", onMouseOut);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [visible, mx, my]);

    useEffect(() => {
        const selector = "[data-cursor], [data-cursor-content], a, button, input, textarea, [contenteditable='true'], p, span, label, h1, h2, h3, h4, h5, h6";

        const handleEnter = (el: Element) => {
            hoverTarget.current = el;
            
            if (isTextElement(el)) {
                const height = getTextHeight(el);
                setMode("caret");
                setCoreSize(CARET_W);
                setCaretHeight(height);
                setCoreRadius(1);
                setCoreScale(1);
                setContent(null);
                return;
            }

            const custom = el.getAttribute("data-cursor-content");
            if (custom !== null) {
                setMode("content");
                setContent(custom);
                setCoreSize(DEFAULT_SIZE);
                setCoreRadius(8);
                setCoreScale(1);
                return;
            }

            setMode("default");
            setCoreSize(DEFAULT_SIZE);
            setCoreRadius(DEFAULT_SIZE / 2);
            setCoreScale(1);
        };

        const handleLeave = (el: Element) => {
            if (hoverTarget.current === el) {
                hoverTarget.current = null;
                setMode("default");
                setContent(null);
                setCoreSize(DEFAULT_SIZE);
                setCoreRadius(DEFAULT_SIZE / 2);
                setCoreScale(1);
                setCaretHeight(CARET_H);
            }
        };

        const onOver = (e: Event) => {
            const target = e.target as Element | null;
            if (!target) return;
            const hit = target.closest(selector) as Element | null;
            if (hit) handleEnter(hit);
        };

        const onOut = (e: Event) => {
            const target = e.target as Element | null;
            if (!target) return;
            const hit = target.closest(selector) as Element | null;
            if (hit) handleLeave(hit);
        };

        document.addEventListener("mouseover", onOver, { passive: true });
        document.addEventListener("mouseout", onOut, { passive: true });

        return () => {
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)");
        setEnabled(mq.matches);

        const handler = (e: MediaQueryListEvent) => {
            setEnabled(e.matches);
        };
        mq.addEventListener("change", handler);

        return () => mq.removeEventListener("change", handler);
    }, []);

    if (!mounted) return null;
    if (!enabled) return null;

    return createPortal(
        <div aria-hidden style={{ pointerEvents: "none" }}>
            {!forceHide && visible && (
                <Core
                    x={mx}
                    y={my}
                    size={coreSize}
                    radius={coreRadius}
                    scale={coreScale}
                    mode={mode}
                    content={content}
                    caretHeight={caretHeight}
                />
            )}
        </div>,
        document.body
    );
}

function Core({ x, y, size, radius, scale, mode, content, caretHeight }: {
    x: any;
    y: any;
    size: number;
    radius: number | number;
    scale: number;
    mode: CursorMode;
    content: React.ReactNode | null;
    caretHeight: number;
}) {
    const baseStyle: React.CSSProperties = {
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        translate: "-50% -50%",
        zIndex: 2147483647,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform, width, height, opacity",
    };

    if (mode === "caret") {
        return (
            <motion.div
                style={baseStyle}
                animate={{
                    width: CARET_W,
                    height: caretHeight,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.95)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                    scale,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
        );
    }

    if (mode === "content" && content) {
        return (
            <motion.div
                style={{
                    ...baseStyle,
                }}
                transition={{ type: "spring", stiffness: 4000, damping: 60 }}
            >
                <div className="cursor-glass-content">{content}</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            style={{
                ...baseStyle,
                width: size,
                height: size,
                borderRadius: radius,
                background: "rgba(255,255,255,0.95)",
            }}
            transition={{ type: "spring", stiffness: 3500, damping: 55 }}
        />
    );
}