import { UserDetailsActionTypes } from '../actions/userDetails.action';
import { User } from '../../models/User';

interface UserDetailsAction {
	type: UserDetailsActionTypes.USER_DETAILS_REQUEST;
}

interface UserDetailsSuccessAction {
	type: UserDetailsActionTypes.USER_DETAILS_SUCCESS;
	payload: User;
}

interface UserDetailsErrorAction {
	type: UserDetailsActionTypes.USER_DETAILS_FAIL;
	payload: string;
}

interface UserDetailsReset {
	type: UserDetailsActionTypes.USER_DETAILS_RESET;
}

export type UserAction =
	| UserDetailsAction
	| UserDetailsSuccessAction
	| UserDetailsErrorAction
	| UserDetailsReset;
