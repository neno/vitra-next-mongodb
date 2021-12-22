export interface IObjectItem {
  id: string;
  title?: string;
  subTitle?: string;
  dating?: string;
  designer?: string;
  highlight?: string;
  image?: string;
}

export interface IObject extends IObjectItem {
  material?: string;
  dimensions?: string;
  designed?: string;
  firstProduction?: string;
  type?: string;
  inventoryNo?: string;
  description?: string;
  relatedObjects: IRelatedItem[];
  relatedDesigners: IRelatedItem[];
  relatedManufacturers: IRelatedItem[];
}

export interface IRelatedItem {
  id: number;
  image?: string;
  title: string;
  dating?: string;
}