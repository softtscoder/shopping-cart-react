import { UserProfileActionTypes } from '../actions/userUpdate.action';
import { UserProfileAction } from '../action-types/userUpdate.actionTypes';

import { User } from '../../models/User';

export interface UserUpdateProfileState {
	loading: boolean;
	success: boolean;
	user: User | null;
	error: string | null;
}

const initialState: UserUpdateProfileState = {
	loading: false,
	success: false,
	user: null,
	error: null,
};

const userUpdateProfileReducer = (
	state: UserUpdateProfileState = initialState,
	action: UserProfileAction
): UserUpdateProfileState => {
	switch (action.type) {
		case UserProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
			return { ...state, loading: true };
		case UserProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return { ...state, loading: false, success: true, user: action.payload };
		case UserProfileActionTypes.USER_UPDATE_PROFILE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case UserProfileActionTypes.USER_UPDATE_PROFILE_RESET:
			return { loading: false, error: null, user: null, success: false };
		default:
			return state;
	}
};

export default userUpdateProfileReducer;
