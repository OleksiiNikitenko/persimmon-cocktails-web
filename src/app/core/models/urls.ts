import  {environment} from "../../../environments/environment";

export const URLS = {
  getModerators: `${environment.apiBaseUrl}/moderator/all`,
  addModerator: `${environment.apiBaseUrl}/moderator/add`,
  updateModerator: `${environment.apiBaseUrl}/moderator/update-name`,

  getDish: `${environment.apiBaseUrl}/cocktail/search`,
  addDish: `${environment.apiBaseUrl}/cocktail/create`,
  updateDish: `${environment.apiBaseUrl}/cocktail/update`,

  getUser: `${environment.apiBaseUrl}/person/:personId`,
  updateUserName: `${environment.apiBaseUrl}/person/update-name`,
  personGetUrl : `${environment.apiBaseUrl}/person/`
}
