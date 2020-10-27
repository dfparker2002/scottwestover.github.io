import { PlaneGeometry, Mesh, MeshToonMaterial, DoubleSide, EdgesGeometry, LineBasicMaterial, LineSegments } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

export function createWater() {
  var geometry = new PlaneGeometry(800, 800, 60, 60);
  var material = new MeshToonMaterial({
    color: 0x093a48,
    wireframe: true,
  });
  var plane = new Mesh( geometry, material );
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -0.1;

  var vertexHeight = 10;
  // console.log(geometry.vertices.length);
  for (var i = 0; i < geometry.vertices.length; i++) {
    geometry.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
    geometry.vertices[i]._myZ = geometry.vertices[i].z;
  }

  // this method will be called once per frame
  var count = 0;
  plane.tick = (delta) => {
    for (var i = 0; i < geometry.vertices.length; i++) {
      var z = +geometry.vertices[i].z;
      geometry.vertices[i].z = Math.sin(( i + count * 0.00002)) * (geometry.vertices[i]._myZ - (geometry.vertices[i]._myZ* 0.6))
      plane.geometry.verticesNeedUpdate = true;

      count += 0.1
    }
  };

  return plane;
}
