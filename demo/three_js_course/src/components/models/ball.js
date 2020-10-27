import { GLTFLoader } from 'https://unpkg.com/three@0.117.0/examples/jsm/loaders/GLTFLoader.js';
import { MathUtils } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { setupModel } from './setupModel.js';

export async function loadCannonBall() {
  const loader = new GLTFLoader();

  const ballData = await loader.loadAsync('assets/cannonBall.gltf');
  const ball = setupModel(ballData);
  ball.scale.set(10, 10, 10);
  ball.position.set(0, 1.5, 0);

  // this method will be called once per frame
  const radiansPerSecond = MathUtils.degToRad(30);
  ball.tick = (delta) => {};
  ball.shot = false;

  ball.fire = () => {
    if (!ball.shot) {
      ball.shot = true;
      ball.position.set(0, 1.5, 0);
      ball.tick = (delta) => {
        ball.translateZ(delta * -40);
      };
    }
  };

  ball.reset = () => {
    ball.tick = (delta) => {};
    ball.position.set(0, 1.5, 0);
    ball.shot = false;
  };

  return { ball }
}
