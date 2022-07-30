import {
	OrderActionTypes,
	UserOrdersActionTypes,
} from '../actions/order.actions';
import {
	OrderAction,
	OrderPayAction,
	UserOrdersAction,
} from '../action-types/order.actionTypes';

import { Order } from '../../models/Order';

export interface OrderCreateState {
	loading: boolean;
	success: boolean;
	order: Order | null;
	error: string | null;
}

export interface OrderDetailState {
	loading: boolean;
	order: Order | null;
	error: string | null;
}

export interface OrderPayState {
	loading: boolean;
	order: Order | null;
	error: string | null;
}

export interface UserOrdersState {
	loading: boolean;
	orders: Order[];
	error: string | null;
}

const initialState: OrderCreateState = {
	loading: false,
	success: false,
	order: null,
	error: null,
};

const orderCreateReducer = (
	state: OrderCreateState = initialState,
	action: OrderAction
): OrderCreateState => {
	switch (action.type) {
		case OrderActionTypes.OREDER_CREATE_REQUEST:
		case OrderActionTypes.OREDER_DETAILS_REQUEST:
			return { ...state, loading: true, success: false, order: null };
		case OrderActionTypes.OREDER_CREATE_SUCCESS:
			return { ...state, loading: false, success: true, order: action.payload };
		case OrderActionTypes.OREDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case OrderActionTypes.OREDER_CREATE_FAIL:
		case OrderActionTypes.OREDER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderDetailReducer = (
	state: OrderDetailState = { loading: false, order: null, error: null },
	action: OrderAction
): OrderDetailState => {
	switch (action.type) {
		case OrderActionTypes.OREDER_DETAILS_REQUEST:
			return { ...state, loading: true, order: null };
		case OrderActionTypes.OREDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case OrderActionTypes.OREDER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderPayReducer = (
	state: OrderPayState = { loading: false, order: null, error: null },
	action: OrderPayAction
): OrderPayState => {
	switch (action.type) {
		case OrderActionTypes.OREDER_PAY_REQUEST:
			return { ...state, loading: true, order: null };
		case OrderActionTypes.OREDER_PAY_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case OrderActionTypes.OREDER_PAY_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userOrdersReducer = (
	state: UserOrdersState = { loading: false, orders: [], error: null },
	action: UserOrdersAction
): UserOrdersState => {
	switch (action.type) {
		case UserOrdersActionTypes.USER_OREDERS_REQUEST:
			return { ...state, loading: true };
		case UserOrdersActionTypes.USER_OREDERS_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case UserOrdersActionTypes.USER_OREDERS_FAIL:
			return { ...state, loading: false, error: action.payload };
		case UserOrdersActionTypes.USER_OREDERS_RESET:
			return { loading: false, orders: [], error: null };
		default:
			return state;
	}
};

export default orderCreateReducer;
