import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import player, {
  PlayerState
} from 'app/entities/player/player.reducer';
// prettier-ignore
import character, {
  CharacterState
} from 'app/entities/character/character.reducer';
// prettier-ignore
import itemGroup, {
  ItemGroupState
} from 'app/entities/item-group/item-group.reducer';
// prettier-ignore
import item, {
  ItemState
} from 'app/entities/item/item.reducer';
// prettier-ignore
import inventorySlot, {
  InventorySlotState
} from 'app/entities/inventory-slot/inventory-slot.reducer';
// prettier-ignore
import inventory, {
  InventoryState
} from 'app/entities/inventory/inventory.reducer';
// prettier-ignore
import currency, {
  CurrencyState
} from 'app/entities/currency/currency.reducer';
// prettier-ignore
import playerCurrency, {
  PlayerCurrencyState
} from 'app/entities/player-currency/player-currency.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly player: PlayerState;
  readonly character: CharacterState;
  readonly itemGroup: ItemGroupState;
  readonly item: ItemState;
  readonly inventorySlot: InventorySlotState;
  readonly inventory: InventoryState;
  readonly currency: CurrencyState;
  readonly playerCurrency: PlayerCurrencyState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  player,
  character,
  itemGroup,
  item,
  inventorySlot,
  inventory,
  currency,
  playerCurrency,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
