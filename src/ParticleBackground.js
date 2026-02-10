// Vibrant cyan accent color for Tailwind (add to tailwind.config.js theme if you want to use as a class)
// Example: theme.extend.colors: { accent: '#00CFFF' }

import React from 'react';
import { Particles } from '@tsparticles/react';

export default function ParticleBackground() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: '#0a192f', // Your dark blue background
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#00CFFF', // Vibrant cyan
          },
          links: {
            color: '#00CFFF',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
