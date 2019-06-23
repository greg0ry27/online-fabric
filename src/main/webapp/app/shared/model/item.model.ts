import { IInventorySlot } from 'app/shared/model/inventory-slot.model';
import { IItemGroup } from 'app/shared/model/item-group.model';

export interface IItem {
  id?: number;
  name?: string;
  description?: string;
  settings?: string;
  inventorySlots?: IInventorySlot[];
  itemGroup?: IItemGroup;
}

export const defaultValue: Readonly<IItem> = {};
