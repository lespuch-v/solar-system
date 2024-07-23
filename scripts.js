// Create stars (unchanged)
const space = document.getElementById('space');
const starCount = 200;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.width = `${Math.random() * 2}px`;
  star.style.height = star.style.width;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  space.appendChild(star);
}

// Tooltip functionality
const tooltip = document.getElementById('tooltip');
const solarSystem = document.getElementById('solar-system');
const celestialBodies = document.querySelectorAll('.planet, .moon');

solarSystem.addEventListener('mousemove', handleMouseMove);
solarSystem.addEventListener('mouseout', hideTooltip);

function handleMouseMove(e) {
  const rect = solarSystem.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  let closestBody = null;
  let closestDistance = Infinity;

  celestialBodies.forEach((body) => {
    const bodyRect = body.getBoundingClientRect();
    const bodyX = bodyRect.left + bodyRect.width / 2 - rect.left;
    const bodyY = bodyRect.top + bodyRect.height / 2 - rect.top;

    const distance = Math.sqrt(Math.pow(x - bodyX, 2) + Math.pow(y - bodyY, 2));

    if (distance < closestDistance) {
      closestDistance = distance;
      closestBody = body;
    }
  });

  if (closestBody && closestDistance < 20) {
    showTooltip(closestBody, e.clientX, e.clientY);
  } else {
    hideTooltip();
  }
}

function showTooltip(body, x, y) {
  const bodyName = body.getAttribute('data-name');
  tooltip.textContent = bodyName;
  tooltip.style.opacity = 1;
  tooltip.style.left = `${x + 10}px`;
  tooltip.style.top = `${y + 10}px`;
}

function hideTooltip() {
  tooltip.style.opacity = 0;
}
