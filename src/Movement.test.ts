import * as Movement from "./Movement";
import * as Vector from "./Vector";

describe("Movement", () => {
  describe("updateVelocity", () => {
    it("accelerates left", () => {
      const accel = 10;
      const position = Vector.create(0, 0, 0);
      const velocity = Vector.create(0, 0, 0);
      const target = Vector.create(100, 0, 0);
      const deltaSeconds = 0.5;

      expect(
        Movement.updateVelocity(accel, position, velocity, target, deltaSeconds)
      ).toEqual(Vector.create(5, 0, 0));
    });

    it("decelerates left", () => {
      const accel = 10;
      const position = Vector.create(50, 0, 0);
      const velocity = Vector.create(50, 0, 0);
      const target = Vector.create(100, 0, 0);
      const deltaSeconds = 0.5;

      expect(
        Movement.updateVelocity(accel, position, velocity, target, deltaSeconds)
      ).toEqual(Vector.create(45, 0, 0));
    });
  });

  describe("updatePosition", () => {
    it("updates position from velocity", () => {
      const velocity = Vector.create(1, 1, 0);
      const position = Vector.create(1, 1, 0);

      expect(Movement.updatePosition(velocity, position)).toEqual(
        Vector.create(2, 2, 0)
      );
    });
  });

  describe("updateHeading", () => {
    it("updates heading from velocity", () => {
      const velocity = Vector.create(1, 1, 0);

      expect(Movement.updateHeading(velocity)).toEqual(
        Vector.create(0, 0, 45)
      );
    });
  });
});
