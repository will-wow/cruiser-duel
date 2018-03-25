import * as React from "react";
import { asset, View, Pano, AmbientLight } from "react-vr";

import Ship from "./Ship";

import { angleToTranslate } from "./Circle";

interface CruiserDuelState {
  angle: number;
}

const speed = 200;

const toPosition = angleToTranslate(100, -15);

class CruiserDuel extends React.Component<{}, CruiserDuelState> {
  lastUpdate: number;
  frameHandle: number | null;

  constructor(props) {
    super(props);

    this.lastUpdate = Date.now();
    this.state = { angle: 0 };

    this.rotate = this.rotate.bind(this);
  }

  rotate() {
    const { angle } = this.state;

    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({ angle: (angle + delta / speed) % 360 });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    const { angle } = this.state;

    return (
      <View>
        <Pano source={asset("space.png")} />
        <AmbientLight intensity={0.5} />

        <Ship translate={toPosition(angle + 0)} rotateY={-90 - angle} />
        <Ship translate={toPosition(angle + 90)} rotateY={-90 - 90 - angle} />
        <Ship translate={toPosition(angle + 180)} rotateY={-90 - 180 - angle} />
        <Ship translate={toPosition(angle + 270)} rotateY={-90 - 270 - angle} />
      </View>
    );
  }
}

export default CruiserDuel;
