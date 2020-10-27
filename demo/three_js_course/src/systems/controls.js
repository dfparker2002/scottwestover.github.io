import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enablePan = false;

  controls.tick = () => controls.update();

  return controls;
}
