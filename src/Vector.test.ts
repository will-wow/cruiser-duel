import * as R from "ramda";

import * as Vector from "./Vector";

describe("Vector", () => {
  describe("normalize", () => {
    it("normalizes a simple set of vectors", () => {
      const v = Vector.create(5, 5, 5);

      const expected = Vector.create(0.577, 0.577, 0.577);

      const result = Vector.normalize(v);

      expect(result.x).toBeCloseTo(expected.x);
    });
  });

  describe("map", () => {
    it("maps a vector", () => {
      const v = Vector.create(1, 2, 3);

      const expected = Vector.create(2, 4, 6);

      expect(Vector.map(R.multiply(2))(v)).toEqual(expected);
    });
  });
});
