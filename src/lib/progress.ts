"use client";

import { useSyncExternalStore } from "react";

/* Which videos a visitor has marked as done in learning paths. Stored in this browser only. */

type Progress = Record<string, true>;
const KEY = "rl-progress";
const EVENT = "rl:progress";
const empty: Progress = {};

let raw: string | null | undefined;
let snapshot: Progress = empty;

function read(): Progress {
  try {
    const next = localStorage.getItem(KEY);
    if (next !== raw) {
      raw = next;
      snapshot = next ? (JSON.parse(next) as Progress) : empty;
    }
  } catch {
    // Storage blocked (private mode etc.): progress just won't persist.
  }
  return snapshot;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export const useProgress = () => useSyncExternalStore(subscribe, read, () => empty);

export function setDone(videoId: string, done: boolean) {
  const next = { ...read() };
  if (done) next[videoId] = true;
  else delete next[videoId];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
