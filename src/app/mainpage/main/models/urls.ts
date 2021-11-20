import {environment} from "../../../../environments/environment.prod";

export const URLS = {
  getModerators: `${environment.apiBaseUrl}/moderator/all`,
  addModerator: `${environment.apiBaseUrl}/moderator/add`,
}
