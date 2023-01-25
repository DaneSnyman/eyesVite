import { Coordinates } from "./models/general";

const getDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  return Math.sqrt(
    Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2)
  );
};

const calcAngleDegrees = (coord1: Coordinates, coord2: Coordinates): number => {
  const coords: Coordinates = {
    x: coord2.x - coord1.x,
    y: coord2.y - coord1.y,
  };
  return Math.atan2(coords.y, coords.x) * (180 / Math.PI);
};

const getDrawPoint = (
  whiteCenter: Coordinates,
  whiteRadius: number,
  angle: number,
  distance: number
): Coordinates => {
  return {
    x:
      whiteCenter.x +
      whiteRadius * Math.cos((-angle * Math.PI) / 180) * distance,
    y:
      whiteCenter.y -
      whiteRadius * Math.sin((-angle * Math.PI) / 180) * distance,
  };
};

export { getDistance, calcAngleDegrees, getDrawPoint };
