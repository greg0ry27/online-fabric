import { IItem } from 'app/shared/model/item.model';

export interface IItemGroup {
  id?: number;
  name?: string;
  description?: string;
  items?: IItem[];
}

export const defaultValue: Readonly<IItemGroup> = {};
