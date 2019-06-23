import { IPlayerCurrency } from 'app/shared/model/player-currency.model';

export interface ICurrency {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  settings?: string;
  playerCurrencies?: IPlayerCurrency[];
}

export const defaultValue: Readonly<ICurrency> = {};
