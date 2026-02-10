import React, { useRef, useEffect } from 'react';

// LavaLampCanvas: React component for the CodePen effect
export default function LavaLampCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let px = mouseX;
    let py = mouseY;
    let points = [];
    let size = 0;
    let red = 0, green = 255, blue = 255;
    let spread = 1;
    const SPEED_X = 0.15, SPEED_Y = 0.15, MAX_LENGTH = 120;
    const RED_STEP = 0.02, GREEN_STEP = 0.015, BLUE_STEP = 0.025;

    function Point(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.color = color;
    }
    Point.prototype.spread = function() {
      this.x += this.dx;
      this.y += this.dy;
    };

    function drawLines() {
      let p0, p1, p2, total = points.length;
      for (let i = total - 1; i > 1; i--) {
        p0 = points[i];
        p1 = points[i - 1];
        p2 = points[i - 2];
        context.beginPath();
        context.strokeStyle = p0.color;
        context.lineWidth = p0.size;
        context.globalAlpha = i / total;
        context.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
        context.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        context.stroke();
        p0.spread();
      }
      points[0].spread();
      points[total - 1].spread();
    }

    function draw() {
      // Line movement
      let dx = (mouseX - px) * SPEED_X;
      let dy = (mouseY - py) * SPEED_Y;
      // Limit the amount of movement
      dx = Math.max(-spread, Math.min(spread, dx));
      dy = Math.max(-spread, Math.min(spread, dy));
      px = mouseX;
      py = mouseY;
      // Create a new point on the line
      points.push(new Point(
        px, py,
        dx, dy,
        Math.abs(Math.sin(size += 0.125) * 10) + 1,
        `rgb(${Math.floor(Math.sin(red += RED_STEP) * 128 + 128)},${Math.floor(Math.sin(green += GREEN_STEP) * 128 + 128)},${Math.floor(Math.sin(blue += BLUE_STEP) * 128 + 128)})`
      ));
      if (points.length > MAX_LENGTH) points.shift();
      // Fade out
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // Draw the lines
      context.globalCompositeOperation = 'lighter';
      drawLines();
      drawLines();
      drawLines();
    }

    function update() {
      animationId = requestAnimationFrame(update);
      draw();
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    let animationId;
    resize();
    window.addEventListener('resize', resize);

    canvas.onmousemove = function(event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };
    canvas.ontouchmove = function(event) {
      mouseX = event.targetTouches[0].pageX;
      mouseY = event.targetTouches[0].pageY;
      spread = 1;
    };
    canvas.ontouchstart = function(event) {
      spread = 0;
      mouseX = event.targetTouches[0].pageX;
      mouseY = event.targetTouches[0].pageY;
      for (let i = points.length; i--; ) {
        points[i].x = mouseX;
        points[i].y = mouseY;
      }
      if (!event.target.href) {
        event.preventDefault();
      }
    };
    document.onmouseenter = function(event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
      for (let i = points.length; i--; ) {
        points[i].x = mouseX;
        points[i].y = mouseY;
      }
    };

    // Initialize points
    for (let i = 0; i < 10; i++) {
      points.push(new Point(px, py, 0, 0, 1, 'rgb(0,255,255)'));
    }

    update();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
