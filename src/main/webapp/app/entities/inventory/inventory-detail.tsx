import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './inventory.reducer';
import { IInventory } from 'app/shared/model/inventory.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInventoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InventoryDetail extends React.Component<IInventoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { inventoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Inventory [<b>{inventoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{inventoryEntity.type}</dd>
            <dt>
              <span id="settings">Settings</span>
            </dt>
            <dd>{inventoryEntity.settings}</dd>
            <dt>Player</dt>
            <dd>{inventoryEntity.player ? inventoryEntity.player.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/inventory" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/inventory/${inventoryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ inventory }: IRootState) => ({
  inventoryEntity: inventory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetail);
