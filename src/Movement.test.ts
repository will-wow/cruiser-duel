import * as Movement from "./Movement";
import * as Vector from "./Vector";

describe("Movement", () => {
  describe("updateVelocity", () => {
    it("accelerates", () => {
      const accel = 1;
      const velocity = Vector.create(10, 10, 10);
      const accelerationVector = Vector.create(0.5, 0.5, 0);
      const deltaSeconds = 0.5;

      expect(
        Movement.updateVelocity(
          accel,
          velocity,
          deltaSeconds,
          accelerationVector
        )
      ).toEqual(Vector.create(10.25, 10.25, 10));
    });
    it("decelerates", () => {
      const accel = 1;
      const velocity = Vector.create(10, 10, 10);
      const accelerationVector = Vector.create(-0.5, -0.5, 0);
      const deltaSeconds = 0.5;

      expect(
        Movement.updateVelocity(
          accel,
          velocity,
          deltaSeconds,
          accelerationVector
        )
      ).toEqual(Vector.create(9.75, 9.75, 10));
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
    it("updates heading from acceleration", () => {
      const accelerationVector = Vector.create(4, 2, 1);

      expect(Movement.updateHeading(accelerationVector)).toEqual(
        Vector.create(45, 45, 0)
      );
    });
  });
});
