import { Coordiates } from "./Style";

const toRadians = Math.PI / 180;

export const degreesToRadians = (degrees: number): number =>
  degrees * toRadians;

export const angleToTranslate = (radius: number, y: number) => (
  angle: number
): Coordiates => {
  const radians = degreesToRadians(angle);
  const x = radius * Math.sin(radians);
  const z = radius * Math.cos(radians);
  return [x, y, -z];
};
