import { useEffect, useState } from "react";
import { card, list, listItem, sidebarTitle } from "../styles/events.css";

export type Entry = { name: string; score: number; date: string };
const KEY = "aa_snake_leaderboard";

export default function Leaderboard() {
  const [scores, setScores] = useState<Entry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    setScores(raw ? JSON.parse(raw) : []);
  }, []);

  return (
    <aside className={card}>
      <div className={sidebarTitle}>Leaderboard (Top 10)</div>
      <ul className={list}>
        {scores
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map((e, i) => (
            <li key={i} className={listItem}>
              <span style={{ opacity: 0.9 }}>{i + 1}. {e.name}</span>
              <strong>{e.score}</strong>
            </li>
          ))}
        {scores.length === 0 && <li style={{opacity:.8}}>No scores yet. Be the first!</li>}
      </ul>
    </aside>
  );
}

export function saveScore(score: number) {
  const name = (window.prompt("Game over! Enter a name for the leaderboard:", "Player") || "Player").trim();
  const entry: Entry = { name: name || "Player", score, date: new Date().toISOString() };
  const raw = localStorage.getItem(KEY);
  const arr: Entry[] = raw ? JSON.parse(raw) : [];
  arr.push(entry);
  localStorage.setItem(KEY, JSON.stringify(arr));
}
