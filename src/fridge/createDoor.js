import * as THREE from 'three';

function makeDoorShelf(y) {
  const shelfGroup = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.1, 0.72),
    new THREE.MeshToonMaterial({ color: '#dde6e8', flatShading: true })
  );
  base.position.set(-0.02, y, 0);

  const rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.16, 0.72),
    new THREE.MeshToonMaterial({ color: '#cad6d8', flatShading: true })
  );
  rail.position.set(0.05, y + 0.08, 0);

  shelfGroup.add(base, rail);
  return shelfGroup;
}

export function createDoor({ height = 1.9, color = '#f2f4f1', accent = '#d8e1df', handleY = 0 }) {
  const hingeGroup = new THREE.Group();

  const door = new THREE.Group();
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, height, 2.08),
    new THREE.MeshToonMaterial({ color, flatShading: true })
  );
  slab.position.x = 0.11;

  const inset = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, height - 0.2, 1.84),
    new THREE.MeshToonMaterial({ color: accent, flatShading: true })
  );
  inset.position.set(0.03, 0, 0);

  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.58, 0.08),
    new THREE.MeshToonMaterial({ color: '#9fb5b8', flatShading: true })
  );
  handle.position.set(0.16, handleY, 0.84);

  door.add(slab, inset, handle);
  door.add(makeDoorShelf(0.45));
  door.add(makeDoorShelf(-0.2));
  if (height > 1.6) {
    door.add(makeDoorShelf(-0.85));
  }

  hingeGroup.add(door);
  hingeGroup.userData.doorMesh = slab;
  hingeGroup.userData.doorGroup = door;
  hingeGroup.userData.openAngle = -Math.PI * 0.62;
  hingeGroup.userData.currentAngle = 0;
  hingeGroup.userData.targetAngle = 0;
  return hingeGroup;
}
