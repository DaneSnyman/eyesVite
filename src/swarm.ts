import { Eye } from "./eye";
import { EyeData, Coordinates } from "./models/general";
import { getDistance } from "./utils";

const eyesToKill: number[] = [];
export const setEyeToKill = (i: number) => {
  setTimeout(() => {
    eyesToKill.push(i);
  }, 500);
};

export class Swarm {
  private eyeSwarm: Array<Eye | undefined> = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    eyes = 50
  ) {
    for (let i = 0; i < eyes; i++) {
      const eyeData = this.getEyeData();
      if (!eyeData) {
        break; // ? Probably no space in viewport
      }
      this.eyeSwarm.push(new Eye(this.ctx, eyeData));
    }
  }

  animate(mouse: Coordinates): void {
    if (eyesToKill.length) {
      // for (const [i, eyeToKill of eyesToKill) {
      for (const eyeToKill of eyesToKill) {
        // this.eyeSwarm.splice(eyeToKill, 1);
        this.eyeSwarm[eyeToKill] = undefined;
        // eyesToKill.splice(i, 1);
      }
    }

    for (const [i, eye] of this.eyeSwarm.entries()) {
      eye?.animate(mouse, i);
    }
  }

  private getEyeData(): EyeData | undefined {
    let eyeData = this.generateEyeData();
    let tries = 0;
    while (this.hasOverlap(eyeData)) {
      eyeData = this.generateEyeData();
      tries++;
      // ? We'll give it a couple of tries to find a space
      if (tries > 1000) {
        return undefined;
      }
    }

    return eyeData;
  }

  private generateEyeData(): EyeData {
    const r = this.randomise(50, 25);
    return {
      x: this.randomise(this.canvas.width - r, r),
      y: this.randomise(this.canvas.height - r, r),
      r,
    };
  }

  private hasOverlap(eyeData: EyeData): boolean {
    for (const eye of this.eyeSwarm) {
      if (eye) {
        const distance = getDistance(eye.data, eyeData);

        if (distance <= eye.data.r + eyeData.r) {
          return true;
        }
      }
    }

    return false;
  }

  private randomise(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
