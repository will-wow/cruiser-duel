import * as Coordinates from "./Coordinates";

export const updateVelocity = (
  maxAccel: number,
  position: Coordinates.t,
  velocity: Coordinates.t,
  target: Coordinates.t,
  deltaSeconds: number
): Coordinates.t => {
  const accel = maxAccel * deltaSeconds;
  return {
    x: deltaV(accel, position.x, target.x, velocity.x),
    y: deltaV(accel, position.y, target.y, velocity.y),
    z: deltaV(accel, position.z, target.z, velocity.z)
  };
};

export const updatePosition = (
  velocity: Coordinates.t,
  position: Coordinates.t
): Coordinates.t => ({
  x: velocity.x + position.x,
  y: velocity.y + position.y,
  z: velocity.z + position.z
});

export const updateHeading = ({ x, y, z }: Coordinates.t) => ({
  x: cooordinatesToDegrees(y, z),
  y: cooordinatesToDegrees(x, z),
  z: cooordinatesToDegrees(x, y)
});

const cooordinatesToDegrees = (x, y): number => {
  const radians = coordinatesToRadians(x, y);
  return readiansToDegrees(radians);
};
const coordinatesToRadians = (x, y) => Math.atan2(y, x);

const toRadians = Math.PI / 180;
const fromRadians = 180 / Math.PI;

export const degreesToRadians = (degrees: number): number =>
  degrees * toRadians;
const readiansToDegrees = (radians: number): number => radians * fromRadians;

const deltaV = (maxAccel, position, target, velocity): number => {
  const distanceToGo = Math.abs(target - position);
  const timeToStop = velocity / maxAccel;
  const distanceToStop = 0.5 * maxAccel * timeToStop * timeToStop;

  return distanceToGo > distanceToStop
    ? accelerate(maxAccel, position, target, velocity)
    : decelerate(maxAccel, position, target, velocity);
};

const accelerate = (accel, position, target, velocity) =>
  position > target ? velocity + accel : velocity - accel;

const decelerate = (accel, position, target, velocity) =>
  position > target ? velocity - accel : velocity - accel;
