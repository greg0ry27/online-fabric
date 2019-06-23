import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './inventory.reducer';
import { IInventory } from 'app/shared/model/inventory.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInventoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Inventory extends React.Component<IInventoryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { inventoryList, match } = this.props;
    return (
      <div>
        <h2 id="inventory-heading">
          Inventories
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Inventory
          </Link>
        </h2>
        <div className="table-responsive">
          {inventoryList && inventoryList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Settings</th>
                  <th>Player</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {inventoryList.map((inventory, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${inventory.id}`} color="link" size="sm">
                        {inventory.id}
                      </Button>
                    </td>
                    <td>{inventory.type}</td>
                    <td>{inventory.settings}</td>
                    <td>{inventory.player ? <Link to={`player/${inventory.player.id}`}>{inventory.player.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${inventory.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inventory.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inventory.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Inventories found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }: IRootState) => ({
  inventoryList: inventory.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);
