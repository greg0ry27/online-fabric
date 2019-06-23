import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/player">
      Player
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/character">
      Character
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/item-group">
      Item Group
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/item">
      Item
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/inventory-slot">
      Inventory Slot
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/inventory">
      Inventory
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/currency">
      Currency
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/player-currency">
      Player Currency
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
