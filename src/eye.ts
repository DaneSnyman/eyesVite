import { clickEvent, unsetClick } from "./main";
import { Coordinates, EyeData } from "./models/general";
import { setEyeToKill } from "./swarm";
import { calcAngleDegrees, getDistance, getDrawPoint } from "./utils";

export class Eye {
  fillStyle = "#ffffff";
  constructor(private ctx: CanvasRenderingContext2D, readonly data: EyeData) {}

  animate(mouse: Coordinates, i: number): void {
    this.white();
    this.pupil(mouse);

    if (
      clickEvent?.clicked &&
      getDistance(this.data, clickEvent) <= this.data.r
    ) {
      console.log(
        "💩 ~ file: Eye.ts ~ line 12 ~ Eye ~ animate ~ clickEvent",
        clickEvent
      );
      this.fillStyle = "#ff0000";

      unsetClick();
      setEyeToKill(i);

      console.log(
        "💩 ~ file: Eye.ts ~ line 14 ~ Eye ~ animate ~ clickEvent",
        clickEvent
      );
    }
  }

  private white(): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.arc(this.data.x, this.data.y, this.data.r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private pupil(mouse: Coordinates): void {
    const distance = getDistance(this.data, mouse);

    const coords =
      distance <= this.data.r * 0.5
        ? mouse
        : this.getAngleCoords(this.data, mouse);

    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    this.ctx.arc(coords.x, coords.y, this.data.r / 5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private getAngleCoords(center: Coordinates, mouse: Coordinates): Coordinates {
    const angle = calcAngleDegrees(center, mouse);
    return getDrawPoint(center, this.data.r, angle, 0.5);
  }
}
