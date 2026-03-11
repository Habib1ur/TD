import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function buildShuffledIndexes(size) {
  if (!size || size < 1) return [];
  const indexes = Array.from({ length: size }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

export function useTaskGenerator(tasks) {
  const [history, setHistory] = useState([]);
  const queueRef = useRef(buildShuffledIndexes(tasks.length));
  const previousIndexRef = useRef(null);

  const ensureQueue = useCallback(() => {
    if (queueRef.current.length === 0) {
      queueRef.current = buildShuffledIndexes(tasks.length);
      if (
        queueRef.current[0] === previousIndexRef.current &&
        queueRef.current.length > 1
      ) {
        [queueRef.current[0], queueRef.current[1]] = [
          queueRef.current[1],
          queueRef.current[0],
        ];
      }
    }
  }, [tasks.length]);

  const nextTask = useCallback(() => {
    if (!tasks.length) {
      return "No challenges loaded yet. Please try again in a moment.";
    }

    ensureQueue();
    const nextIndex = queueRef.current.shift();
    previousIndexRef.current = nextIndex;
    const task = tasks[nextIndex];

    setHistory((prev) => {
      const updated = [{ task, at: Date.now() }, ...prev];
      return updated.slice(0, 12);
    });

    return task;
  }, [ensureQueue, tasks]);

  const reset = useCallback(() => {
    queueRef.current = buildShuffledIndexes(tasks.length);
    previousIndexRef.current = null;
    setHistory([]);
  }, [tasks.length]);

  useEffect(() => {
    reset();
  }, [reset, tasks]);

  return useMemo(
    () => ({ nextTask, reset, history }),
    [nextTask, reset, history],
  );
}
