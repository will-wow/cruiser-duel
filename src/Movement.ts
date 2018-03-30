import * as R from "ramda";

import * as Vector from "./Vector";
import * as Util from "./Util";

export const calculateAccelerationVector = (
  maxAccel: number,
  position: Vector.t,
  velocity: Vector.t,
  target: Vector.t
) => {
  const stopDirection = vectorToStop(maxAccel, velocity);
  const targetDirection = vectorToTarget(position, target);

  const fullAccelerationToTarget = Vector.add(targetDirection, stopDirection);

  const fullAccelerationToTargetLength = Vector.length(
    fullAccelerationToTarget
  );

  const accelerationVector =
    fullAccelerationToTargetLength <= maxAccel
      ? fullAccelerationToTarget
      : Vector.scale(maxAccel)(Vector.normalize(fullAccelerationToTarget));

  return accelerationVector;
};

export const updateVelocity = (
  maxAccel: number,
  velocity: Vector.t,
  accelerationVector: Vector.t,
  deltaSeconds: number
) => {
  // TODO: WHYYYYYYY maxAccel *
  const deltaV = Vector.scale(maxAccel * deltaSeconds)(accelerationVector);

  return Vector.add(velocity, deltaV);
};

export const updatePosition = (
  deltaSeconds: number,
  velocity: Vector.t,
  position: Vector.t
): Vector.t =>
  R.pipe(Vector.scale(deltaSeconds), Vector.add(position))(velocity);

export const updateHeading: (accelerationVector: Vector.t) => Vector.t = (
  accelerationVector: Vector.t
) => {
  const { x, y, z } = Vector.normalize(accelerationVector);

  return {
    x: radiansToDegrees(Math.asin(y)),
    y: radiansToDegrees(Math.atan2(z, x)),
    z: 0
  };
};

const fromRadians = 180 / Math.PI;
const radiansToDegrees = radians => radians * fromRadians;

/**
 * The the point the ship could stop at if it started decelerating now, given the position is 0, 0.
 */
const vectorToStop = (accel: number, velocity: Vector.t): Vector.t => {
  const toStop = stopDistance(accel);
  return Vector.map(toStop)(velocity);
};

const stopDistance = accel => velocity =>
  Util.square(velocity) / (2 * accel) * (velocity > 0 ? -1 : 1);

/**
 * The target, given the position is 0, 0.
 */
const vectorToTarget: (
  position: Vector.t,
  target: Vector.t
) => Vector.t = R.flip(Vector.subtract);
