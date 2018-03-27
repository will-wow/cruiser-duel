import * as React from "react";
import { asset, View, Pano, AmbientLight, VrButton } from "react-vr";

import * as Vector from "./Vector";
import * as Movement from "./Movement";

import Ship from "./Ship";

interface CruiserDuelState {
  position: Vector.t;
  heading: Vector.t;
  velocity: Vector.t;
  target: Vector.t;
  acceleration: number;
}

const mass = 100;

// const maxAcceleration = 10;
// const turningSpeed = 10;

class CruiserDuel extends React.Component<{}, CruiserDuelState> {
  lastUpdate: number;
  frameHandle: number | null;

  constructor(props) {
    super(props);

    this.lastUpdate = Date.now();
    this.state = {
      position: { x: 0, y: 0, z: -20 },
      heading: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      target: { x: 100, y: 100, z: -400 },
      acceleration: 10
    };
  }

  frame = () => {
    const { position, velocity, target, acceleration } = this.state;

    // const deltaSeconds = this.getAndUpdateLastUpdated();
    const deltaSeconds = 0.05;

    const accelerationVector = Movement.calculateAccelerationVector(
      acceleration,
      position,
      velocity,
      target
    );

    const newVelocity = Movement.updateVelocity(
      acceleration,
      velocity,
      deltaSeconds,
      accelerationVector
    );

    this.setState({
      velocity: newVelocity,
      position: Movement.updatePosition(newVelocity, position),
      heading: Movement.updateHeading(accelerationVector)
    });

    this.frameHandle = requestAnimationFrame(this.frame);
  };

  getAndUpdateLastUpdated() {
    const now = Date.now();
    const lastUpdate = this.lastUpdate;
    this.lastUpdate = now;
    return (now - lastUpdate) / 1000;
  }

  componentDidMount() {
    // this.frame();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  toggle = () => {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    } else {
      this.frame();
    }

  }

  render() {
    const { position, heading } = this.state;

    return (
      <View>
        <VrButton onClick={this.toggle}>
          <Pano source={asset("space.png")} />
        </VrButton>
        <AmbientLight intensity={1} />

        <Ship heading={heading} position={position} />
      </View>
    );
  }
}

export default CruiserDuel;
