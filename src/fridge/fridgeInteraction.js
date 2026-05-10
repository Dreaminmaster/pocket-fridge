export function setupFridgeInteraction({ camera, scene, fridge }) {
  const raycaster = fridge.raycaster;
  const pointer = fridge.pointer;

  function updatePointer(event) {
    const source = event.touches ? event.touches[0] : event;
    pointer.x = (source.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(source.clientY / window.innerHeight) * 2 + 1;
  }

  function onPress(event) {
    if (event.target.closest('.ui-layer')) return;
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(fridge.clickTargets, false);
    if (!hits.length) return;
    const key = hits[0].object.userData.doorKey;
    fridge.toggleDoor(key);
  }

  window.addEventListener('pointerdown', onPress);
  window.addEventListener('touchstart', onPress, { passive: true });

  return () => {
    window.removeEventListener('pointerdown', onPress);
    window.removeEventListener('touchstart', onPress);
  };
}
