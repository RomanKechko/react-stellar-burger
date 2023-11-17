export interface IIngredient {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  calories: number;
  carbohydrates: number;
  proteins: number;
  fat: number;
  price: number;
  __v: number;
  image: string;
  image_large: string;
  image_mobile: string;
}

export interface IIngredientAndUniqueId extends IIngredient {
  uniqueId?: string;
}

export interface IUserLogging {
  [name: string]: string;
}
export interface IIngredientAndNumber extends IIngredient {
  index?: string | number;
}
export interface IIsActive {
  isActive: boolean;
}

export interface IDragItemConstructor {
  ingredients: IIngredient;
  index: number;
}
export interface IColletedPropsDrag {
  isDragging: boolean;
}
export interface IColletedPropsDrop {
  handlerId: string;
}
export interface IUser {
  email: string;
  name: string;
}
export interface IUserName {
  name: string;
}
export interface IUserEmail {
  email: string;
}
