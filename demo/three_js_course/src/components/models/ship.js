import { GLTFLoader } from 'https://unpkg.com/three@0.117.0/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

export async function loadShip() {
  const loader = new GLTFLoader();

  const shipData = await loader.loadAsync('assets/ship_dark.gltf');
  const ship = setupModel(shipData);
  ship.position.set(35, 0, 0);

  ship.tick = (delta) => {
    ship.translateX(delta * -1.2);
  };

  return { ship }
}
