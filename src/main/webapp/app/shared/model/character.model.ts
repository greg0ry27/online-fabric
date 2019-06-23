import { Moment } from 'moment';
import { IPlayer } from 'app/shared/model/player.model';

export interface ICharacter {
  id?: number;
  type?: string;
  lastUse?: Moment;
  created?: Moment;
  player?: IPlayer;
}

export const defaultValue: Readonly<ICharacter> = {};
