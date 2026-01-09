"use client";

import { useEffect } from "react";

const TabPacman = () => {
  useEffect(() => {
    const originalTitle =
      document.title?.trim() || "VirtuAI";

    let frame = 0;
    let interval = null;

    const PACMAN = ["ᗧ", "ᗤ"];
    const DOT = "·";
    const SPACE = "\u00A0";
    const TRACK_LENGTH = 12;
    const SPEED = 200;

    const animate = () => {
      const pacman = PACMAN[frame % 2];
      const pos = frame % TRACK_LENGTH;

      let title = "";

      for (let i = 0; i < TRACK_LENGTH; i++) {
        if (i === pos) title += pacman;
        else if (i > pos) title += DOT;
        else title += SPACE;
      }

      // 🔒 Never allow empty title
      document.title = title || originalTitle;
      frame++;
    };

    const start = () => {
      if (!interval) interval = setInterval(animate, SPEED);
    };

    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      document.title = originalTitle;
    };

    const onVisibility = () => {
      document.hidden ? start() : stop();
    };

    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
};

export default TabPacman;