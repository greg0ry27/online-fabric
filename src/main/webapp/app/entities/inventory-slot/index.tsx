import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InventorySlot from './inventory-slot';
import InventorySlotDetail from './inventory-slot-detail';
import InventorySlotUpdate from './inventory-slot-update';
import InventorySlotDeleteDialog from './inventory-slot-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InventorySlotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InventorySlotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InventorySlotDetail} />
      <ErrorBoundaryRoute path={match.url} component={InventorySlot} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InventorySlotDeleteDialog} />
  </>
);

export default Routes;
