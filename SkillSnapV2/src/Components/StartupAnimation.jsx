import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StartupAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    let cw = c.width = window.innerWidth;
    let ch = c.height = window.innerHeight;

    const ticks = 150;
    const ring1 = [];
    const ring2 = [];
    const dur = 12;

    for (let i = 0; i < ticks; i++) {
      const angle = i / ticks * Math.PI * 2;
      const radius = 250;
      ring1[i] = {
        x1: 0, x2: 0, y1: 0, y2: 0,
        lineWidth: 6,
        a: angle,
        r: radius,
        h: 180 + gsap.utils.wrapYoyo(0, 40, i / ticks * 160),
      };
      ring2[i] = {
        x1: 0, x2: 0, y1: 0, y2: 0,
        lineWidth: 2,
        a: angle,
        r: radius / 2,
        h: 180 + gsap.utils.wrapYoyo(0, 40, i / ticks * 160),
      };
    }

    const tl = gsap.timeline({ onUpdate: update });
    tl.fromTo([ring1, ring2], {
      x1: (i, t) => Math.cos(t.a) * t.r * -2,
      y1: (i, t) => Math.sin(t.a) * t.r * -2,
      x2: (i, t) => Math.cos(t.a) * t.r * 15,
      y2: (i, t) => Math.sin(t.a) * t.r * 8,
    }, {
      x1: (i, t) => Math.cos(t.a) * t.r * 0.3,
      y1: (i, t) => Math.sin(t.a) * t.r * 0.3,
      x2: (i, t) => Math.cos(t.a) * t.r * 0.12,
      y2: (i, t) => Math.sin(t.a) * t.r * 0.12,
      duration: dur / 2,
      ease: 'back',
      repeat: -1,
      yoyo: true,
    }, 0).to(ring1, {
      lineWidth: 1,
      h: '+=120',
      duration: dur * 0.25,
      ease: 'power4',
      stagger: { amount: dur, from: 0, repeat: -1, yoyo: true },
    }, 0).play(dur * 1.5);

    function drawPath(t) {
      ctx.strokeStyle = `hsl(${t.h},100%,50%)`;
      ctx.lineCap = "round";
      ctx.lineWidth = t.lineWidth;
      ctx.setLineDash([t.lineWidth * 2, 30]);
      ctx.beginPath();
      ctx.moveTo(t.x1 + cw / 2, t.y1 + ch / 2);
      ctx.lineTo(t.x2 + cw / 2, t.y2 + ch / 2);
      ctx.stroke();
    }

    function update() {
      ctx.clearRect(0, 0, cw, ch);
      ring1.forEach(drawPath);
      ring2.forEach(drawPath);
    }

    window.onresize = () => {
      cw = c.width = window.innerWidth;
      ch = c.height = window.innerHeight;
      update();
    };

    window.onpointerup = () => {
      gsap.to(tl, {
        duration: 1,
        ease: 'power3',
        timeScale: (tl.isActive() ? 0 : 1),
      });
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>;
};

export default StartupAnimation;
