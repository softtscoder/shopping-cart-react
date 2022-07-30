import { UserDetailsActionTypes } from '../actions/userDetails.action';
import { UserAction } from '../action-types/userDetails.actionTypes';

import { User } from '../../models/User';

export interface UserDetailsProfileState {
	loading: boolean;
	user: User | null;
	error: string | null;
}

const initialState: UserDetailsProfileState = {
	loading: false,
	user: null,
	error: null,
};

const userDetailsReducer = (
	state: UserDetailsProfileState = initialState,
	action: UserAction
): UserDetailsProfileState => {
	switch (action.type) {
		case UserDetailsActionTypes.USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case UserDetailsActionTypes.USER_DETAILS_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case UserDetailsActionTypes.USER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		case UserDetailsActionTypes.USER_DETAILS_RESET:
			return initialState;
		default:
			return state;
	}
};

export default userDetailsReducer;
