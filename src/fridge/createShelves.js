import * as THREE from 'three';

function createShelf(y, depth = 1.25) {
  const shelf = new THREE.Mesh(
    new THREE.BoxGeometry(1.84, 0.06, depth),
    new THREE.MeshToonMaterial({ color: '#dbe6ea', transparent: true, opacity: 0.96, flatShading: true })
  );
  shelf.position.set(0, y, -0.03);
  return shelf;
}

export function createShelves() {
  const group = new THREE.Group();
  group.add(createShelf(2.9, 1.25));
  group.add(createShelf(2.1, 1.25));
  group.add(createShelf(1.25, 1.25));
  group.add(createShelf(0.26, 1.18));
  return group;
}
