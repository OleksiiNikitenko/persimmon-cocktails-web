export interface Ingredient {
  name: string;
  ingredientId: number;
  category: string;
  photoId: number;
}
export const INGREDIENTS: Ingredient[] = [
  {name: 'Orange', ingredientId: 1, category: 'Fruits', photoId: 0},
  {name: 'Vodka', ingredientId: 2, category: 'Alcohol', photoId: 1},
  {name: 'Pepsi', ingredientId: 3, category: 'Soft Drinks', photoId: 2},
  {name: 'Glass', ingredientId: 4, category: 'Kitchenware', photoId: 3},
  {name: 'Apple', ingredientId: 5, category: 'Fruits', photoId: 4},
  {name: 'Wine', ingredientId: 6, category: 'Alcohol', photoId: 5},
  {name: 'Fanta', ingredientId: 7, category: 'Soft Drinks', photoId: 6},
  {name: 'Cup', ingredientId: 8, category: 'Kitchenware', photoId: 7},
  {name: 'Banana', ingredientId: 9, category: 'Fruits', photoId: 8},
  {name: 'Whiskey', ingredientId: 10, category: 'Alcohol', photoId: 9},
  {name: 'Schweppes', ingredientId: 11, category: 'Soft Drinks', photoId: 10},
  {name: 'Wineglass', ingredientId: 12, category: 'Kitchenware', photoId: 11},
]

