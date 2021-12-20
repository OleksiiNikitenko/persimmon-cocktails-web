import  {environment} from "../../../environments/environment";

export const URLS = {
  getModerators: `${environment.apiBaseUrl}/moderator/all`,
  addModerator: `${environment.apiBaseUrl}/moderator/add`,
  updateModerator: `${environment.apiBaseUrl}/moderator/update-name`,
  changeStatus: `${environment.apiBaseUrl}/moderator/change-status`,

  getIngredients: `${environment.apiBaseUrl}/ingredient`,
  addIngredient: `${environment.apiBaseUrl}/ingredient`,
  updateIngredient: `${environment.apiBaseUrl}/ingredient/update-name`,
  activateIngredient: `${environment.apiBaseUrl}/ingredient/activate/`,
  deactivateIngredient: `${environment.apiBaseUrl}/ingredient/deactivate/`,
  updateIngredientPhoto: `${environment.apiBaseUrl}/ingredient/update-photo`,
  searchIngredient: `${environment.apiBaseUrl}/ingredient/active/search-by-prefix`,

  getKitchenware: `${environment.apiBaseUrl}/kitchenware`,
  addKitchenware: `${environment.apiBaseUrl}/kitchenware`,
  updateKitchenware: `${environment.apiBaseUrl}/kitchenware/update-name`,
  activateKitchenware: `${environment.apiBaseUrl}/kitchenware/activate/`,
  deactivateKitchenware: `${environment.apiBaseUrl}/kitchenware/deactivate/`,
  updateKitchenwarePhoto: `${environment.apiBaseUrl}/kitchenware/update-photo`,
  searchKitchenware: `${environment.apiBaseUrl}/kitchenware/active/search-by-prefix`,

  getDish: `${environment.apiBaseUrl}/cocktail/search`,
  addDish: `${environment.apiBaseUrl}/cocktail/create`,
  updateDish: `${environment.apiBaseUrl}/cocktail/update`,

  getUser: `${environment.apiBaseUrl}/person/:personId`,
  updateUserName: `${environment.apiBaseUrl}/person/update-name`,
  updateUserPhoto:`${environment.apiBaseUrl}/person/update-photo`,
  personGetUrl : `${environment.apiBaseUrl}/person/`,
  personsSearchUrl: `${environment.apiBaseUrl}/person/search/`,
  personsPagesAmountUrl : `${environment.apiBaseUrl}/person/search-pages-number/`,

  uploadImg : `${environment.apiBaseUrl}/image/upload`,
  getImageByIdUrl: `${environment.apiBaseUrl}/image/get/`,
}
