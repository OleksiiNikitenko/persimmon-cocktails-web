import  {environment} from "../../../environments/environment";

export const URLS = {
  getModerators: `${environment.apiBaseUrl}/moderator/all`,
  addModerator: `${environment.apiBaseUrl}/moderator/add`,
  updateModerator: `${environment.apiBaseUrl}/moderator/update-name`,

  getIngredients: `${environment.apiBaseUrl}/ingredient`,
  addIngredient: `${environment.apiBaseUrl}/ingredient`,
  updateIngredient: `${environment.apiBaseUrl}/ingredient`,

  getKitchenware: `${environment.apiBaseUrl}/kitchenware`,
  addKitchenware: `${environment.apiBaseUrl}/kitchenware`,
  updateKitchenware: `${environment.apiBaseUrl}/kitchenware`,

  getDish: `${environment.apiBaseUrl}/cocktail/search`,
  addDish: `${environment.apiBaseUrl}/cocktail/create`,
  updateDish: `${environment.apiBaseUrl}/cocktail/update`,
}
