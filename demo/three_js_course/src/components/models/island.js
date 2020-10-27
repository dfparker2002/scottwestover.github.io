import { GLTFLoader } from 'https://unpkg.com/three@0.117.0/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

export async function loadIsland() {
  const loader = new GLTFLoader();

  const cannonData = await loader.loadAsync('assets/cannon.gltf');
  const cannon = setupModel(cannonData);
  cannon.scale.set(5, 5, 5);
  cannon.position.set(0, 0, 0);

  const islandData = await loader.loadAsync('assets/hole.gltf');
  const island = setupModel(islandData);
  island.scale.set(15, 10, 15);
  island.position.set(-0.5, 0, 0);

  return { cannon, island }
}
