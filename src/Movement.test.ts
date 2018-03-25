import * as Movement  from './Movement';
import * as Coordinates  from './Coordinates';

describe('Movement',() => {
  describe('updateVelocity',() => {
    it('accelerates left', () => {
      const accel = 10;
      const position = Coordinates.create(0,0,0);
      const velocity = Coordinates.create(0,0,0);
      const target = Coordinates.create(100,0,0);
      const deltaSeconds = 0.5;

      expect(Movement.updateVelocity(accel, position, velocity, target, deltaSeconds)).toEqual(Coordinates.create(10, 0, 0));
    });

  });
});