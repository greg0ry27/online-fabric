import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlayerCurrency from './player-currency';
import PlayerCurrencyDetail from './player-currency-detail';
import PlayerCurrencyUpdate from './player-currency-update';
import PlayerCurrencyDeleteDialog from './player-currency-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlayerCurrencyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlayerCurrencyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlayerCurrencyDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlayerCurrency} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PlayerCurrencyDeleteDialog} />
  </>
);

export default Routes;
