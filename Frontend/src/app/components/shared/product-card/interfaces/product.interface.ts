import { IProductPreview } from "./productPreview.interface";

export interface IProduct extends IProductPreview {
  product_id: string;
  material: string;
  color?:  string;
  cleaning?: string;
}
