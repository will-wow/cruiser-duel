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

// const maxAcceleration = 10;
// const turningSpeed = 10;

class CruiserDuel extends React.Component<{}, CruiserDuelState> {
  lastUpdate: number;
  frameHandle: number | null;

  constructor(props) {
    super(props);

    this.lastUpdate = Date.now();
    this.state = {
      position: { x: 0, y: 0, z: -40 },
      heading: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      target: { x: 40, y: 20, z: -200 },
      acceleration: 10
    };
  }

  frame = () => {
    const { position, velocity, target, acceleration } = this.state;

    // const deltaSeconds = this.getAndUpdateLastUpdated();
    const deltaSeconds = 1;

    const newVelocity = Movement.updateVelocity(
      acceleration,
      position,
      velocity,
      target,
      deltaSeconds
    );

    console.log({ position, velocity, target, acceleration, deltaSeconds });

    this.setState({
      velocity: newVelocity,
      position: Movement.updatePosition(newVelocity, position),
      heading: Movement.updateHeading(newVelocity)
    });

    // this.frameHandle = requestAnimationFrame(this.frame);
  };

  getAndUpdateLastUpdated() {
    const now = Date.now();
    const lastUpdate = this.lastUpdate;
    this.lastUpdate = now;
    return (now - lastUpdate) / 1000;
  }

  componentDidMount() {
    this.frame();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    const { position, heading } = this.state;

    return (
      <View>
        <VrButton onClick={this.frame}>
          <Pano source={asset("space.png")} />
        </VrButton>
        <AmbientLight intensity={1} />

        <Ship heading={heading} position={position} />
      </View>
    );
  }
}

export default CruiserDuel;
