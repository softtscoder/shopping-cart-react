import { UserActionTypes } from '../actions/user.actions';
import { UserAction } from '../action-types/user.actionTypes';

import { User } from '../../models/User';

export interface UserAuthState {
	loading: boolean;
	userInfo: User | null;
	error: string | null;
}

const initialState: UserAuthState = {
	loading: false,
	userInfo: null,
	error: null,
};

const userReducer = (
	state: UserAuthState = initialState,
	action: UserAction
): UserAuthState => {
	switch (action.type) {
		case UserActionTypes.USER_AUTH_REQUEST:
			return { ...state, loading: true };
		case UserActionTypes.USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case UserActionTypes.USER_REGISTER_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case UserActionTypes.USER_AUTH_FAIL:
			return { ...state, loading: false, error: action.payload };
		case UserActionTypes.USER_LOGOT:
			return { loading: false, userInfo: null, error: null };
		default:
			return state;
	}
};

export default userReducer;
