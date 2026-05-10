import * as THREE from 'three';

const toon = (color) => new THREE.MeshToonMaterial({ color, flatShading: true });

function add(group, mesh, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1]) {
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  mesh.scale.set(...scale);
  group.add(mesh);
  return mesh;
}

export function createFoodModel(item) {
  const group = new THREE.Group();

  switch (item.modelType) {
    case 'meatStrip': {
      add(group, new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.18, 0.26), toon(item.color)), [0, 0, 0], [0, 0.2, 0]);
      add(group, new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.12), toon('#f6d7cb')), [0.04, 0.09, 0]);
      break;
    }
    case 'chickenCube': {
      for (let i = 0; i < 4; i += 1) {
        add(group, new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.16), toon(item.color)), [((i % 2) - 0.5) * 0.2, Math.floor(i / 2) * 0.12, (i % 2 === 0 ? -0.06 : 0.06)]);
      }
      break;
    }
    case 'drumstick': {
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), toon(item.color)), [0.08, 0, 0], [0, 0, 0], [1.25, 1, 1]);
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.32, 6), toon('#f1eadf')), [-0.16, -0.02, 0], [0, 0, Math.PI / 2]);
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), toon('#f1eadf')), [-0.29, 0.06, 0]);
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), toon('#f1eadf')), [-0.29, -0.08, 0]);
      break;
    }
    case 'wing': {
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 7), toon(item.color)), [-0.08, 0, 0], [0, 0, 0], [1.2, 0.85, 1]);
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 7), toon(item.color)), [0.14, -0.03, 0], [0, 0, 0], [1.1, 0.8, 1]);
      break;
    }
    case 'can': {
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.24, 10), toon(item.color)));
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.02, 10), toon('#d9e3e7')), [0, 0.13, 0]);
      break;
    }
    case 'porkCube': {
      for (let i = 0; i < 3; i += 1) {
        add(group, new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.18), toon(item.color)), [i * 0.15 - 0.15, i % 2 === 0 ? 0 : 0.08, i % 2 === 0 ? -0.04 : 0.04]);
        add(group, new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.18), toon('#f0ceb6')), [i * 0.15 - 0.15, 0.09 + (i % 2 === 0 ? 0 : 0.08), i % 2 === 0 ? -0.04 : 0.04]);
      }
      break;
    }
    case 'onion': {
      add(group, new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), toon(item.color)), [0, 0, 0], [0, 0, 0], [1, 1.05, 1]);
      add(group, new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 6), toon('#e8dbc9')), [0, 0.16, 0]);
      break;
    }
    case 'greens': {
      for (let i = 0; i < 6; i += 1) {
        add(group, new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36 + i * 0.015, 0.04), toon(item.color)), [i * 0.04 - 0.1, 0.12, (i % 2) * 0.04 - 0.02], [0.12 - i * 0.03, 0, 0.08 - i * 0.02]);
      }
      break;
    }
    case 'canTall': {
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.44, 10), toon(item.color)));
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.136, 0.136, 0.02, 10), toon('#d5d9dc')), [0, 0.23, 0]);
      break;
    }
    case 'butter': {
      add(group, new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.2), toon(item.color)));
      break;
    }
    case 'milkCarton': {
      add(group, new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.48, 0.2), toon(item.color)));
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 6), toon('#8fb5d8')), [0.06, 0.22, 0]);
      add(group, new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.16, 4), toon('#cfdcea')), [0, 0.32, 0], [0, Math.PI / 4, 0]);
      break;
    }
    case 'eggs': {
      for (let i = 0; i < 3; i += 1) {
        add(group, new THREE.Mesh(new THREE.SphereGeometry(0.09, 7, 7), toon(item.color)), [i * 0.12 - 0.12, 0, i % 2 === 0 ? -0.02 : 0.04], [0, 0, 0], [0.9, 1.15, 0.9]);
      }
      break;
    }
    case 'sauceBottle': {
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.34, 8), toon(item.color)));
      add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.1, 8), toon('#f1d6b6')), [0, 0.2, 0]);
      add(group, new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.08, 6), toon('#c86b42')), [0, 0.29, 0]);
      break;
    }
    default: {
      add(group, new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), toon(item.color || '#cccccc')));
    }
  }

  group.traverse((child) => {
    if (child.isMesh) child.castShadow = false;
  });

  return group;
}
