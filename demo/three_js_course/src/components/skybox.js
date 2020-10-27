import { CubeTextureLoader } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

export function createSkyboxTexture() {
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    'assets/skybox/left2.jpg',
    'assets/skybox/right2.jpg',
    'assets/skybox/top.png',
    'assets/skybox/bottom_new.jpg',
    'assets/skybox/front2.jpg',
    'assets/skybox/back2.jpg',
  ]);
  return texture;
}
