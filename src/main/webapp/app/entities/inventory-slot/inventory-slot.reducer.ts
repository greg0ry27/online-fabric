import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInventorySlot, defaultValue } from 'app/shared/model/inventory-slot.model';

export const ACTION_TYPES = {
  FETCH_INVENTORYSLOT_LIST: 'inventorySlot/FETCH_INVENTORYSLOT_LIST',
  FETCH_INVENTORYSLOT: 'inventorySlot/FETCH_INVENTORYSLOT',
  CREATE_INVENTORYSLOT: 'inventorySlot/CREATE_INVENTORYSLOT',
  UPDATE_INVENTORYSLOT: 'inventorySlot/UPDATE_INVENTORYSLOT',
  DELETE_INVENTORYSLOT: 'inventorySlot/DELETE_INVENTORYSLOT',
  RESET: 'inventorySlot/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInventorySlot>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InventorySlotState = Readonly<typeof initialState>;

// Reducer

export default (state: InventorySlotState = initialState, action): InventorySlotState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVENTORYSLOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVENTORYSLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INVENTORYSLOT):
    case REQUEST(ACTION_TYPES.UPDATE_INVENTORYSLOT):
    case REQUEST(ACTION_TYPES.DELETE_INVENTORYSLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INVENTORYSLOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVENTORYSLOT):
    case FAILURE(ACTION_TYPES.CREATE_INVENTORYSLOT):
    case FAILURE(ACTION_TYPES.UPDATE_INVENTORYSLOT):
    case FAILURE(ACTION_TYPES.DELETE_INVENTORYSLOT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVENTORYSLOT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVENTORYSLOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVENTORYSLOT):
    case SUCCESS(ACTION_TYPES.UPDATE_INVENTORYSLOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVENTORYSLOT):
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

const apiUrl = 'api/inventory-slots';

// Actions

export const getEntities: ICrudGetAllAction<IInventorySlot> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVENTORYSLOT_LIST,
  payload: axios.get<IInventorySlot>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInventorySlot> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVENTORYSLOT,
    payload: axios.get<IInventorySlot>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInventorySlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVENTORYSLOT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInventorySlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVENTORYSLOT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInventorySlot> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVENTORYSLOT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
