import axios from 'axios';
import { Dispatch } from 'redux';
import { UserDetailsActionTypes } from '../actions/userDetails.action';
import { UserAction } from '../action-types/userDetails.actionTypes';
import { RootState } from '../reducers';
import { User } from '../../models/User';

export const getUserProfile = (id: string) => {
	return async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
		dispatch({ type: UserDetailsActionTypes.USER_DETAILS_REQUEST });

		const {
			userAuth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		try {
			const { data } = await axios.get<{ message: string; user: User }>(
				`/api/users/${id}`,
				config
			);

			dispatch({
				type: UserDetailsActionTypes.USER_DETAILS_SUCCESS,
				payload: data.user,
			});
		} catch (error) {
			dispatch({
				type: UserDetailsActionTypes.USER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};
