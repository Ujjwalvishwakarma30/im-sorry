import confetti from 'canvas-confetti';

export function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#f4a0b5', '#e8758a', '#c4b5e0', '#fef5ec', '#f8d0db'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireCelebration() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 20,
    colors: ['#f4a0b5', '#e8758a', '#c4b5e0', '#fef5ec', '#f8d0db', '#FFD700'],
    shapes: ['circle'],
    scalar: 1.5,
  };

  confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.35 } });

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.4 } });
  }, 250);

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.4 } });
  }, 400);

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 60,
      spread: 160,
      origin: { x: 0.5, y: 0.3 },
      startVelocity: 30,
    });
  }, 700);
}

export function fireEmojis() {
  const emojis = ['😊', '💜', '✨', '🌸', '💫', '🦋'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.textContent = randomEmoji;
      emoji.style.cssText = `
        position: absolute;
        font-size: ${20 + Math.random() * 24}px;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        animation: floatUpEmoji ${3 + Math.random() * 3}s ease-out forwards;
        opacity: 0;
      `;
      container.appendChild(emoji);
    }, i * 150);
  }

  // Add keyframes if not already added
  if (!document.getElementById('emoji-keyframes')) {
    const style = document.createElement('style');
    style.id = 'emoji-keyframes';
    style.textContent = `
      @keyframes floatUpEmoji {
        0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
        10% { opacity: 1; transform: translateY(-50px) rotate(10deg) scale(1); }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(${Math.random() > 0.5 ? '' : '-'}360deg) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 6000);
}
