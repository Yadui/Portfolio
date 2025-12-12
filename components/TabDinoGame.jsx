"use client";

import { useEffect } from "react";

const TabDinoGame = () => {
  useEffect(() => {
    const originalTitle = document.title;
    let frame = 0;
    let interval;

    // The Dino Game Animation Frames (ASCII)
    // 0: Run 1, 1: Run 2, 2: Jump
    const dinoFrames = ["🦖", "🦖", "🦖"];
    const cactus = "🌵";
    const space = "\u00A0"; // Non-breaking space for wider gap
    
    // Animation loop length
    const trackLength = 12;

    const animate = () => {
      const dinoState = frame % 4 === 3 ? 2 : frame % 2; // Simple run/jump cycle
      const dino = dinoFrames[dinoState];
      
      // Calculate cactus position moving left
      // We want the cactus to move from right (trackLength) to left (0)
      let cactusPos = (trackLength - (frame % trackLength));
      
      // Build the track string
      // We need to place the Dino at a fixed position (e.g., pos 2)
      // and the Cactus at 'cactusPos'
      const dinoPos = 2;
      
      let track = "";
      
      for (let i = 0; i <= trackLength; i++) {
        if (i === dinoPos) {
           track += dino;
        } else if (i === cactusPos) {
           track += cactus;
        } else {
           track += "_"; 
        }
      }

      // If collision (visual intersection), maybe flash 'OUCH'?
      // For now, just loop.
      
      document.title = `${track} | Abhinav Yadav`;
      frame++;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Start animation when user leaves the tab
        interval = setInterval(animate, 500);
      } else {
        // Stop animation and restore title when user returns
        if (interval) clearInterval(interval);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Optional: Run immediately if we want it always on, 
    // but "visibilitychange" is better for "Come back!" effects or "Offline" vibes.
    // Let's run it always for the "unique metadata" request.
    interval = setInterval(animate, 400);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  return null;
};

export default TabDinoGame;
