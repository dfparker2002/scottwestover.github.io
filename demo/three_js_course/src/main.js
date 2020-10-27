import * as THREE from 'three';
console.log('test');
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

var loader = new GLTFLoader();

loader.load( 'assets/ship_light.gltf', function ( gltf ) {
  console.log(gltf);
  const ship = gltf.scene;
  ship.scale.set(1000, 1000, 1000);
	const t = scene.add( gltf.scene );
  console.log(t);
  animate();
}, undefined, function ( error ) {
	console.error( error );
} );
// animate();
