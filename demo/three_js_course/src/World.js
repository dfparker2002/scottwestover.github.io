import { Object3D, Fog, Box3, BoxHelper } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { loadShip } from './components/models/ship.js';
import { loadIsland } from './components/models/island.js';
import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createMeshGroup } from './components/meshGroup.js';
import { createWater } from './components/water.js';
import { createSkyboxTexture } from './components/skybox.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { loadCannonBall } from './components/models/ball.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import Resizer from './systems/Resizer.js';
import Loop from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;
let pivotPoint;
let shotsLeft = 10;
let gameOver = false;

function detectCollisionCubes(object1, object2){
  // const box1 = new BoxHelper(object1, 0xffff00);
  // const box2 = new BoxHelper(object2, 0xffff00);
  // console.log(object1, object2);
  const box1 = new Box3().setFromObject(object1);
  const box2 = new Box3().setFromObject(object2);
  // console.log('bounding box coordinates: ' +
  //       '(' + box1.min.x + ', ' + box1.min.y + ', ' + box1.min.z + '), ' +
  //       '(' + box1.max.x + ', ' + box1.max.y + ', ' + box1.max.z + ')' );
  // console.log('bounding box coordinates: ' +
  //       '(' + box2.min.x + ', ' + box2.min.y + ', ' + box2.min.z + '), ' +
  //       '(' + box2.max.x + ', ' + box2.max.y + ', ' + box2.max.z + ')' );

	// object1.geometry.computeBoundingBox();
  // object2.geometry.computeBoundingBox();
  // object1.updateMatrixWorld();
  // object2.updateMatrixWorld();

  // box1.copy(object1.geometry.boundingBox).applyMatrix4(object1.matrixWorld);
  // box2.copy(object2.geometry.boundingBox).applyMatrix4(object2.matrixWorld);

  // var box1 = object1.geometry.boundingBox.clone();
  // box1.applyMatrix4(object1.matrixWorld);

  // var box2 = object2.geometry.boundingBox.clone();
  // box2.applyMatrix4(object2.matrixWorld);

  return box1.intersectsBox(box2);
}

export default class World {
  // 1. Create an instance of the World app
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    const controls = createControls(camera, renderer.domElement);

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    loop.updatables.push(controls);

    const { ambientLight, mainLight } = createLights();

    // skybox
    const skybox = createSkyboxTexture();
    scene.background = skybox;
    const near = 1;
    const far = 500;
    const color = 'lightblue';
    scene.fog = new Fog(color, near, far);

    // water plane
    const water = createWater();
    scene.add(water);
    loop.updatables.push(water);

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
    document.getElementById('shotsLeftSpan').innerHTML = shotsLeft;
  }

  async init() {
    const { ship } = await loadShip();
    const { cannon, island } = await loadIsland();
    const { ball } = await loadCannonBall();

    // const shipHelper = new BoxHelper(ship, 0xffff00);
    // scene.add(shipHelper);
    // const ballHelper = new BoxHelper(ball, 0xffff00);
    // scene.add(ballHelper);
    // const islandHelper = new BoxHelper(island, 0xffff00);
    // scene.add(islandHelper);

    scene.add(cannon, island, ball);
    loop.updatables.push(ball);

    // pivots
    const parent = new Object3D();
    parent.rotation.x = Math.PI / 2;
    scene.add(parent);

    // pivots
    var pivot1 = new Object3D();
    var pivot2 = new Object3D();
    var pivot3 = new Object3D();
    pivot1.rotation.z = 0;
    pivot2.rotation.z = 2 * Math.PI / 3;
    pivot3.rotation.z = 4 * Math.PI / 3;
    parent.add(pivot1);
    parent.add(pivot2);
    parent.add(pivot3);

    ship.rotation.x = Math.PI / -2;
    pivot1.add(ship);
    const shipClone = ship.clone();
    pivot2.add(shipClone);
    const shipClone2 = ship.clone();
    pivot3.add(shipClone2);

    // this method will be called once per frame
    parent.tick = (delta) => {
      // shipHelper.update();
      // ballHelper.update();
      parent.rotation.z -= 0.005;
      if (Math.abs(ball.position.z - cannon.position.z) >= 50
        || Math.abs(ball.position.x - cannon.position.x) >= 50
        || Math.abs(ball.position.y - cannon.position.y) >= 50) {
        ball.reset();
        if (shotsLeft === 0) {
          if(!alert('You Lost...')){window.location.reload();}
        }
      }
      if (ball.shot && !gameOver) {
        if (detectCollisionCubes(ball, ship)) {
          ship.visible = false ;
          // console.log('hit', ship);
          // ship.geometry.dispose();
          // ship.material.dispose();
          // for( var i = scene.children.length - 1; i >= 0; i--) {
          //   const obj = scene.children[i];
          //   if (obj.name === '') {
          //     if (obj.children && obj.children.length > 0) {
          //       console.log(obj.children)
          //       for( var j = obj.children.length - 1; j >= 0; j--) {
          //         const obj2 = obj.children[j];
          //         for( var k = obj2.children.length - 1; k >= 0; k--) {
          //           const obj3 = obj2.children[k];
          //           console.log(obj3.uuid, ship.uuid);
          //           if (obj3.uuid === ship.uuid) {
          //             console.log('match');
          //             // scene.remove(obj2);
          //           }
          //         }
          //       }
          //     }
          //     // scene.remove(obj);
          //   }
          //   // scene.remove(obj);
          // }
        }
        if (detectCollisionCubes(ball, shipClone)) {
          // shipClone.dispose();
          shipClone.visible = false ;
        }
        if (detectCollisionCubes(ball, shipClone2)) {
          // shipClone2.dispose();
          shipClone2.visible = false ;
        }

        if (!ship.visible && !shipClone.visible && !shipClone2.visible) {
          gameOver = true;
          if(!alert('You win!')){window.location.reload();}
        }
        // console.log('ship1: ', detectCollisionCubes(ball, ship));
        // // console.log('shipHelper: ', shipHelper)
        // console.log('ship2: ', detectCollisionCubes(ball, shipClone));
        // console.log('ship3: ', detectCollisionCubes(ball, shipClone2));
      }
      if ((detectCollisionCubes(island, ship) || detectCollisionCubes(island, shipClone) || detectCollisionCubes(island, shipClone2)) && !gameOver) {
        gameOver = true;
        if(!alert('You Lost...')){window.location.reload();}
      }
    };

    // scene.add(ship, island, cannon);
    shipClone.tick = (delta) => {
      shipClone.translateX(delta * -1);
    };
    shipClone2.tick = (delta) => {
      shipClone2.translateX(delta * -0.8);
    };
    loop.updatables.push(parent, ship, shipClone, shipClone2);

    // key handling
    document.onkeydown = function(e) {
      switch (e.key) {
        case 'ArrowRight':
          cannon.rotation.y -= 0.2;
          break;
        case 'ArrowLeft':
          cannon.rotation.y += 0.2;
          break;
        case ' ':
        case 'Spacebar':
          if (!ball.shot && shotsLeft > 0) {
            ball.quaternion.copy(cannon.quaternion);
            ball.fire();
            shotsLeft--;
            document.getElementById('shotsLeftSpan').innerHTML = shotsLeft;
          }
          break;
      }
    };
  }

  // 2. Render the scene
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}
