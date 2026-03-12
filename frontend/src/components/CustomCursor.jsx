import { useRef, useEffect, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Custom Cursor — desktop only, two-layer follow cursor
   ═══════════════════════════════════════════════════════════════ */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });      // actual mouse
  const ringPos = useRef({ x: 0, y: 0 });      // lagging ring
  const raf     = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isTouch, setIsTouch]   = useState(false);

  /* ── detect touch device ── */
  useEffect(() => {
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touch);
  }, []);

  /* ── hide default cursor (desktop only) ── */
  useEffect(() => {
    if (isTouch) return;
    document.body.style.cursor = 'none';
    // also hide on all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = '';
      document.getElementById('custom-cursor-style')?.remove();
    };
  }, [isTouch]);

  /* ── animation loop (ring lags behind dot) ── */
  const animate = useCallback(() => {
    const ease = 0.15;
    ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

    if (dotRef.current) {
      dotRef.current.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  /* ── mouse move ── */
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isTouch, animate]);

  /* ── hover detection on interactive elements ── */
  useEffect(() => {
    if (isTouch) return;

    const selectors = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

    const onEnter = () => {
      setHovering(true);
      document.body.classList.add('cursor--hover');
    };
    const onLeave = () => {
      setHovering(false);
      document.body.classList.remove('cursor--hover');
    };

    const attach = () => {
      document.querySelectorAll(selectors).forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // initial + observe DOM changes (new modals, menus, etc.)
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll(selectors).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      document.body.classList.remove('cursor--hover');
    };
  }, [isTouch]);

  /* ── click animation ── */
  useEffect(() => {
    if (isTouch) return;

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isTouch]);

  // don't render on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* ── Dot ── */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#00ff88',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: `opacity 0.2s, transform 0.05s`,
          opacity: hovering ? 0 : 1,
          willChange: 'transform',
        }}
      />

      {/* ── Ring ── */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? 50 : 35,
          height: hovering ? 50 : 35,
          borderRadius: '50%',
          border: hovering ? 'none' : '1.5px solid #00ff88',
          backgroundColor: hovering ? 'rgba(0, 255, 136, 0.12)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: `width 0.25s ease, height 0.25s ease, background-color 0.25s ease,
                       border 0.25s ease, transform 0.08s ease`,
          transform: clicking ? 'scale(0.8)' : undefined,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
