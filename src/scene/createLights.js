import * as THREE from 'three';

export function createLights(scene) {
  const ambient = new THREE.HemisphereLight('#fff8ef', '#c7d6d8', 1.25);
  scene.add(ambient);

  const key = new THREE.DirectionalLight('#fff4de', 1.8);
  key.position.set(6, 8, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight('#dbefff', 0.65);
  fill.position.set(-5, 4, 6);
  scene.add(fill);
}
