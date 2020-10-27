import { Color, Scene } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

export function createScene() {
  const scene = new Scene();

  scene.background = new Color('skyblue');

  return scene;
}
