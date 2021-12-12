import {Kitchenware} from "../../kitchenware/models/activeKitchenware";
import {Ingredient} from "../../cocktails/models/ingredient";

export interface FullCocktail{
  hasLike: boolean | null;
  dishId: number,
  image: {
    imageId: number,
    "urlFull": string,
    "urlMiddle": string,
    "urlThumb": string
  } | null,
  name: string,
  description: string | null,
  dishType: string | null,
  dishCategoryName: string | null,
  dishCategoryId: number | null,
  labels: string[],
  receipt: string,
  likes: number,
  isActive: boolean,
  kitchenwareList: Kitchenware[],
  ingredientList: Ingredient[]
}

export function mockCocktail() : FullCocktail {
  return {
    dishId: -1,
    image: null,
    name: "",
    description: null,
    dishType: null,
    dishCategoryName: null,
    dishCategoryId: null,
    labels: [],
    receipt: "",
    likes: 0,
    isActive: true,
    kitchenwareList: [],
    ingredientList: [],
    hasLike: null
  }
}
