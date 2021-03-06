import * as UserGroupActions from './usergroup.action';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {userGroup} from './usergroup.model';

export interface UserGroupState extends EntityState<userGroup> {
  selectedUserGroupId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const adapter: EntityAdapter<userGroup> = createEntityAdapter<userGroup>();


export const initialState: UserGroupState = adapter.getInitialState({
  selectedUserGroupId: null,
  loading: false,
  loaded: false,
  error: ''
});

export function userGroupReducer(state = initialState, action: UserGroupActions.Actions): UserGroupState {

  switch (action.type) {

    case UserGroupActions.GET_USER_GROUP:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case UserGroupActions.GET_USER_GROUP_SUCCESS:
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.GET_USER_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UserGroupActions.ADD_USER_GROUP:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case UserGroupActions.ADD_USER_GROUP_SUCCESS:
      return adapter.addOne(action.payload[0], {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.ADD_USER_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UserGroupActions.UPDATE_USER_GROUP:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case UserGroupActions.UPDATE_USER_GROUP_SUCCESS:
      return adapter.upsertOne(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.UPDATE_USER_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UserGroupActions.DELETE_USER_GROUP:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case UserGroupActions.DELETE_USER_GROUP_SUCCESS:
      return adapter.removeOne(action.payload.id, {
        ...state,
        loading: false,
        loaded: true
      });
    case UserGroupActions.DELETE_USER_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UserGroupActions.SELECT_USER_GROUP_RELATION:
      return adapter.upsertMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.REMOVE_SELECTED_USER_GROUP_RELATION:
      return adapter.upsertMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.CHECKED_USER_GROUP:
      return adapter.upsertOne(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case UserGroupActions.SELECT_GROUP_ID:
      return {
        ...state,
        selectedUserGroupId: action.payload
      };

    case UserGroupActions.REMOVE_GROUP_ID:
      return {
        ...state,
        selectedUserGroupId: null
      };

    case UserGroupActions.UPDATE_USER_IDS:
      return adapter.upsertOne(action.payload, {
        ...state
      });

    default:
      return state;
  }
}

export const getSelectedUserGroupId = (state: UserGroupState) => state.selectedUserGroupId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUserGroupIds = selectIds;

// select the dictionary of user entities
export const selectUserGroupEntities = selectEntities;

// select the array of users
export const selectAllUserGroups = selectAll;

// select the total user count
export const selectUserGroupTotal = selectTotal;
