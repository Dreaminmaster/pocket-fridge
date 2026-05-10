import * as THREE from 'three';

const zoneLayouts = {
  fridgeShelf: {
    positions: [
      [-0.55, 2.95, -0.2], [0.08, 2.95, -0.18], [0.58, 2.95, -0.18],
      [-0.58, 2.14, -0.1], [0.02, 2.14, -0.08], [0.56, 2.14, -0.08],
      [-0.52, 1.31, -0.06], [0.02, 1.31, -0.06], [0.54, 1.31, -0.06]
    ]
  },
  freezer: {
    positions: [
      [-0.5, 0.25, -0.05], [0.02, 0.25, -0.05], [0.5, 0.25, -0.05],
      [-0.5, -0.05, -0.3], [0.02, -0.05, -0.3], [0.5, -0.05, -0.3],
      [-0.24, -0.34, 0.15], [0.28, -0.34, 0.15]
    ]
  },
  door: {
    positions: [
      [0.16, 1.5, -0.58], [0.16, 1.15, 0], [0.16, 0.82, 0.58],
      [0.16, 0.3, -0.58], [0.16, -0.02, 0], [0.16, -0.34, 0.58],
      [0.16, -0.92, -0.52], [0.16, -1.2, 0.02], [0.16, -1.46, 0.56]
    ]
  }
};

export function createFoodPlacer(fridge) {
  const state = {
    fridgeShelf: 0,
    freezer: 0,
    door: 0
  };

  const animations = [];

  function getZoneGroup(target) {
    if (target === 'freezer') return fridge.freezerZone;
    if (target === 'door') return fridge.doorZone;
    return fridge.upperZone;
  }

  function placeFood(model, item) {
    const target = item.target;
    const layout = zoneLayouts[target];
    const idx = state[target] % layout.positions.length;
    state[target] += 1;

    const [x, y, z] = layout.positions[idx];
    model.position.set(x, y + 0.38, z);
    model.scale.setScalar(0.01);
    model.rotation.y = (idx % 3) * 0.45;

    const targetGroup = getZoneGroup(target);
    targetGroup.add(model);

    animations.push({
      model,
      elapsed: 0,
      duration: 0.5,
      fromY: y + 0.38,
      toY: y
    });
  }

  function update(dt) {
    for (let i = animations.length - 1; i >= 0; i -= 1) {
      const anim = animations[i];
      anim.elapsed += dt;
      const t = Math.min(anim.elapsed / anim.duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const pop = t < 0.7 ? 0.85 + ease * 0.55 : 1.05 - (t - 0.7) / 0.3 * 0.05;
      anim.model.position.y = THREE.MathUtils.lerp(anim.fromY, anim.toY, ease);
      anim.model.scale.setScalar(pop);
      if (t >= 1) {
        anim.model.position.y = anim.toY;
        anim.model.scale.setScalar(1);
        animations.splice(i, 1);
      }
    }
  }

  return { placeFood, update };
}
