import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItemGroup, defaultValue } from 'app/shared/model/item-group.model';

export const ACTION_TYPES = {
  FETCH_ITEMGROUP_LIST: 'itemGroup/FETCH_ITEMGROUP_LIST',
  FETCH_ITEMGROUP: 'itemGroup/FETCH_ITEMGROUP',
  CREATE_ITEMGROUP: 'itemGroup/CREATE_ITEMGROUP',
  UPDATE_ITEMGROUP: 'itemGroup/UPDATE_ITEMGROUP',
  DELETE_ITEMGROUP: 'itemGroup/DELETE_ITEMGROUP',
  RESET: 'itemGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItemGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ItemGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: ItemGroupState = initialState, action): ItemGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ITEMGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ITEMGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ITEMGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_ITEMGROUP):
    case REQUEST(ACTION_TYPES.DELETE_ITEMGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ITEMGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEMGROUP):
    case FAILURE(ACTION_TYPES.CREATE_ITEMGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_ITEMGROUP):
    case FAILURE(ACTION_TYPES.DELETE_ITEMGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEMGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEMGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ITEMGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_ITEMGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ITEMGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/item-groups';

// Actions

export const getEntities: ICrudGetAllAction<IItemGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ITEMGROUP_LIST,
  payload: axios.get<IItemGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IItemGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEMGROUP,
    payload: axios.get<IItemGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IItemGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ITEMGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IItemGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ITEMGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IItemGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ITEMGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
