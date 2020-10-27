import { PerspectiveCamera } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

export function createCamera() {
  const camera = new PerspectiveCamera(
    70, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(-10, 30, 30);

  return camera;
}
