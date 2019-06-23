import { IPlayer } from 'app/shared/model/player.model';
import { ICurrency } from 'app/shared/model/currency.model';

export interface IPlayerCurrency {
  id?: number;
  amount?: number;
  player?: IPlayer;
  currency?: ICurrency;
}

export const defaultValue: Readonly<IPlayerCurrency> = {};
