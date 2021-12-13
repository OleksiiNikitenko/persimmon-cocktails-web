import {ActiveKitchenware} from "./activeKitchenware";

export class KitchenwareView {
  name!: string
  kitchenwareId!: number
  photoId!: number | null
  categoryId!: number | undefined
  categoryName!: string | undefined

  static fromActiveKitchenwareDto(dto: ActiveKitchenware) {
    let res: KitchenwareView = new KitchenwareView();
    res.name = dto.name;
    res.kitchenwareId = dto.kitchenwareId;
    res.categoryName = dto.category?.name;
    res.photoId = dto.photoId;
    return res
  }
}
