import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: '> Initializing...', delay: 0 },
  { text: '> Loading modules...', delay: 800 },
  { text: '> Welcome', delay: 1600 },
];

const Loader = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  /* Reveal lines one at a time */
  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Blinking cursor */
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle radial glow behind the terminal */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,136,0.35), transparent 70%)',
        }}
      />

      {/* Terminal window */}
      <div className="relative w-[380px] max-w-[90vw]">
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
          style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span
            className="ml-auto text-xs tracking-wide"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="px-5 py-6 rounded-b-xl min-h-[140px]"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderTop: 'none',
          }}
        >
          {visibleLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-mono)',
                color:
                  i === visibleLines.length - 1 && line.includes('Welcome')
                    ? 'var(--accent-green)'
                    : 'var(--text-primary)',
              }}
            >
              {line}
            </motion.p>
          ))}

          {/* Blinking cursor on the last line */}
          <span
            className="inline-block w-2 h-4 mt-1 align-middle"
            style={{
              background: 'var(--accent-green)',
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ background: 'var(--accent-green)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default Loader;
