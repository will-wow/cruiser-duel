import * as React from "react";
import { asset, View, Pano, AmbientLight, VrButton, Sphere } from "react-vr";

import * as Vector from "./Vector";
import * as Movement from "./Movement";

import Ship from "./Ship";
import NavigationSphere from "./NavigationSphere";

interface CruiserDuelState {
  position: Vector.t;
  heading: Vector.t;
  velocity: Vector.t;
  target: Vector.t;
  acceleration: number;
  navigationRadius: number;
  navigationOn: boolean;
}

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
      target: { x: 300, y: 100, z: -300 },
      acceleration: 3,
      navigationRadius: 100,
      navigationOn: true
    };

    // setTimeout(() => {
    //   this.setState({
    //     target: { x: -300, y: 0, z: -300 }
    //   });
    // }, 5000);

    // setTimeout(() => {
    //   this.setState({
    //     target: { x: 0, y: 0, z: -40 }
    //   });
    // }, 30000);
  }

  frame = () => {
    const { position, velocity, target, acceleration } = this.state;

    // const deltaSeconds = this.getAndUpdateLastUpdated();
    const deltaSeconds = 0.05;

    const newPosition = Movement.updatePosition(
      deltaSeconds,
      velocity,
      position
    );

    const accelerationVector = Movement.calculateAccelerationVector(
      acceleration,
      newPosition,
      velocity,
      target
    );

    const newVelocity = Movement.updateVelocity(
      acceleration,
      velocity,
      accelerationVector,
      deltaSeconds
    );

    const newHeading = Movement.updateHeading(accelerationVector);

    this.setState({
      velocity: newVelocity,
      position: newPosition,
      heading: newHeading
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
  };

  render() {
    const {
      position,
      target,
      heading,
      navigationRadius,
      navigationOn
    } = this.state;

    return (
      <View>
        <Pano source={asset("space.png")} />
        <AmbientLight intensity={1} />

        <Sphere
          radius={5}
          style={{
            color: "darkseagreen",
            transform: [{ translate: Vector.toArray(target) }]
          }}
        />

        <Ship heading={heading} position={position} />

        {navigationOn && (
          <NavigationSphere
            position={position}
            radius={navigationRadius}
            onClick={this.toggle}
          />
        )}
      </View>
    );
  }
}

export default CruiserDuel;
