export interface Query {
  page: number,
  query : string | null,
  sortByColumn: string
}
export interface QueryDelete {
ingredientId: number | undefined
}
// export interface QueryUpdate {
//   ingredientId: number
//   amount: number | null
//   measureType: string | null
// }

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  "category"
]
