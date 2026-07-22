"use client";

import * as motion from "motion/react-client";
import { useMotionValue } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CursorMode = "default" | "interactive" | "caret" | "content" | "hidden";

const DEFAULT_SIZE = 12;
const INTERACTIVE_SIZE = 48;
const CARET_W = 2;
const CARET_H = 24;

function isInteractiveElement(el: Element | null) {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return (
        tag === "a" ||
        tag === "button" ||
        el.closest("a") !== null ||
        el.closest("button") !== null ||
        el.getAttribute("role") === "button"
    );
}

function isTextElement(el: Element | null) {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "textarea") return true;
    if (tag === "input") {
        const t = (el as HTMLInputElement).type || "text";
        return ["text", "search", "email", "password", "url", "tel"].includes(t);
    }
    if (el.getAttribute && el.getAttribute("contenteditable") === "true") return true;
    return ["p", "span", "label", "h1", "h2", "h3", "h4", "h5", "h6", "li"].includes(tag);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CursorShell />
            {children}
        </>
    );
}

function CursorShell() {
    const mx = useMotionValue(-9999);
    const my = useMotionValue(-9999);

    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<CursorMode>("default");
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const hoverTarget = useRef<Element | null>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)");
        setEnabled(mq.matches);
        const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

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

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerenter", onPointerEnter);
        window.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerenter", onPointerEnter);
            window.removeEventListener("mouseout", onMouseOut);
        };
    }, [visible, mx, my]);

    useEffect(() => {
        const selector = "a, button, [role='button'], input, textarea, [contenteditable='true'], p, span, h1, h2, h3, h4, h5, h6, [data-cursor-content]";

        const handleEnter = (el: Element) => {
            hoverTarget.current = el;

            const customContent = el.getAttribute("data-cursor-content");
            if (customContent !== null) {
                setMode("content");
                setContent(customContent);
                return;
            }

            if (isInteractiveElement(el)) {
                setMode("interactive");
                setContent(null);
                return;
            }

            if (isTextElement(el)) {
                setMode("caret");
                setContent(null);
                return;
            }

            setMode("default");
        };

        const handleLeave = (el: Element) => {
            if (hoverTarget.current === el) {
                hoverTarget.current = null;
                setMode("default");
                setContent(null);
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

    if (!mounted || !enabled) return null;

    return createPortal(
        <div aria-hidden style={{ pointerEvents: "none" }}>
            {visible && (
                <Core x={mx} y={my} mode={mode} content={content} />
            )}
        </div>,
        document.body
    );
}

function Core({ x, y, mode, content }: { x: any; y: any; mode: CursorMode; content: React.ReactNode | null }) {
    const baseStyle: React.CSSProperties = {
        position: "fixed", left: 0, top: 0, x, y,
        translate: "-50% -50%",
        zIndex: 2147483647,
        pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        willChange: "width, height, transform, background-color, border",
    };

    const variants = {
        default: {
            width: DEFAULT_SIZE,
            height: DEFAULT_SIZE,
            borderRadius: "50%",
            backgroundColor: "var(--color-foreground)",
            border: "0px solid transparent",
            backdropFilter: "blur(0px)",
        },
        interactive: {
            width: INTERACTIVE_SIZE,
            height: INTERACTIVE_SIZE,
            borderRadius: "50%",
            backgroundColor: "var(--color-glass)",
            border: "1px solid var(--color-glass-border-hover)",
            backdropFilter: "blur(4px)",
        },
        caret: {
            width: CARET_W,
            height: CARET_H,
            borderRadius: "2px",
            backgroundColor: "var(--color-foreground)",
            border: "0px solid transparent",
            backdropFilter: "blur(0px)",
        },
        content: {
            width: "auto",
            height: "auto",
            borderRadius: "999px",
            backgroundColor: "transparent",
            border: "0px solid transparent",
            backdropFilter: "blur(0px)",
        }
    };

    return (
        <motion.div
            style={baseStyle}
            variants={variants}
            animate={mode}
            transition={{ type: "spring", stiffness: 600, damping: 40, mass: 0.5 }}
        >
            {mode === "content" && content && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-4 py-2 rounded-full bg-foreground text-background text-xs font-mono font-medium shadow-xl whitespace-nowrap"
                >
                    {content}
                </motion.div>
            )}
        </motion.div>
    );
}