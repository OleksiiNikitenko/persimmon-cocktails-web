export class ActiveKitchenware {
  kitchenwareId!: number;
  name!: string;
  photoId!: number | null;
  category!: KitchenwareCategory | null;
}

export class Kitchenware {
  kitchenwareId!: number;
  name!: string;
  photoId!: number | null;
  category!: KitchenwareCategory | null;
}

class KitchenwareCategory {
  kitchenwareCategoryId!: number;
  name!: string;
}
