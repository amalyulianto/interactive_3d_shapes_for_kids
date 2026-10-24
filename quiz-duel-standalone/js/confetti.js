/**
 * Standalone Canvas Confetti Celebration Engine
 * Completely self-contained, zero external CDN dependencies.
 */
(function () {
  'use strict';

  function launchConfetti(opts = {}) {
    const particleCount = opts.particleCount || 80;
    const spread = opts.spread || 80;

    let canvas = document.getElementById('duelConfettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'duelConfettiCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#2563EB', '#DC2626', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.random() * spread - spread / 2 + 90) * (Math.PI / 180);
      const velocity = Math.random() * 12 + 8;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.5,
        vx: Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1),
        vy: -Math.sin(angle) * velocity,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        opacity: 1
      });
    }

    let frameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rSpeed;
        p.opacity -= 0.008;

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          alive++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
          ctx.restore();
        }
      });

      if (alive > 0) {
        frameId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(frameId);
      }
    }

    animate();
  }

  window.confetti = launchConfetti;
  window.AppUtils = {
    confetti: launchConfetti,
    shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5)
  };
})();
