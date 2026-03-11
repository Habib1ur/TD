import { useMemo } from "react";
import { Howl } from "howler";

const clickSrc =
  "data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAA=";

export function useGameSounds() {
  const sounds = useMemo(
    () => ({
      click: new Howl({ src: [clickSrc], volume: 0.2 }),
      reveal: new Howl({ src: [clickSrc], rate: 0.9, volume: 0.3 }),
      success: new Howl({ src: [clickSrc], rate: 1.2, volume: 0.3 }),
      skip: new Howl({ src: [clickSrc], rate: 0.7, volume: 0.22 }),
    }),
    [],
  );

  return sounds;
}
