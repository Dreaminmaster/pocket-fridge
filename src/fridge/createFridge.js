import * as THREE from 'three';
import { createDoor } from './createDoor.js';
import { createShelves } from './createShelves.js';

const fridgeBodyMaterial = new THREE.MeshToonMaterial({ color: '#eef2ef', flatShading: true });
const accentMaterial = new THREE.MeshToonMaterial({ color: '#d8e3df', flatShading: true });
const innerMaterial = new THREE.MeshToonMaterial({ color: '#f8fbfa', flatShading: true });

function createBody() {
  const group = new THREE.Group();

  const shell = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.3, 2.25), fridgeBodyMaterial);
  group.add(shell);

  const cavity = new THREE.Mesh(new THREE.BoxGeometry(1.9, 4.0, 1.45), innerMaterial);
  cavity.position.set(0, 0.03, -0.28);
  group.add(cavity);

  const divider = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.08, 1.48), accentMaterial);
  divider.position.set(0, -0.78, -0.26);
  group.add(divider);

  const topCap = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 2.3), accentMaterial);
  topCap.position.y = 2.2;
  group.add(topCap);

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.18, 2.34), accentMaterial);
  base.position.y = -2.14;
  group.add(base);

  return group;
}

function createFeet() {
  const group = new THREE.Group();
  const mat = new THREE.MeshToonMaterial({ color: '#b3c2c3', flatShading: true });
  const positions = [
    [-0.78, -2.28, 0.82],
    [0.78, -2.28, 0.82],
    [-0.78, -2.28, -0.82],
    [0.78, -2.28, -0.82]
  ];
  positions.forEach(([x, y, z]) => {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.18), mat);
    foot.position.set(x, y, z);
    group.add(foot);
  });
  return group;
}

function createGround() {
  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(6, 6.8, 0.2, 24),
    new THREE.MeshToonMaterial({ color: '#eadccf', flatShading: true })
  );
  ground.position.set(0, -2.45, 0);
  return ground;
}

export function createFridge() {
  const root = new THREE.Group();
  const body = createBody();
  const shelves = createShelves();
  const feet = createFeet();
  const ground = createGround();

  const upperDoor = createDoor({ height: 2.45, handleY: -0.1 });
  upperDoor.position.set(-1.1, 0.78, 0);

  const lowerDoor = createDoor({ height: 1.65, color: '#edf1ef', accent: '#d4dfdd', handleY: 0.05 });
  lowerDoor.position.set(-1.1, -1.32, 0);

  const upperDoorMesh = upperDoor.userData.doorMesh;
  upperDoorMesh.userData.doorKey = 'upper';
  const lowerDoorMesh = lowerDoor.userData.doorMesh;
  lowerDoorMesh.userData.doorKey = 'lower';

  const upperZone = new THREE.Group();
  upperZone.position.set(0, 0.15, -0.18);
  const freezerZone = new THREE.Group();
  freezerZone.position.set(0, -1.42, -0.15);
  const doorZone = new THREE.Group();
  doorZone.position.set(0, 0, 0);
  upperDoor.userData.storageGroup = doorZone;
  lowerDoor.userData.storageGroup = doorZone;

  root.add(ground, body, shelves, feet, upperDoor, lowerDoor, upperZone, freezerZone, doorZone);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clickTargets = [upperDoorMesh, lowerDoorMesh];

  const doors = {
    upper: upperDoor,
    lower: lowerDoor
  };

  function toggleDoor(key) {
    const door = doors[key];
    if (!door) return;
    door.userData.targetAngle = Math.abs(door.userData.targetAngle) > 0.01 ? 0 : door.userData.openAngle;
  }

  function update(dt) {
    Object.values(doors).forEach((door) => {
      const current = door.userData.currentAngle;
      const target = door.userData.targetAngle;
      const next = THREE.MathUtils.lerp(current, target, 1 - Math.exp(-dt * 7));
      door.userData.currentAngle = next;
      door.rotation.y = next;
    });
  }

  return {
    root,
    raycaster,
    pointer,
    clickTargets,
    doors,
    upperZone,
    freezerZone,
    doorZone,
    toggleDoor,
    update
  };
}
