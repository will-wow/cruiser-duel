import { VRInstance } from "react-vr-web";

import * as THREE from "three";
import * as OVRUI from "ovrui";

import ControllerRayCaster from "react-vr-controller-raycaster";

function init(bundle, parent, options) {
  const scene = new THREE.Scene();

  const vr = new VRInstance(bundle, "App", parent, {
    raycasters: [
      new OVRUI.MouseRayCaster(),
      new ControllerRayCaster({ scene, color: "#ff0000" })
    ],
    scene,
    cursorVisibility: "visible",
    ...options
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = { init };
