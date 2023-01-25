export interface Coordinates {
  x: number;
  y: number;
}

export interface EyeData extends Coordinates {
  r: number;
}

export interface ClickEvent extends Coordinates {
  clicked: boolean;
}
