import * as R from "ramda";
import * as Util from "./Util";

export type t = { x: number; y: number; z: number };

export const create = (x: number, y: number, z: number): t => ({ x, y, z });

export const getX = ({ x }: t) => x;
export const getY = ({ y }: t) => y;
export const getZ = ({ z }: t) => z;

export const combine = (
  f: (coordinate1: number, coordinate2: number) => number
) => (v1: t, v2: t): t => ({
  x: f(v1.x, v2.x),
  y: f(v1.y, v2.y),
  z: f(v1.z, v2.z)
});

export const map: (f: (coordinate: number) => number) => (vector: t) => t =
  R.map;

export const reduce = (
  f: (acc: number, coordinate: number) => number,
  acc
): ((v: t) => number) => R.pipe(R.values, R.reduce(f, acc));

export const subtract = combine(R.subtract);
export const add = combine(R.add);
export const scale = (scaler: number): ((v: t) => t) => map(R.multiply(scaler));

export const negate = scale(-1);

export const length: (v: t) => number = R.pipe(
  map(Util.square),
  reduce(R.add, 0),
  Math.sqrt
);

const divideBy = R.flip(R.divide);

export const normalize = (v: t): t => {
  const vLength = length(v);
  return map(divideBy(vLength))(v);
};

export const moveTowardPoint = (va: t, vb: t, distance: number): t => {
  const vba = subtract(vb, va);
  const normalizedVba = normalize(vba);
  return scale(distance)(normalizedVba);
};

// TODO
export const toDegrees = (_v: t): number => 0;
