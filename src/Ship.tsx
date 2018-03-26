import * as React from "react";
import { asset, Model } from "react-vr";

import * as Vector from "./Vector";

interface ShipProps {
  heading: Vector.t;
  position: Vector.t;
}

class Ship extends React.Component<ShipProps> {
  static defaultProps: Partial<ShipProps> = {
    heading: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 }
  };

  render() {
    const {
      heading: { x: rotateX, y: rotateY, z: rotateZ },
      position: { x: positionX, y: positionY, z: positionZ }
    } = this.props;
    return (
      <Model
        source={{
          obj: asset("fearless/fearless.obj"),
          mtl: asset("fearless/fearless.mtl")
        }}
        style={{
          transform: [
            { translate: [positionX, positionY, positionZ] },
            { rotateX },
            { rotateY },
            { rotateZ },
            { scale: 0.5 },
            { rotateX: -90 },
            { rotateZ: 180 }
          ]
        }}
        lit={true}
      />
    );
  }
}

export default Ship;
