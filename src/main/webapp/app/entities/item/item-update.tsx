import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItemGroup } from 'app/shared/model/item-group.model';
import { getEntities as getItemGroups } from 'app/entities/item-group/item-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IItemUpdateState {
  isNew: boolean;
  itemGroupId: string;
}

export class ItemUpdate extends React.Component<IItemUpdateProps, IItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      itemGroupId: '0',
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

    this.props.getItemGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { itemEntity } = this.props;
      const entity = {
        ...itemEntity,
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
    this.props.history.push('/entity/item');
  };

  render() {
    const { itemEntity, itemGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="onlineFabricApp.item.home.createOrEditLabel">Create or edit a Item</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="item-id">ID</Label>
                    <AvInput id="item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="item-name">
                    Name
                  </Label>
                  <AvField
                    id="item-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 3, errorMessage: 'This field is required to be at least 3 characters.' },
                      maxLength: { value: 64, errorMessage: 'This field cannot be longer than 64 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="item-description">
                    Description
                  </Label>
                  <AvField
                    id="item-description"
                    type="text"
                    name="description"
                    validate={{
                      maxLength: { value: 512, errorMessage: 'This field cannot be longer than 512 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="settingsLabel" for="item-settings">
                    Settings
                  </Label>
                  <AvField id="item-settings" type="text" name="settings" />
                </AvGroup>
                <AvGroup>
                  <Label for="item-itemGroup">Item Group</Label>
                  <AvInput id="item-itemGroup" type="select" className="form-control" name="itemGroup.id">
                    <option value="" key="0" />
                    {itemGroups
                      ? itemGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/item" replace color="info">
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
  itemGroups: storeState.itemGroup.entities,
  itemEntity: storeState.item.entity,
  loading: storeState.item.loading,
  updating: storeState.item.updating,
  updateSuccess: storeState.item.updateSuccess
});

const mapDispatchToProps = {
  getItemGroups,
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
)(ItemUpdate);
