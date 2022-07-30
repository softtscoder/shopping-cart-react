import { UserProfileActionTypes } from '../actions/userUpdate.action';
import { User } from '../../models/User';

interface UserUpdateProfileAction {
	type: UserProfileActionTypes.USER_UPDATE_PROFILE_REQUEST;
}

interface UserUpdateProfileSuccessAction {
	type: UserProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS;
	payload: User;
}

interface UserUpdateProfileErrorAction {
	type: UserProfileActionTypes.USER_UPDATE_PROFILE_FAIL;
	payload: string;
}

interface UserUpdateProfileResetAction {
	type: UserProfileActionTypes.USER_UPDATE_PROFILE_RESET;
}

export type UserProfileAction =
	| UserUpdateProfileAction
	| UserUpdateProfileSuccessAction
	| UserUpdateProfileErrorAction
	| UserUpdateProfileResetAction;
