export interface Query {
  page: number,
  query : string | null,
  sortByColumn: string
}
export interface QueryDelete {
ingredientId: number | undefined
}

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  "category"
]
