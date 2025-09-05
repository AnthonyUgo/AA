import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const gridSize = 20; // grid cells
const cellSize = 30; // size of each cell in px
const images = Array.from(
  { length: 9 },
  (_, i) => `/${String(i + 1).padStart(3, "0")}.jpg`
);

type Position = { x: number; y: number };

export default function App() {
  const [snake, setSnake] = useState<Position>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Position>({ x: 1, y: 0 });
  const [expanded, setExpanded] = useState<string | null>(null);

  // Place images randomly on grid
  const [food, setFood] = useState<Position[]>(
    images.map(() => ({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }))
  );

  // Snake movement loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        let next = { x: prev.x + dir.x, y: prev.y + dir.y };

        // wrap edges
        if (next.x < 0) next.x = gridSize - 1;
        if (next.y < 0) next.y = gridSize - 1;
        if (next.x >= gridSize) next.x = 0;
        if (next.y >= gridSize) next.y = 0;

        // Collision detection
        food.forEach((f, i) => {
          if (f.x === next.x && f.y === next.y) {
            setExpanded(images[i]); // expand modal
            // respawn eaten image
            setFood((prev) =>
              prev.map((pos, idx) =>
                idx === i
                  ? {
                      x: Math.floor(Math.random() * gridSize),
                      y: Math.floor(Math.random() * gridSize),
                    }
                  : pos
              )
            );
          }
        });

        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [dir, food]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown") setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft") setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight") setDir({ x: 1, y: 0 });
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
     <img
       src="/logo.png"
       alt="Above Average"
       className="w-20 md:w-28 lg:w-36 h-auto mb-6 mx-auto"
      />
      {/* Game "TV" box */}
      <div
        className="relative rounded-3xl border-4 border-green-400 bg-gray-950 shadow-[0_0_40px_rgba(34,197,94,0.4)] overflow-hidden"
        style={{
          width: gridSize * cellSize + 40,
          height: gridSize * cellSize + 40,
          padding: "20px",
        }}
      >
        <div
          className="relative rounded-2xl bg-gray-800 border border-gray-700 shadow-inner overflow-hidden"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
          }}
        >
          {/* Snake */}
          <div
            className="absolute bg-green-400 border-2 border-green-700 shadow-[0_0_15px_3px_rgba(34,197,94,0.9)] rounded"
            style={{
              width: cellSize,
              height: cellSize,
              left: snake.x * cellSize,
              top: snake.y * cellSize,
            }}
          />

          {/* Food Images */}
          {food.map((f, i) => (
            <motion.img
              key={i}
              src={images[i]}
              className="absolute rounded-full object-cover border-2 border-gray-600 shadow-md"
              style={{
                width: cellSize,
                height: cellSize,
                left: f.x * cellSize,
                top: f.y * cellSize,
              }}
            />
          ))}
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expanded && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setExpanded(null)}
        >
          <motion.img
            src={expanded}
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
        </motion.div>
      )}

      {/* Subscribe Section */}
      <div className="mt-6 text-center">
        <h2 className="font-mono text-xl text-gray-300">COMING SOON</h2>
        <form className="flex mt-2 justify-center">
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-black font-bold rounded-r-full hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
