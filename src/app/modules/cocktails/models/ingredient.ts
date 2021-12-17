import {ImageModel} from "../../image/model/image.model";

export interface Ingredient{
  ingredientId: number,
  name: string,
  image: ImageModel | null,
  category: {
    ingredientCategoryId: number,
    name: string
  } | null,
  active: boolean
}
