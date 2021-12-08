export interface Query {
  page: number,
  query : string | null,
  sortByColumn: string,
  sortDirection: boolean
}

export const columnsToSortBy : string[] = [
  "nothing",
  "name",
  "description",
  "receipt",
  "likes"
]