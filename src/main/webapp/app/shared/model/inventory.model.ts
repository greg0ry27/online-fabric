import { IInventorySlot } from 'app/shared/model/inventory-slot.model';
import { IPlayer } from 'app/shared/model/player.model';

export interface IInventory {
  id?: number;
  type?: string;
  settings?: string;
  inventorySlots?: IInventorySlot[];
  player?: IPlayer;
}

export const defaultValue: Readonly<IInventory> = {};
