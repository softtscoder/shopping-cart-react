import {
	UserActionTypes,
	UserListActionTypes,
	UserDeleteActionTypes,
	UserUpdateActionTypes,
} from '../actions/user.actions';
import { User } from '../../models/User';

interface UserLoginAction {
	type: UserActionTypes.USER_AUTH_REQUEST;
}

interface UserLoginSuccessAction {
	type: UserActionTypes.USER_LOGIN_SUCCESS;
	payload: User;
}

interface UserRegisterSuccessAction {
	type: UserActionTypes.USER_REGISTER_SUCCESS;
	payload: User;
}

interface UserLoginErrorAction {
	type: UserActionTypes.USER_AUTH_FAIL;
	payload: string;
}

interface UserLogoutAction {
	type: UserActionTypes.USER_LOGOT;
}

export type UserAction =
	| UserRegisterSuccessAction
	| UserLoginAction
	| UserLoginSuccessAction
	| UserLoginErrorAction
	| UserLogoutAction;

// User List Actions
interface UserListRequestAction {
	type: UserListActionTypes.USER_LIST_REQUEST;
}

interface UserListSuccessAction {
	type: UserListActionTypes.USER_LIST_SUCCESS;
	payload: User[];
}

interface UserListErrorAction {
	type: UserListActionTypes.USER_LIST_FAIL;
	payload: string;
}

export type UsersListAction =
	| UserListRequestAction
	| UserListSuccessAction
	| UserListErrorAction;

// User Delete Actions
interface UserDeleteRequestAction {
	type: UserDeleteActionTypes.USER_DELETE_REQUEST;
}

interface UserDeleteSuccessAction {
	type: UserDeleteActionTypes.USER_DELETE_SUCCESS;
	payload: { user: User; message: string };
}

interface UserDeleteErrorAction {
	type: UserDeleteActionTypes.USER_DELETE_FAIL;
	payload: string;
}

export type UserDeleteAction =
	| UserDeleteRequestAction
	| UserDeleteSuccessAction
	| UserDeleteErrorAction;

// User Update Actions
interface UserUpdateRequestAction {
	type: UserUpdateActionTypes.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccessAction {
	type: UserUpdateActionTypes.USER_UPDATE_SUCCESS;
	payload: { user: User; message: string };
}

interface UserUpdateErrorAction {
	type: UserUpdateActionTypes.USER_UPDATE_FAIL;
	payload: string;
}

interface UserUpdateResetAction {
	type: UserUpdateActionTypes.USER_UPDATE_RESET;
}

export type UserUpdateAction =
	| UserUpdateRequestAction
	| UserUpdateSuccessAction
	| UserUpdateErrorAction
	| UserUpdateResetAction;
