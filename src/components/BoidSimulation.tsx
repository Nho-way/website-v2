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
  const lastUpdateTimeRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [numBoids, setNumBoids] = useState(400);
  const [maxSpeed, setMaxSpeed] = useState(250);
  const [minSpeed, setMinSpeed] = useState(125);
  const [margin, setMargin] = useState(150);

  const MAX_WIDTH = 3200;
  const MAX_HEIGHT = 2000;
  const ASPECT_RATIO = MAX_HEIGHT/MAX_WIDTH;

  // Movement constants (units per second)
  const visualRange = 20;
  const centeringFactor = 0.1;
  const avoidFactor = .75;
  const matchingFactor = 2.5;
  
  const edgeFactor = 1000; 

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && canvasRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        let containerWidth = Math.min(windowWidth, MAX_WIDTH);
        let containerHeight = containerWidth * ASPECT_RATIO;

        if (containerHeight > windowHeight) {
          containerHeight = windowHeight;
          containerWidth = containerHeight / ASPECT_RATIO;
        }
        
        setDimensions({ 
          width: containerWidth, 
          height: containerHeight 
        });
        
        canvasRef.current.width = containerWidth;
        canvasRef.current.height = containerHeight;
        if (containerWidth < 768) {
          setNumBoids(70);
          setMaxSpeed(100);
          setMinSpeed(50);
          setMargin(50);
        } else if (containerWidth < 1900) {
          setNumBoids(200);
          setMaxSpeed(200);
          setMinSpeed(100);
          setMargin(150);
        } else {
          setNumBoids(400);
          setMaxSpeed(250);
          setMinSpeed(125);
          setMargin(150);
        }
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

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Initialize boids away from edges
    boidsRef.current = Array.from({ length: numBoids }, () => ({
      x: margin + Math.random() * (dimensions.width - 2 * margin),
      y: margin + Math.random() * (dimensions.height - 2 * margin),
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

    const keepWithinBounds = (boid: Boid, deltaTime: number) => {
      const timeScale = deltaTime / 1000;
      
      // Strong boundary force when getting close to edges
      if (boid.x < margin) {
        boid.vx += edgeFactor * timeScale * (1 - boid.x / margin);
      }
      if (boid.x > dimensions.width - margin) {
        boid.vx -= edgeFactor * timeScale * (1 - (dimensions.width - boid.x) / margin);
      }
      if (boid.y < margin) {
        boid.vy += edgeFactor * timeScale * (1 - boid.y / margin);
      }
      if (boid.y > dimensions.height - margin) {
        boid.vy -= edgeFactor * timeScale * (1 - (dimensions.height - boid.y) / margin);
      }

      // Hard boundaries to prevent escape
      if (boid.x < 0) {
        boid.x = 0;
        boid.vx = Math.abs(boid.vx);
      }
      if (boid.x > dimensions.width) {
        boid.x = dimensions.width;
        boid.vx = -Math.abs(boid.vx);
      }
      if (boid.y < 0) {
        boid.y = 0;
        boid.vy = Math.abs(boid.vy);
      }
      if (boid.y > dimensions.height) {
        boid.y = dimensions.height;
        boid.vy = -Math.abs(boid.vy);
      }
    };

    const animate = (currentTime: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastUpdateTimeRef.current;
      const timeScale = deltaTime / 1000;
      
      lastUpdateTimeRef.current = currentTime;

      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      ctx.restore();

      boidsRef.current = boidsRef.current.map(boid => {
        const newBoid = { ...boid };
        
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

            if (dist < 20) {
              newBoid.vx -= (otherBoid.x - boid.x) * avoidFactor * timeScale;
              newBoid.vy -= (otherBoid.y - boid.y) * avoidFactor * timeScale;
            }
          }
        });

        if (neighbors > 0) {
          newBoid.vx += ((xPos / neighbors) - boid.x) * centeringFactor * timeScale;
          newBoid.vy += ((yPos / neighbors) - boid.y) * centeringFactor * timeScale;
          
          newBoid.vx += ((xVel / neighbors) - boid.vx) * matchingFactor * timeScale;
          newBoid.vy += ((yVel / neighbors) - boid.vy) * matchingFactor * timeScale;
        }

        keepWithinBounds(newBoid, deltaTime);

        const speed = Math.sqrt(newBoid.vx * newBoid.vx + newBoid.vy * newBoid.vy);
        if (speed > maxSpeed) {
          newBoid.vx = (newBoid.vx / speed) * maxSpeed;
          newBoid.vy = (newBoid.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          newBoid.vx = (newBoid.vx / speed) * minSpeed;
          newBoid.vy = (newBoid.vy / speed) * minSpeed;
        }

        newBoid.x += newBoid.vx * timeScale;
        newBoid.y += newBoid.vy * timeScale;

        drawGlowingBoid(newBoid.x, newBoid.y, newBoid.hue);

        return newBoid;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastUpdateTimeRef.current = 0;
    animate(0);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%',
        maxWidth: `${MAX_WIDTH}px`,
        height: '100%', 
        maxHeight: `${MAX_HEIGHT}px`,
        position: 'absolute', 
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(to bottom, #002741 0%, #000000 100%)',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block',
          background: 'transparent',
          mixBlendMode: 'screen',
          width: '100%',
          height: '100%'
        }} 
      />
    </div>
  );
};

export default BoidSimulation;