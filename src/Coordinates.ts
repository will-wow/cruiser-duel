export type t = { x: number; y: number; z: number };

export const create = (x: number, y: number, z: number): t => ({ x, y, z });

export const getX = ({x}: t) => x;
export const getY = ({y}: t) => y;
export const getZ = ({z}: t) => z;
