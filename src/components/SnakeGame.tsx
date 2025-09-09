import { useEffect, useRef, useState } from "react";
import {
  buttonRow, btn, canvasWrap, gameWrap, statsBar,
  startOverlay, startText,
  mobileControls, padGrid, padBtn, pauseBtn
} from "../styles/events.css";

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = { x: number; y: number };

const GRID = 20;
const BASE_SPEED_MS = 110;
const SWIPE_THRESHOLD = 24; // px

export default function SnakeGame({
  active,
  onGameOver,
}: {
  active: boolean;
  onGameOver: (score: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [snake, setSnake] = useState<Cell[]>([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState<Dir>("RIGHT");
  const [food, setFood] = useState<Cell>(() => randFood([{ x: 10, y: 10 }]));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  // ensure onGameOver only fires once per game
  const gameOverOnce = useRef(false);

  // responsive cell size for mobile
  const [cell, setCell] = useState(18);

  // touch swipe support
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function randFood(body: Cell[]): Cell {
    while (true) {
      const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
      if (!body.some((c) => c.x === f.x && c.y === f.y)) return f;
    }
  }

  // responsive size: adjusts with viewport
  useEffect(() => {
    const onResize = () => {
      const vw = Math.min(window.innerWidth, 520); // cap width for layout padding
      const target = Math.max(14, Math.min(26, Math.floor((vw * 0.9) / GRID)));
      setCell(target);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // main loop
  useEffect(() => {
    if (!started || !active || !running) return;
    const id = setInterval(tick, BASE_SPEED_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, dir, started, active, running]);

  // auto-pause when leaving Events
  useEffect(() => {
    if (!active) setRunning(false);
  }, [active]);

  // keyboard + prevent page scroll while playing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isControlKey =
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"].includes(e.key) ||
        ["w", "a", "s", "d", "W", "A", "S", "D"].includes(e.key);

      if (started && active && isControlKey) e.preventDefault(); // stop page scroll

      if (!started || !active) return;

      if (e.key === " " || e.key === "Spacebar") {
        setRunning((r) => !r);
        return;
      }

      const m: Record<string, Dir> = {
        ArrowUp: "UP", w: "UP", W: "UP",
        ArrowDown: "DOWN", s: "DOWN", S: "DOWN",
        ArrowLeft: "LEFT", a: "LEFT", A: "LEFT",
        ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
      };
      const next = m[e.key];
      if (!next) return;
      setDir((prev) => (isOpposite(prev, next) ? prev : next));
    };

    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true } as any);
  }, [started, active]);

  // touch controls (swipe) + prevent touch scroll while playing
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (started && active) e.preventDefault(); // stop iOS double-tap zoom
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
      // tap to start if not started
      if (!started && active) startGame();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (started && active) e.preventDefault(); // block page scroll while playing
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!started || !active) return;
      const start = touchStart.current;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;
      const next: Dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0 ? "RIGHT" : "LEFT"
          : dy > 0 ? "DOWN" : "UP";
      setDir((prev) => (isOpposite(prev, next) ? prev : next));
      touchStart.current = null;
    };

    // passive:false is required to call preventDefault in touch handlers
    const opts = { passive: false } as AddEventListenerOptions;
    window.addEventListener("touchstart", onTouchStart, opts);
    window.addEventListener("touchmove", onTouchMove, opts);
    window.addEventListener("touchend", onTouchEnd, opts);
    return () => {
      window.removeEventListener("touchstart", onTouchStart as any, opts);
      window.removeEventListener("touchmove", onTouchMove as any, opts);
      window.removeEventListener("touchend", onTouchEnd as any, opts);
    };
  }, [started, active]);

  function tick() {
    const head = snake[0];
    const next: Cell = {
      x: head.x + (dir === "LEFT" ? -1 : dir === "RIGHT" ? 1 : 0),
      y: head.y + (dir === "UP" ? -1 : dir === "DOWN" ? 1 : 0),
    };

    const hitWall = next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
    const hitSelf = snake.some((c) => c.x === next.x && c.y === next.y);

    if (hitWall || hitSelf) {
      const remaining = lives - 1;
      setLives(remaining);

      if (remaining <= 0) {
        if (!gameOverOnce.current) {
          gameOverOnce.current = true;
          setRunning(false);
          onGameOver(score);
          hardReset();
          setStarted(false);
        }
      } else {
        softReset();
      }
      return;
    }

    const ate = next.x === food.x && next.y === food.y;
    const newBody = [next, ...snake.slice(0, ate ? undefined : -1)];
    setSnake(newBody);
    if (ate) {
      setScore((s) => s + 10);
      setFood(randFood(newBody));
    }
  }

  function isOpposite(a: Dir, b: Dir) {
    return (
      (a === "UP" && b === "DOWN") ||
      (a === "DOWN" && b === "UP") ||
      (a === "LEFT" && b === "RIGHT") ||
      (a === "RIGHT" && b === "LEFT")
    );
  }

  function softReset() {
    setSnake([{ x: 10, y: 10 }]);
    setDir("RIGHT");
    setFood(randFood([{ x: 10, y: 10 }]));
  }

  function hardReset() {
    softReset();
    setScore(0);
    setLives(3);
    gameOverOnce.current = false;
  }

  function startGame() {
    if (!active) return;
    if (!started) {
      gameOverOnce.current = false;
      setStarted(true);
      setRunning(true);
    }
  }

  // draw (retina crisp using DPR)
  useEffect(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext("2d"); if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const px = GRID * cell;
    cvs.width = px * dpr;
    cvs.height = px * dpr;
    cvs.style.width = `${px}px`;
    cvs.style.height = `${px}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // background
    ctx.fillStyle = "#0a0f1f";
    ctx.fillRect(0, 0, px, px);

    // faint grid
    ctx.strokeStyle = "rgba(96,165,250,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, GRID * cell); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(GRID * cell, i * cell); ctx.stroke();
    }

    // food
    ctx.fillStyle = "#22c55e";
    roundRect(ctx, food.x * cell + 2, food.y * cell + 2, cell - 4, cell - 4, 6);

    // snake
    ctx.fillStyle = "#60a5fa";
    snake.forEach((c, i) => {
      const r = i === 0 ? 8 : 6;
      roundRect(ctx, c.x * cell + 2, c.y * cell + 2, cell - 4, cell - 4, r);
    });
  }, [snake, food, cell]);

  return (
    <div className={gameWrap}>
      <div className={statsBar}>
        <div>Score: {score}</div>
        <div>Lives: {Array.from({ length: lives }).map(() => "●").join(" ") || "—"}</div>
      </div>

      <div className={canvasWrap} style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          onClick={startGame} // tap to start on mobile
          tabIndex={0}
          style={{ display: "block" }}
        />
        {/* Flashing overlay until started */}
        {(!started || !active) && (
          <div className={startOverlay} onClick={startGame}>
            <div className={startText}>CLICK TO START</div>
          </div>
        )}
      </div>

      {/* On-screen controls (mobile only via CSS) */}
      <div className={mobileControls}>
        <div className={padGrid}>
          <button className={padBtn} onClick={() => setDir((p) => (isOpposite(p, "UP") ? p : "UP"))}>↑</button>
          <button className={padBtn} onClick={() => setDir((p) => (isOpposite(p, "LEFT") ? p : "LEFT"))}>←</button>
          <button className={pauseBtn} onClick={() => setRunning((r) => !r)}>{running ? "⏸" : "▶"}</button>
          <button className={padBtn} onClick={() => setDir((p) => (isOpposite(p, "RIGHT") ? p : "RIGHT"))}>→</button>
          <button className={padBtn} onClick={() => setDir((p) => (isOpposite(p, "DOWN") ? p : "DOWN"))}>↓</button>
        </div>
      </div>

      <div className={buttonRow}>
        <button className={btn} onClick={() => setRunning((r) => !r)} disabled={!started || !active}>
          {running ? "Pause" : "Resume"}
        </button>
        <button className={btn} onClick={() => { hardReset(); setStarted(false); setRunning(false); }}>
          Reset
        </button>
      </div>

      <small>Mobile: swipe or use the pad. Arrow keys / WASD also work. Space pauses.</small>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x:number,y:number,w:number,h:number,r:number){
  const rr = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr,y);
  ctx.arcTo(x+w,y,x+w,y+h,rr);
  ctx.arcTo(x+w,y+h,x,y+h,rr);
  ctx.arcTo(x,y+h,x,y,rr);
  ctx.arcTo(x,y,x+w,y,rr);
  ctx.closePath();
  ctx.fill();
}
