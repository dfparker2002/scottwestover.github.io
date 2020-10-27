import { Clock } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const clock = new Clock();
const delta = clock.getDelta();

export default class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      if (object.tick) {
        object.tick(delta);
      }
    }
  }
}
