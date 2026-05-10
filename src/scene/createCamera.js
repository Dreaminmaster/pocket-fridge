import * as THREE from 'three';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(5.8, 3.6, 7.8);
  camera.lookAt(0, 2.2, 0);
  return camera;
}
