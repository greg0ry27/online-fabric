import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './inventory-slot.reducer';
import { IInventorySlot } from 'app/shared/model/inventory-slot.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInventorySlotDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InventorySlotDetail extends React.Component<IInventorySlotDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { inventorySlotEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            InventorySlot [<b>{inventorySlotEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="slot">Slot</span>
            </dt>
            <dd>{inventorySlotEntity.slot}</dd>
            <dt>
              <span id="amount">Amount</span>
            </dt>
            <dd>{inventorySlotEntity.amount}</dd>
            <dt>Item</dt>
            <dd>{inventorySlotEntity.item ? inventorySlotEntity.item.id : ''}</dd>
            <dt>Inventory</dt>
            <dd>{inventorySlotEntity.inventory ? inventorySlotEntity.inventory.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/inventory-slot" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/inventory-slot/${inventorySlotEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ inventorySlot }: IRootState) => ({
  inventorySlotEntity: inventorySlot.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventorySlotDetail);
