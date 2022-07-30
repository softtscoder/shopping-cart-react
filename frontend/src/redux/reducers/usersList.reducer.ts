import {
	UserListActionTypes,
	UserDeleteActionTypes,
	UserUpdateActionTypes,
} from '../actions/user.actions';
import {
	UsersListAction,
	UserDeleteAction,
	UserUpdateAction,
} from '../action-types/user.actionTypes';

import { User } from '../../models/User';

export interface UserListState {
	loading: boolean;
	users: User[];
	error: string | null;
}

const initialState: UserListState = {
	loading: false,
	users: [],
	error: null,
};

const usersListReducer = (
	state: UserListState = initialState,
	action: UsersListAction
): UserListState => {
	switch (action.type) {
		case UserListActionTypes.USER_LIST_REQUEST:
			return { ...state, loading: true };
		case UserListActionTypes.USER_LIST_SUCCESS:
			return { ...state, loading: false, users: action.payload };
		case UserListActionTypes.USER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export interface UserDeleteState {
	loading: boolean;
	success: boolean;
	message: string;
	user: User | null;
	error: string | null;
}

const initialStateDelete: UserDeleteState = {
	loading: false,
	success: false,
	message: '',
	user: null,
	error: null,
};

export const userDeleteReducer = (
	state: UserDeleteState = initialStateDelete,
	action: UserDeleteAction
): UserDeleteState => {
	switch (action.type) {
		case UserDeleteActionTypes.USER_DELETE_REQUEST:
			return { ...state, loading: true, user: null };
		case UserDeleteActionTypes.USER_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				user: action.payload.user,
				message: action.payload.message,
			};
		case UserDeleteActionTypes.USER_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export interface UserUpdateState {
	loading: boolean;
	success: boolean;
	message: string;
	user: User | null;
	error: string | null;
}

const initialStateUpdate: UserUpdateState = {
	loading: false,
	success: false,
	message: '',
	user: null,
	error: null,
};

export const userUpdateReducer = (
	state: UserUpdateState = initialStateUpdate,
	action: UserUpdateAction
): UserUpdateState => {
	switch (action.type) {
		case UserUpdateActionTypes.USER_UPDATE_REQUEST:
			return { ...state, loading: true, user: null };
		case UserUpdateActionTypes.USER_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				user: action.payload.user,
				message: action.payload.message,
			};
		case UserUpdateActionTypes.USER_UPDATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case UserUpdateActionTypes.USER_UPDATE_RESET:
			return initialStateUpdate;
		default:
			return state;
	}
};

export default usersListReducer;
