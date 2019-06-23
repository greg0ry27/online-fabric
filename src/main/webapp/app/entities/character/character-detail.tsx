import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './character.reducer';
import { ICharacter } from 'app/shared/model/character.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICharacterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CharacterDetail extends React.Component<ICharacterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { characterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Character [<b>{characterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{characterEntity.type}</dd>
            <dt>
              <span id="lastUse">Last Use</span>
            </dt>
            <dd>
              <TextFormat value={characterEntity.lastUse} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="created">Created</span>
            </dt>
            <dd>
              <TextFormat value={characterEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Player</dt>
            <dd>{characterEntity.player ? characterEntity.player.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/character" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/character/${characterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ character }: IRootState) => ({
  characterEntity: character.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterDetail);
