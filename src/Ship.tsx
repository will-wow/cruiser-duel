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
      position,
      heading: { x: rotateX, y: rotateY, z: rotateZ }
    } = this.props;
    return (
      <Model
        source={{
          obj: asset("fearless/fearless.obj"),
          mtl: asset("fearless/fearless.mtl")
        }}
        style={{
          layoutOrigin: [0.5, 0.5],
          transform: [
            { translate: Vector.toArray(position) },
            { rotateZ },
            { rotateY },
            { rotateX },
            { rotateY: 180 },
            { rotateX: -90 },
            { scale: 0.5 }
          ]
        }}
        lit={true}
      />
    );
  }
}

export default Ship;
