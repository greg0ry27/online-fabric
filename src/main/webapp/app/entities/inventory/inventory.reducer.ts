import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInventory, defaultValue } from 'app/shared/model/inventory.model';

export const ACTION_TYPES = {
  FETCH_INVENTORY_LIST: 'inventory/FETCH_INVENTORY_LIST',
  FETCH_INVENTORY: 'inventory/FETCH_INVENTORY',
  CREATE_INVENTORY: 'inventory/CREATE_INVENTORY',
  UPDATE_INVENTORY: 'inventory/UPDATE_INVENTORY',
  DELETE_INVENTORY: 'inventory/DELETE_INVENTORY',
  RESET: 'inventory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInventory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InventoryState = Readonly<typeof initialState>;

// Reducer

export default (state: InventoryState = initialState, action): InventoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVENTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVENTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INVENTORY):
    case REQUEST(ACTION_TYPES.UPDATE_INVENTORY):
    case REQUEST(ACTION_TYPES.DELETE_INVENTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INVENTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVENTORY):
    case FAILURE(ACTION_TYPES.CREATE_INVENTORY):
    case FAILURE(ACTION_TYPES.UPDATE_INVENTORY):
    case FAILURE(ACTION_TYPES.DELETE_INVENTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVENTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVENTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVENTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_INVENTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVENTORY):
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

const apiUrl = 'api/inventories';

// Actions

export const getEntities: ICrudGetAllAction<IInventory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVENTORY_LIST,
  payload: axios.get<IInventory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInventory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVENTORY,
    payload: axios.get<IInventory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInventory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVENTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInventory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVENTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInventory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVENTORY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
