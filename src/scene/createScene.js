import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f7f0e6');
  scene.fog = new THREE.Fog('#f7f0e6', 12, 28);
  return scene;
}
