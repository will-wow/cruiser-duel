import * as React from "react";
import { View, Sphere, VrButton } from "react-vr";

import * as Vector from "./Vector";

interface NavigationSphereProps {
  onClick: () => void;
  radius: number;
  position: Vector.t;
}

const logMove = e => console.log("move", e.nativeEvent);
const logEnter = e => {
  console.log("enter", e);
  debugger;
};
const logExit = e => console.log("exit", e);
const logInput = e => console.log("input", e);
const logInputCaptured = e => console.log("input cap", e);

const NavigationSphere = ({
  onClick,
  radius,
  position
}: NavigationSphereProps) => (
  <VrButton onClick={onClick}>
    <Sphere
      onEnter={logEnter}
      onMove={logEnter}
      radius={radius}
      style={{
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: Vector.toArray(position) }],
        opacity: 0.5,
        color: "skyblue"
      }}
    />
  </VrButton>
);

export default NavigationSphere;
