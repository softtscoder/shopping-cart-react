import axios from 'axios';
import { Dispatch } from 'redux';
import { UserActionTypes } from '../actions/user.actions';
import { UserAction } from '../action-types/user.actionTypes';

import { UserOrdersAction } from '../action-types/order.actionTypes';
import { UserOrdersActionTypes } from '../actions/order.actions';

import { UserAction as UserDetailsAction } from '../action-types/userDetails.actionTypes';
import { UserDetailsActionTypes } from '../actions/userDetails.action';

export const login = (userData: { email: string; password: string }) => {
	return async (dispatch: Dispatch<UserAction>) => {
		dispatch({ type: UserActionTypes.USER_AUTH_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post('/api/users/login', userData, config);

			dispatch({
				type: UserActionTypes.USER_LOGIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: UserActionTypes.USER_AUTH_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const register = (userData: {
	name: string;
	email: string;
	userName: string;
	password: string;
}) => {
	return async (dispatch: Dispatch<UserAction>) => {
		dispatch({ type: UserActionTypes.USER_AUTH_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post('/api/users/signup', userData, config);

			dispatch({
				type: UserActionTypes.USER_REGISTER_SUCCESS,
				payload: data,
			});

			dispatch({
				type: UserActionTypes.USER_LOGIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: UserActionTypes.USER_AUTH_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const logout = () => {
	return (
		dispatch: Dispatch<UserAction | UserDetailsAction | UserOrdersAction>
	) => {
		localStorage.removeItem('userInfo');
		localStorage.removeItem('paymentMethod');
		localStorage.removeItem('shippingAddress');

		dispatch({ type: UserActionTypes.USER_LOGOT });
		dispatch({ type: UserOrdersActionTypes.USER_OREDERS_RESET });
		dispatch({ type: UserDetailsActionTypes.USER_DETAILS_RESET });
		window.location.reload();
		window.history.pushState({}, '', '/');
	};
};
