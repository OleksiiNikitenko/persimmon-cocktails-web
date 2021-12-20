import {CocktailCategory} from "../../cocktail/models/fullCocktail";

export interface Query {
  page: number,
  query: string | null,
  sortByColumn: string,
  sortDirection: boolean,
  matchToStock: boolean,
  searchByListIngredients: number[],
  showActiveMode: ShowActiveMode,
  currentCategory: CocktailCategory
}

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  "description",
  // "receipt",
  "likes"
]

export let specifiedIngredients: number[] = []

export enum ShowActiveMode{
  OnlyActive,
  OnlyInactive,
  Both
}
