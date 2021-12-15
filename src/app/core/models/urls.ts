import  {environment} from "../../../environments/environment";

export const URLS = {
  getModerators: `${environment.apiBaseUrl}/moderator/all`,
  addModerator: `${environment.apiBaseUrl}/moderator/add`,
  updateModerator: `${environment.apiBaseUrl}/moderator/update-name`,
  changeStatus: `${environment.apiBaseUrl}/moderator/change-status`,

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
