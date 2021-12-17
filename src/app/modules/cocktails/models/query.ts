import {CocktailCategory} from "../../cocktail/models/fullCocktail";

export interface Query {
  page: number,
  query : string | null,
  sortByColumn: string,
  sortDirection: boolean,
  showActiveMode: ShowActiveMode,
  currentCategory: CocktailCategory
}

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  // "description",
  "receipt",
  "likes"
]

export enum ShowActiveMode{
  OnlyActive,
  OnlyInactive,
  Both
}
