import { Moment } from 'moment';
import { ICharacter } from 'app/shared/model/character.model';
import { IInventory } from 'app/shared/model/inventory.model';
import { IPlayerCurrency } from 'app/shared/model/player-currency.model';

export interface IPlayer {
  id?: number;
  name?: string;
  lastLogin?: Moment;
  created?: Moment;
  characters?: ICharacter[];
  inventories?: IInventory[];
  playerCurrencies?: IPlayerCurrency[];
}

export const defaultValue: Readonly<IPlayer> = {};
