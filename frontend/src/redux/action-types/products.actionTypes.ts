import {
	ProductActionTypes,
	ProductDeleteActionTypes,
	ProductUpdateActionTypes,
} from '../actions/product.actions';
import { Product } from '../../models/Product';

interface ProductListAction {
	type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

interface ProductListSuccessAction {
	type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
	payload: Product[];
}

interface ProductListErrorAction {
	type: ProductActionTypes.PRODUCT_LIST_FAIL;
	payload: string;
}

interface ProductDetailAction {
	type: ProductActionTypes.PRODUCT_DETAILS_REQUEST;
}

interface ProductDetailSuccessAction {
	type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS;
	payload: Product;
}

interface ProductDetailErrorAction {
	type: ProductActionTypes.PRODUCT_DETAILS_FAIL;
	payload: string;
}

export type ProductsListAction =
	| ProductListAction
	| ProductListSuccessAction
	| ProductListErrorAction;

export type ProductDetailsAction =
	| ProductDetailAction
	| ProductDetailSuccessAction
	| ProductDetailErrorAction;

// Product Delete
interface ProductDeleteActionRequest {
	type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST;
}

interface ProductDeleteSuccessAction {
	type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS;
	payload: { message: string; product: Product };
}

interface ProductDeleteErrorAction {
	type: ProductDeleteActionTypes.PRODUCT_DELETE_FAIL;
	payload: string;
}

export type ProductDeleteAction =
	| ProductDeleteActionRequest
	| ProductDeleteSuccessAction
	| ProductDeleteErrorAction;

// Product Update
interface ProductUpdateActionRequest {
	type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST;
}

interface ProductUpdateSuccessAction {
	type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS;
	payload: { message: string; product: Product };
}

interface ProductUpdateErrorAction {
	type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAIL;
	payload: string;
}

export type ProductUpdateAction =
	| ProductUpdateActionRequest
	| ProductUpdateSuccessAction
	| ProductUpdateErrorAction;
