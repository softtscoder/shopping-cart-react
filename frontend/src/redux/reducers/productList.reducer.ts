import { ProductActionTypes } from '../actions/product.actions';
import { ProductsListAction } from '../action-types/products.actionTypes';

import { Product } from '../../models/Product';

export interface ProductListState {
	loading: boolean;
	products: Product[];
	error: string | null;
}

const initialState: ProductListState = {
	loading: false,
	products: [],
	error: null,
};

const productListReducer = (
	state: ProductListState = initialState,
	action: ProductsListAction
): ProductListState => {
	switch (action.type) {
		case ProductActionTypes.PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, products: [] };
		case ProductActionTypes.PRODUCT_LIST_SUCCESS:
			return { ...state, loading: false, products: action.payload };
		case ProductActionTypes.PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export default productListReducer;
