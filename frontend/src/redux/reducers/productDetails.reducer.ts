import {
	ProductActionTypes,
	ProductUpdateActionTypes,
	ProductDeleteActionTypes,
} from '../actions/product.actions';
import {
	ProductDetailsAction,
	ProductUpdateAction,
	ProductDeleteAction,
} from '../action-types/products.actionTypes';

import { Product } from '../../models/Product';

export interface ProductDetailState {
	loading: boolean;

	product: Product | null;
	error: string | null;
}

const initialState: ProductDetailState = {
	loading: false,
	product: null,
	error: null,
};

const productDetailsReducer = (
	state: ProductDetailState = initialState,
	action: ProductDetailsAction
): ProductDetailState => {
	switch (action.type) {
		case ProductActionTypes.PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ProductActionTypes.PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, product: action.payload };
		case ProductActionTypes.PRODUCT_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

// Product Delete Reducer
export interface ProductDeleteState {
	loading: boolean;
	success: boolean;
	message: string;
	product: Product | null;
	error: string | null;
}

const initialStateDelete: ProductDeleteState = {
	loading: false,
	success: false,
	product: null,
	error: null,
	message: '',
};

export const productDeleteReducer = (
	state: ProductDeleteState = initialStateDelete,
	action: ProductDeleteAction
): ProductDeleteState => {
	switch (action.type) {
		case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
			return { ...state, loading: true };
		case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: action.payload.product,
				message: action.payload.message,
			};
		case ProductDeleteActionTypes.PRODUCT_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

// Product Update Reducer
export interface ProductUpdateState {
	loading: boolean;
	message: string;
	product: Product | null;
	error: string | null;
}

const initialStateUpdate: ProductUpdateState = {
	loading: false,
	product: null,
	error: null,
	message: '',
};

export const productUpdateReducer = (
	state: ProductUpdateState = initialStateUpdate,
	action: ProductUpdateAction
): ProductUpdateState => {
	switch (action.type) {
		case ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST:
			return { ...state, loading: true };
		case ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload.product,
				message: action.payload.message,
			};
		case ProductUpdateActionTypes.PRODUCT_UPDATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export default productDetailsReducer;
