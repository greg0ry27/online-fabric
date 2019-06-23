import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './player-currency.reducer';
import { IPlayerCurrency } from 'app/shared/model/player-currency.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlayerCurrencyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlayerCurrencyDetail extends React.Component<IPlayerCurrencyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { playerCurrencyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PlayerCurrency [<b>{playerCurrencyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="amount">Amount</span>
            </dt>
            <dd>{playerCurrencyEntity.amount}</dd>
            <dt>Player</dt>
            <dd>{playerCurrencyEntity.player ? playerCurrencyEntity.player.id : ''}</dd>
            <dt>Currency</dt>
            <dd>{playerCurrencyEntity.currency ? playerCurrencyEntity.currency.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/player-currency" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/player-currency/${playerCurrencyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ playerCurrency }: IRootState) => ({
  playerCurrencyEntity: playerCurrency.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCurrencyDetail);
