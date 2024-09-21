import React, { useEffect, useRef, useState } from 'react';

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
}

const BoidSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationFrameRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const numBoids = 20;
  const visualRange = 25;
  const centeringFactor = 0.005;
  const avoidFactor = 0.05;
  const matchingFactor = 0.05;
  const maxSpeed = 4;
  const minSpeed = 3;
  const edgeFactor = 0.5;
  const margin = 50;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || dimensions.width === 0 || dimensions.height === 0) return;

    // Initialize boids
    boidsRef.current = Array.from({ length: numBoids }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * maxSpeed,
      vy: (Math.random() - 0.5) * maxSpeed,
      hue: Math.random() * 360,
    }));

    const drawGlowingBoid = (x: number, y: number, hue: number) => {
      const outerRadius = 25;
      const innerRadius = 5;
      const glowRadius = 9;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, outerRadius);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fill();
    };

    const keepWithinBounds = (boid: Boid) => {
      if (boid.x < -margin) boid.vx += edgeFactor;
      if (boid.x > dimensions.width + margin) boid.vx -= edgeFactor;
      if (boid.y < -margin) boid.vy += edgeFactor;
      if (boid.y > dimensions.height + margin) boid.vy -= edgeFactor;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      boidsRef.current = boidsRef.current.map(boid => {
        const newBoid = { ...boid };
        
        // Apply boid rules
        let xPos = 0, yPos = 0, xVel = 0, yVel = 0;
        let neighbors = 0;

        boidsRef.current.forEach(otherBoid => {
          if (boid === otherBoid) return;
          
          const dx = otherBoid.x - boid.x;
          const dy = otherBoid.y - boid.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < visualRange) {
            xPos += otherBoid.x;
            yPos += otherBoid.y;
            xVel += otherBoid.vx;
            yVel += otherBoid.vy;
            neighbors++;

            // Separation
            if (dist < 20) {
              newBoid.vx -= (otherBoid.x - boid.x) * avoidFactor;
              newBoid.vy -= (otherBoid.y - boid.y) * avoidFactor;
            }
          }
        });

        if (neighbors > 0) {
          // Cohesion
          newBoid.vx += ((xPos / neighbors) - boid.x) * centeringFactor;
          newBoid.vy += ((yPos / neighbors) - boid.y) * centeringFactor;
          
          // Alignment
          newBoid.vx += ((xVel / neighbors) - boid.vx) * matchingFactor;
          newBoid.vy += ((yVel / neighbors) - boid.vy) * matchingFactor;
        }

        // Keep within bounds
        keepWithinBounds(newBoid);

        // Limit speed
        const speed = Math.sqrt(newBoid.vx * newBoid.vx + newBoid.vy * newBoid.vy);
        if (speed > maxSpeed) {
          newBoid.vx = (newBoid.vx / speed) * maxSpeed;
          newBoid.vy = (newBoid.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          newBoid.vx = (newBoid.vx / speed) * minSpeed;
          newBoid.vy = (newBoid.vy / speed) * minSpeed;
        }

        // Move boid
        newBoid.x += newBoid.vx;
        newBoid.y += newBoid.vy;

        drawGlowingBoid(newBoid.x, newBoid.y, newBoid.hue);

        return newBoid;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default BoidSimulation;