import "./style.scss";
import { ClickEvent, Coordinates } from "./models/general";
import { Swarm } from "./swarm";

const canvas = document.querySelector("canvas");
console.log("💩 ~ file: main.ts:6 ~ canvas", canvas);
const ctx = canvas?.getContext("2d");
const mouse: Coordinates = { x: 0, y: 0 };
export let clickEvent: ClickEvent | undefined = undefined;
export const unsetClick = () => (clickEvent = undefined);

addEventListener("mousemove", (ev) => {
  mouse.x = ev.clientX;
  mouse.y = ev.clientY;
});

canvas?.addEventListener("mousedown", (ev) => {
  clickEvent = {
    clicked: true,
    x: ev.clientX,
    y: ev.clientY,
  };
});

if (canvas && ctx) {
  const resize = (): void => {
    if (canvas.height !== innerHeight || canvas.width !== innerWidth) {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    }
  };

  let swarm: Swarm;
  const animate = (): void => {
    resize();
    requestAnimationFrame(animate);
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    swarm.animate(mouse);
  };

  const init = (): void => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    swarm = new Swarm(canvas, ctx, 200);
    animate();
  };

  init();
}
