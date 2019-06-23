import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlayerCurrency, defaultValue } from 'app/shared/model/player-currency.model';

export const ACTION_TYPES = {
  FETCH_PLAYERCURRENCY_LIST: 'playerCurrency/FETCH_PLAYERCURRENCY_LIST',
  FETCH_PLAYERCURRENCY: 'playerCurrency/FETCH_PLAYERCURRENCY',
  CREATE_PLAYERCURRENCY: 'playerCurrency/CREATE_PLAYERCURRENCY',
  UPDATE_PLAYERCURRENCY: 'playerCurrency/UPDATE_PLAYERCURRENCY',
  DELETE_PLAYERCURRENCY: 'playerCurrency/DELETE_PLAYERCURRENCY',
  RESET: 'playerCurrency/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlayerCurrency>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PlayerCurrencyState = Readonly<typeof initialState>;

// Reducer

export default (state: PlayerCurrencyState = initialState, action): PlayerCurrencyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLAYERCURRENCY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLAYERCURRENCY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLAYERCURRENCY):
    case REQUEST(ACTION_TYPES.UPDATE_PLAYERCURRENCY):
    case REQUEST(ACTION_TYPES.DELETE_PLAYERCURRENCY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLAYERCURRENCY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLAYERCURRENCY):
    case FAILURE(ACTION_TYPES.CREATE_PLAYERCURRENCY):
    case FAILURE(ACTION_TYPES.UPDATE_PLAYERCURRENCY):
    case FAILURE(ACTION_TYPES.DELETE_PLAYERCURRENCY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLAYERCURRENCY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLAYERCURRENCY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLAYERCURRENCY):
    case SUCCESS(ACTION_TYPES.UPDATE_PLAYERCURRENCY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLAYERCURRENCY):
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

const apiUrl = 'api/player-currencies';

// Actions

export const getEntities: ICrudGetAllAction<IPlayerCurrency> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PLAYERCURRENCY_LIST,
  payload: axios.get<IPlayerCurrency>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPlayerCurrency> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLAYERCURRENCY,
    payload: axios.get<IPlayerCurrency>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPlayerCurrency> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLAYERCURRENCY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlayerCurrency> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLAYERCURRENCY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlayerCurrency> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLAYERCURRENCY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
