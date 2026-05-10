import './style.css';
import * as THREE from 'three';
import { createScene } from './scene/createScene.js';
import { createCamera } from './scene/createCamera.js';
import { createLights } from './scene/createLights.js';
import { createRenderer } from './scene/createRenderer.js';
import { createFridge } from './fridge/createFridge.js';
import { setupFridgeInteraction } from './fridge/fridgeInteraction.js';
import { foodItems } from './foods/foodData.js';
import { createFoodFromItem } from './foods/createFoodModel.js';
import { createFoodPlacer } from './foods/placeFood.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="page-shell">
    <div class="canvas-wrap" id="scene-root"></div>

    <div class="hero-copy ui-layer">
      <span class="badge">Pocket Fridge</span>
      <h1>Low-poly 互动冰箱</h1>
      <p>点击上下柜门开合，点右侧食材卡片把食物放进冰箱。</p>
    </div>

    <button class="panel-toggle ui-layer" id="panelToggle" aria-label="切换食材面板">
      <span>＋</span>
    </button>

    <aside class="food-panel ui-layer" id="foodPanel">
      <div class="panel-head">
        <h2>食材选择</h2>
        <p>点击卡片添加到对应区域</p>
      </div>
      <div class="food-grid" id="foodGrid"></div>
    </aside>
  </div>
`;

const sceneRoot = document.querySelector('#scene-root');
const panelToggle = document.querySelector('#panelToggle');
const foodPanel = document.querySelector('#foodPanel');
const foodGrid = document.querySelector('#foodGrid');

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer(sceneRoot);
createLights(scene);

const fridge = createFridge();
scene.add(fridge.root);

const placer = createFoodPlacer(fridge);
setupFridgeInteraction({ camera, scene, fridge });

const decorGroup = new THREE.Group();
scene.add(decorGroup);
for (let i = 0; i < 7; i += 1) {
  const blob = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.18 + i * 0.02, 0),
    new THREE.MeshToonMaterial({ color: i % 2 === 0 ? '#f1c9ae' : '#d9e7c7', flatShading: true })
  );
  blob.position.set(-4 + i * 1.2, -1.9 + (i % 2) * 0.06, -2.5 + (i % 3) * 0.3);
  decorGroup.add(blob);
}

function createFoodCard(item) {
  const card = document.createElement('button');
  card.className = 'food-card';
  card.innerHTML = `
    <span class="food-icon">${item.icon}</span>
    <span class="food-name">${item.name}</span>
    <span class="food-target">${labelTarget(item.target)}</span>
  `;

  card.addEventListener('click', () => {
    const model = createFoodFromItem(item);
    placer.placeFood(model, item);
    if (item.target === 'door') fridge.doors.upper.userData.targetAngle = fridge.doors.upper.userData.openAngle;
    if (item.target === 'freezer') fridge.doors.lower.userData.targetAngle = fridge.doors.lower.userData.openAngle;
    if (item.target === 'fridgeShelf') fridge.doors.upper.userData.targetAngle = fridge.doors.upper.userData.openAngle;
  });

  return card;
}

function labelTarget(target) {
  if (target === 'door') return '柜门置物架';
  if (target === 'freezer') return '冷冻区';
  return '冷藏层架';
}

foodItems.forEach((item) => foodGrid.appendChild(createFoodCard(item)));

let panelOpen = false;
panelToggle.addEventListener('click', () => {
  panelOpen = !panelOpen;
  foodPanel.classList.toggle('open', panelOpen);
  panelToggle.classList.toggle('active', panelOpen);
  panelToggle.querySelector('span').textContent = panelOpen ? '×' : '＋';
});

const clock = new THREE.Clock();

function updateResponsiveCamera() {
  const isMobile = window.innerWidth < 768;
  camera.fov = isMobile ? 50 : 42;
  camera.position.set(isMobile ? 6.8 : 5.8, isMobile ? 4.2 : 3.6, isMobile ? 9.4 : 7.8);
  camera.lookAt(0, 1.8, 0);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', updateResponsiveCamera);
updateResponsiveCamera();

function animate() {
  const dt = clock.getDelta();
  fridge.update(dt);
  placer.update(dt);
  fridge.root.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.08;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
