import { intersects, maxOf } from "./utils";

describe("utils", () => {
  describe("intersects", () => {
    it("finds an intersection", () => {
      expect(intersects([1, 3], [3, 4, 1])).toBeTruthy();
    });

    it("finds when there isn't an intersection", () => {
      expect(intersects([1, 3], [5, 4, 1])).toBeFalsy();
    });
  });

  describe("maxOf", () => {
    it("finds the max", () => {
      expect(maxOf(Math.round)([1.1, 1.2, 1.7])).toBe(1.7);
    });
  });
});
