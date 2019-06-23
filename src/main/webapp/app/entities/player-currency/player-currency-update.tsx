import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlayer } from 'app/shared/model/player.model';
import { getEntities as getPlayers } from 'app/entities/player/player.reducer';
import { ICurrency } from 'app/shared/model/currency.model';
import { getEntities as getCurrencies } from 'app/entities/currency/currency.reducer';
import { getEntity, updateEntity, createEntity, reset } from './player-currency.reducer';
import { IPlayerCurrency } from 'app/shared/model/player-currency.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlayerCurrencyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPlayerCurrencyUpdateState {
  isNew: boolean;
  playerId: string;
  currencyId: string;
}

export class PlayerCurrencyUpdate extends React.Component<IPlayerCurrencyUpdateProps, IPlayerCurrencyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      playerId: '0',
      currencyId: '0',
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

    this.props.getPlayers();
    this.props.getCurrencies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { playerCurrencyEntity } = this.props;
      const entity = {
        ...playerCurrencyEntity,
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
    this.props.history.push('/entity/player-currency');
  };

  render() {
    const { playerCurrencyEntity, players, currencies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="onlineFabricApp.playerCurrency.home.createOrEditLabel">Create or edit a PlayerCurrency</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : playerCurrencyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="player-currency-id">ID</Label>
                    <AvInput id="player-currency-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="amountLabel" for="player-currency-amount">
                    Amount
                  </Label>
                  <AvField
                    id="player-currency-amount"
                    type="string"
                    className="form-control"
                    name="amount"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="player-currency-player">Player</Label>
                  <AvInput id="player-currency-player" type="select" className="form-control" name="player.id">
                    <option value="" key="0" />
                    {players
                      ? players.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="player-currency-currency">Currency</Label>
                  <AvInput id="player-currency-currency" type="select" className="form-control" name="currency.id">
                    <option value="" key="0" />
                    {currencies
                      ? currencies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/player-currency" replace color="info">
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
  players: storeState.player.entities,
  currencies: storeState.currency.entities,
  playerCurrencyEntity: storeState.playerCurrency.entity,
  loading: storeState.playerCurrency.loading,
  updating: storeState.playerCurrency.updating,
  updateSuccess: storeState.playerCurrency.updateSuccess
});

const mapDispatchToProps = {
  getPlayers,
  getCurrencies,
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
)(PlayerCurrencyUpdate);
