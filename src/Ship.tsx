import * as React from "react";
import { asset, Model } from "react-vr";

import { Coordiates } from "./Style";

interface ShipProps {
  translate: Coordiates;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

class Ship extends React.Component<ShipProps> {
  static defaultProps: Partial<ShipProps> = {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  };

  render() {
    const { translate, rotateX, rotateY, rotateZ } = this.props;
    return (
      <Model
        source={{
          obj: asset("fearless/fearless.obj"),
          mtl: asset("fearless/fearless.mtl")
        }}
        style={{
          transform: [
            { translate },
            { rotateX },
            { rotateY },
            { rotateZ },
            { scale: 0.5 },
            { rotateX: -90 },
            { rotateZ: 180 },
          ]
        }}
        lit={true}
      />
    );
  }
}

export default Ship;
