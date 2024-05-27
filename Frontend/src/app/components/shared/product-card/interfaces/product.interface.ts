import { IProductPreview } from "./productPreview.interface";

export interface IProduct extends IProductPreview {
  id: string;
  material: string;
  colorAndPattern?:  string;
  styleAndDesign?: string;
  cleaningInstructions?: string;
}
