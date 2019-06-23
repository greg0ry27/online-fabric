import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './player-currency.reducer';
import { IPlayerCurrency } from 'app/shared/model/player-currency.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlayerCurrencyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class PlayerCurrency extends React.Component<IPlayerCurrencyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { playerCurrencyList, match } = this.props;
    return (
      <div>
        <h2 id="player-currency-heading">
          Player Currencies
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Player Currency
          </Link>
        </h2>
        <div className="table-responsive">
          {playerCurrencyList && playerCurrencyList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Player</th>
                  <th>Currency</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {playerCurrencyList.map((playerCurrency, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${playerCurrency.id}`} color="link" size="sm">
                        {playerCurrency.id}
                      </Button>
                    </td>
                    <td>{playerCurrency.amount}</td>
                    <td>
                      {playerCurrency.player ? <Link to={`player/${playerCurrency.player.id}`}>{playerCurrency.player.id}</Link> : ''}
                    </td>
                    <td>
                      {playerCurrency.currency ? (
                        <Link to={`currency/${playerCurrency.currency.id}`}>{playerCurrency.currency.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${playerCurrency.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${playerCurrency.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${playerCurrency.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Player Currencies found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ playerCurrency }: IRootState) => ({
  playerCurrencyList: playerCurrency.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCurrency);
