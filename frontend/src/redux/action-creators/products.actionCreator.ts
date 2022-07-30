import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import {
	ProductActionTypes,
	ProductDeleteActionTypes,
	ProductUpdateActionTypes,
} from '../actions/product.actions';
import {
	ProductsListAction,
	ProductDetailsAction,
	ProductDeleteAction,
	ProductUpdateAction,
} from '../action-types/products.actionTypes';
import { Product } from '../../models/Product';

export const getAllProducts = () => {
	return async (dispatch: Dispatch<ProductsListAction>) => {
		dispatch({ type: ProductActionTypes.PRODUCT_LIST_REQUEST });

		try {
			const { data } = await axios.get<Product[]>('/api/products');

			dispatch({
				type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ProductActionTypes.PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const getSingleProduct = (id: string) => {
	return async (dispatch: Dispatch<ProductDetailsAction>) => {
		dispatch({ type: ProductActionTypes.PRODUCT_DETAILS_REQUEST });

		try {
			const { data } = await axios.get<Product>(`/api/products/${id}`);

			dispatch({
				type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ProductActionTypes.PRODUCT_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const updateProductByAdmin = (productId: string, product: Product) => {
	return async (
		dispatch: Dispatch<ProductUpdateAction>,
		getState: () => RootState
	) => {
		dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST });

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
			const { data } = await axios.put<{ message: string; product: Product }>(
				`/api/products/${productId}`,
				product,
				config
			);

			dispatch({
				type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
				payload: { product: data.product, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const deleteProductByAdmin = (productId: string) => {
	return async (
		dispatch: Dispatch<ProductDeleteAction>,
		getState: () => RootState
	) => {
		dispatch({ type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST });

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
			const { data } = await axios.delete<{
				message: string;
				product: Product;
			}>(`/api/products/${productId}`, config);

			dispatch({
				type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS,
				payload: { product: data.product, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: ProductDeleteActionTypes.PRODUCT_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};
