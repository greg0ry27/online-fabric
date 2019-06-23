import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Player from './player';
import Character from './character';
import ItemGroup from './item-group';
import Item from './item';
import InventorySlot from './inventory-slot';
import Inventory from './inventory';
import Currency from './currency';
import PlayerCurrency from './player-currency';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/player`} component={Player} />
      <ErrorBoundaryRoute path={`${match.url}/character`} component={Character} />
      <ErrorBoundaryRoute path={`${match.url}/item-group`} component={ItemGroup} />
      <ErrorBoundaryRoute path={`${match.url}/item`} component={Item} />
      <ErrorBoundaryRoute path={`${match.url}/inventory-slot`} component={InventorySlot} />
      <ErrorBoundaryRoute path={`${match.url}/inventory`} component={Inventory} />
      <ErrorBoundaryRoute path={`${match.url}/currency`} component={Currency} />
      <ErrorBoundaryRoute path={`${match.url}/player-currency`} component={PlayerCurrency} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
