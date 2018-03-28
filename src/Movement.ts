import * as R from "ramda";

import * as Vector from "./Vector";
import * as Util from "./Util";

const stopDistance = accel => velocity => Util.square(velocity) / (2 * accel);

/**
 * The the point the ship could stop at if it started decelerating now, given the position is 0, 0.
 */
const vectorToStop = (accel: number, velocity: Vector.t): Vector.t => {
  const toStop = stopDistance(accel);
  const stopPoint = Vector.map(toStop)(velocity);
  return Vector.negate(stopPoint);
};

/**
 * The target, given the position is 0, 0.
 */
const vectorToTarget: (
  position: Vector.t,
  target: Vector.t
) => Vector.t = R.flip(Vector.subtract);

export const calculateAccelerationVector = (
  maxAccel: number,
  position: Vector.t,
  velocity: Vector.t,
  target: Vector.t
) => {
  const stopDirection = vectorToStop(maxAccel, velocity);
  const targetDirection = vectorToTarget(position, target);

  const accelerationDirection = Vector.add(stopDirection, targetDirection);

  return Vector.normalize(accelerationDirection);
};

export const updateVelocity = (
  maxAccel: number,
  velocity: Vector.t,
  deltaSeconds: number,
  accelerationVector: Vector.t
) => {
  const deltaV = Vector.scale(maxAccel * deltaSeconds)(accelerationVector);

  return Vector.add(velocity, deltaV);
};

export const updatePosition: (
  velocity: Vector.t,
  position: Vector.t
) => Vector.t =
  Vector.add;

export const updateHeading: (accelerationVector: Vector.t) => Vector.t = ({
  x,
  y,
  z
}: Vector.t) => {
  const heading = {
    x: radiansToDegrees(Math.asin(y)),
    y: radiansToDegrees(Math.atan2(z, x)),
    z: 0
  };

  console.log(heading, { x, y, z });

  return heading;
};

const cooordinatesToDegrees = (x, y) => {
  const radians = VectorToRadians(x, y);
  return radiansToDegrees(radians);
};

const VectorToRadians = (x, y) => Math.atan2(y, x);

const toRadians = Math.PI / 180;
const fromRadians = 180 / Math.PI;

const degreesToRadians = degrees => degrees * toRadians;

const radiansToDegrees = radians => radians * fromRadians;
