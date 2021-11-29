export class ActiveKitchenware {
  kitchenwareId!: number;
  name!: string;
  photoId!: number;
  category!: KitchenwareCategory | null;
}

class KitchenwareCategory {
  kitchenwareCategoryId!: number;
  name!: string;
}
