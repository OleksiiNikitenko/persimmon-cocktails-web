import {ImageModel} from "../../image/model/image.model";

export class ResponseStockIngredient {
  ingredientId!: number;
  name!: string;
  personId! : number;
  categoryName!: string | null;
  ingredientCategoryId!: number | null;
  amount!: number | null;
  measureType!: string | null;
  image!: ImageModel;
}
