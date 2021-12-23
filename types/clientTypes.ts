export interface IObjectItem {
  id: string;
  title: string;
  subTitle: string;
  designed: string;
  designer: string;
  image: string | null;
}

export interface IObject extends IObjectItem {
  material: string;
  dimensions: string;
  dating: string;
  firstProduction: string;
  type: string;
  inventoryNo: string;
  description: string;
  relatedObjects: IRelatedItem[];
  relatedDesigners: IRelatedItem[];
  relatedManufacturers: IRelatedItem[];
}

export interface IRelatedItem {
  id: number;
  image: string | null;
  title: string;
  text: string;
}
