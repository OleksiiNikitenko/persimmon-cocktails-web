export interface Query {
  page: number,
  query : string | null,
  sortByColumn: string
}
export interface QueryDelete {
ingredientId: number
}
export interface QueryUpdate {
  ingredientId: number
  amount: number
  measureType: string
}

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  "category"
]
