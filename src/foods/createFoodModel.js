import { createFoodModel } from './foodModels.js';

export function createFoodFromItem(item) {
  const model = createFoodModel(item);
  model.userData.item = item;
  return model;
}
