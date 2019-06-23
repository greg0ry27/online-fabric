import { IItem } from 'app/shared/model/item.model';
import { IInventory } from 'app/shared/model/inventory.model';

export interface IInventorySlot {
  id?: number;
  slot?: number;
  amount?: number;
  item?: IItem;
  inventory?: IInventory;
}

export const defaultValue: Readonly<IInventorySlot> = {};
