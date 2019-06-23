import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItem } from 'app/shared/model/item.model';
import { getEntities as getItems } from 'app/entities/item/item.reducer';
import { IInventory } from 'app/shared/model/inventory.model';
import { getEntities as getInventories } from 'app/entities/inventory/inventory.reducer';
import { getEntity, updateEntity, createEntity, reset } from './inventory-slot.reducer';
import { IInventorySlot } from 'app/shared/model/inventory-slot.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInventorySlotUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInventorySlotUpdateState {
  isNew: boolean;
  itemId: string;
  inventoryId: string;
}

export class InventorySlotUpdate extends React.Component<IInventorySlotUpdateProps, IInventorySlotUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '0',
      inventoryId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getItems();
    this.props.getInventories();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { inventorySlotEntity } = this.props;
      const entity = {
        ...inventorySlotEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/inventory-slot');
  };

  render() {
    const { inventorySlotEntity, items, inventories, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="onlineFabricApp.inventorySlot.home.createOrEditLabel">Create or edit a InventorySlot</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : inventorySlotEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="inventory-slot-id">ID</Label>
                    <AvInput id="inventory-slot-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="slotLabel" for="inventory-slot-slot">
                    Slot
                  </Label>
                  <AvField
                    id="inventory-slot-slot"
                    type="string"
                    className="form-control"
                    name="slot"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="inventory-slot-amount">
                    Amount
                  </Label>
                  <AvField
                    id="inventory-slot-amount"
                    type="string"
                    className="form-control"
                    name="amount"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      min: { value: 1, errorMessage: 'This field should be at least 1.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="inventory-slot-item">Item</Label>
                  <AvInput id="inventory-slot-item" type="select" className="form-control" name="item.id">
                    <option value="" key="0" />
                    {items
                      ? items.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="inventory-slot-inventory">Inventory</Label>
                  <AvInput id="inventory-slot-inventory" type="select" className="form-control" name="inventory.id">
                    <option value="" key="0" />
                    {inventories
                      ? inventories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/inventory-slot" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  items: storeState.item.entities,
  inventories: storeState.inventory.entities,
  inventorySlotEntity: storeState.inventorySlot.entity,
  loading: storeState.inventorySlot.loading,
  updating: storeState.inventorySlot.updating,
  updateSuccess: storeState.inventorySlot.updateSuccess
});

const mapDispatchToProps = {
  getItems,
  getInventories,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventorySlotUpdate);
