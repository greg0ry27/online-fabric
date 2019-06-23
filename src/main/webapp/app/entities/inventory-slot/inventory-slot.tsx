import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './inventory-slot.reducer';
import { IInventorySlot } from 'app/shared/model/inventory-slot.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInventorySlotProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class InventorySlot extends React.Component<IInventorySlotProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { inventorySlotList, match } = this.props;
    return (
      <div>
        <h2 id="inventory-slot-heading">
          Inventory Slots
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Inventory Slot
          </Link>
        </h2>
        <div className="table-responsive">
          {inventorySlotList && inventorySlotList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Slot</th>
                  <th>Amount</th>
                  <th>Item</th>
                  <th>Inventory</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {inventorySlotList.map((inventorySlot, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${inventorySlot.id}`} color="link" size="sm">
                        {inventorySlot.id}
                      </Button>
                    </td>
                    <td>{inventorySlot.slot}</td>
                    <td>{inventorySlot.amount}</td>
                    <td>{inventorySlot.item ? <Link to={`item/${inventorySlot.item.id}`}>{inventorySlot.item.id}</Link> : ''}</td>
                    <td>
                      {inventorySlot.inventory ? (
                        <Link to={`inventory/${inventorySlot.inventory.id}`}>{inventorySlot.inventory.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${inventorySlot.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inventorySlot.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inventorySlot.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Inventory Slots found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ inventorySlot }: IRootState) => ({
  inventorySlotList: inventorySlot.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventorySlot);
