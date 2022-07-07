// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

import DrawInUnitCircle, { NormalizedCoordinates } from './draw-in-unit-circle';

(async () => {
  const targetCanvas = document.getElementById(
    'target-canvas'
  ) as HTMLCanvasElement;
  const drawInUnitCircle = new DrawInUnitCircle(targetCanvas, 200, 200, 10);

  drawInUnitCircle.init();

  console.log('ready');

  window.setInterval(() => {
    const nc: NormalizedCoordinates = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    };
    console.log(nc);
    drawInUnitCircle.plot(nc);
  }, 1000);
})();
