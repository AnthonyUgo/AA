import { useEffect, useRef, useState } from "react";
import { buttonRow, btn, canvasWrap, gameWrap, statsBar, startOverlay, startText } from "../styles/events.css";

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = { x: number; y: number };

const GRID = 20;
const SIZE = 18; // px per cell
const SPEED_MS = 110;

export default function SnakeGame({
  active,
  onGameOver,
}: {
  active: boolean;                 // parent tells us if #events is active
  onGameOver: (score: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [snake, setSnake] = useState<Cell[]>([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState<Dir>("RIGHT");
  const [food, setFood] = useState<Cell>(() => randFood([{ x: 10, y: 10 }]));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const [started, setStarted] = useState(false); // clicked to start
  const [running, setRunning] = useState(false); // only runs if started && active

  // 👇 NEW: guard so onGameOver prompts only once per game
  const gameOverOnce = useRef(false);

  function randFood(body: Cell[]): Cell {
    while (true) {
      const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
      if (!body.some(c => c.x === f.x && c.y === f.y)) return f;
    }
  }

  // Start/stop game loop depending on started + active + running
  useEffect(() => {
    if (!started || !active || !running) return;
    const id = setInterval(tick, SPEED_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, dir, started, active, running]);

  // Auto-pause when leaving the Events section
  useEffect(() => {
    if (!active) setRunning(false);
  }, [active]);

  // Keyboard controls + prevent page scroll while playing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isControlKey =
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"].includes(e.key) ||
        ["w", "a", "s", "d", "W", "A", "S", "D"].includes(e.key);

      if (started && active && isControlKey) {
        // prevent page from scrolling with arrows/space while playing
        e.preventDefault();
      }

      if (!started || !active) return;

      if (e.key === " " || e.key === "Spacebar") {
        setRunning(r => !r);
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

      setDir(prev => {
        if (
          (prev === "UP" && next === "DOWN") || (prev === "DOWN" && next === "UP") ||
          (prev === "LEFT" && next === "RIGHT") || (prev === "RIGHT" && next === "LEFT")
        ) return prev;
        return next;
      });
    };

    // use capture to intercept before browser scroll handling
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true } as any);
  }, [started, active]);

  function tick() {
    const head = snake[0];
    const next: Cell = {
      x: head.x + (dir === "LEFT" ? -1 : dir === "RIGHT" ? 1 : 0),
      y: head.y + (dir === "UP" ? -1 : dir === "DOWN" ? 1 : 0),
    };

    // wall/self collision
    const hitWall = next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
    const hitSelf = snake.some(c => c.x === next.x && c.y === next.y);

    if (hitWall || hitSelf) {
      const remaining = lives - 1;
      setLives(remaining);

      if (remaining <= 0) {
        // ✅ Guard: only trigger once
        if (!gameOverOnce.current) {
          gameOverOnce.current = true;
          setRunning(false);
          onGameOver(score);         // prompt for name ONCE
          hardReset();               // reset state for next round
          setStarted(false);         // show click-to-start overlay again
        }
      } else {
        // lose one life; keep score; reset snake
        softReset();
      }
      return;
    }

    const ate = next.x === food.x && next.y === food.y;
    const newBody = [next, ...snake.slice(0, ate ? undefined : -1)];
    setSnake(newBody);
    if (ate) {
      setScore(s => s + 10);
      setFood(randFood(newBody));
    }
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
    gameOverOnce.current = false; // 👈 reset guard for a brand-new game
  }

  function startGame() {
    if (!active) return;         // only start on Events section
    if (!started) {
      gameOverOnce.current = false; // 👈 also clear when starting
      setStarted(true);
      setRunning(true);
    }
  }

  // draw
  useEffect(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext("2d"); if (!ctx) return;

    ctx.fillStyle = "#0a0f1f";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.strokeStyle = "rgba(96,165,250,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * SIZE, 0); ctx.lineTo(i * SIZE, GRID * SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * SIZE); ctx.lineTo(GRID * SIZE, i * SIZE); ctx.stroke();
    }

    // food
    ctx.fillStyle = "#22c55e";
    roundRect(ctx, food.x * SIZE + 2, food.y * SIZE + 2, SIZE - 4, SIZE - 4, 6);

    // snake
    ctx.fillStyle = "#60a5fa";
    snake.forEach((c, i) => {
      const r = i === 0 ? 8 : 6;
      roundRect(ctx, c.x * SIZE + 2, c.y * SIZE + 2, SIZE - 4, SIZE - 4, r);
    });
  }, [snake, food]);

  return (
    <div className={gameWrap}>
      <div className={statsBar}>
        <div>Score: {score}</div>
        <div>Lives: {Array.from({ length: lives }).map(() => "●").join(" ") || "—"}</div>
      </div>

      <div className={canvasWrap} style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={GRID * SIZE}
          height={GRID * SIZE}
          onClick={startGame}               // click to start
          tabIndex={0}                      // allows focus if you want later
          style={{ display: "block" }}
        />
        {/* Flashing overlay until started */}
        {(!started || !active) && (
          <div className={startOverlay} onClick={startGame}>
            <div className={startText}>CLICK TO START</div>
          </div>
        )}
      </div>

      <div className={buttonRow}>
        <button className={btn} onClick={() => setRunning(r => !r)} disabled={!started || !active}>
          {running ? "Pause" : "Resume"}
        </button>
        <button className={btn} onClick={() => { hardReset(); setStarted(false); setRunning(false); }}>
          Reset
        </button>
      </div>

      <small>Controls: Arrow keys / WASD. Space pauses. Game runs only on the Events page.</small>
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
