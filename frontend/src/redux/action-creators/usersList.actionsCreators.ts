import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
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
import { UserDetailsActionTypes } from '../actions/userDetails.action';
import { UserAction } from '../action-types/userDetails.actionTypes';
import { User } from '../../models/User';

export const getAllUsers = (userId: string) => {
	return async (
		dispatch: Dispatch<UsersListAction>,
		getState: () => RootState
	) => {
		dispatch({ type: UserListActionTypes.USER_LIST_REQUEST });

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
			const { data } = await axios.get<{ message: string; users: User[] }>(
				`/api/users/admin/${userId}`,
				config
			);

			dispatch({
				type: UserListActionTypes.USER_LIST_SUCCESS,
				payload: data.users,
			});
		} catch (error) {
			dispatch({
				type: UserListActionTypes.USER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const deleteUser = (userId: string) => {
	return async (
		dispatch: Dispatch<UserDeleteAction>,
		getState: () => RootState
	) => {
		dispatch({ type: UserDeleteActionTypes.USER_DELETE_REQUEST });

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
			const { data } = await axios.delete<{ message: string; user: User }>(
				`/api/users/admin/${userId}`,
				config
			);

			dispatch({
				type: UserDeleteActionTypes.USER_DELETE_SUCCESS,
				payload: { user: data.user, message: data.user.message },
			});
		} catch (error) {
			dispatch({
				type: UserDeleteActionTypes.USER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const editUser = (
	userId: string,
	user: { name: string; email: string; userName: string; isAdmin: boolean }
) => {
	return async (
		dispatch: Dispatch<UserUpdateAction | UserAction>,
		getState: () => RootState
	) => {
		dispatch({ type: UserUpdateActionTypes.USER_UPDATE_REQUEST });

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
			const { data } = await axios.put<{ message: string; user: User }>(
				`/api/users/admin/user/${userId}`,
				user,
				config
			);

			dispatch({
				type: UserUpdateActionTypes.USER_UPDATE_SUCCESS,
				payload: { user: data.user, message: data.user.message },
			});

			dispatch({
				type: UserDetailsActionTypes.USER_DETAILS_SUCCESS,
				payload: data.user,
			});
		} catch (error) {
			dispatch({
				type: UserUpdateActionTypes.USER_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const resetUser = () => {
	return (dispatch: Dispatch<UserUpdateAction>) => {
		dispatch({ type: UserUpdateActionTypes.USER_UPDATE_RESET });
	};
};
