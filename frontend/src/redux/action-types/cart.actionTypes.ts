import { CartActionTypes } from '../actions/cart.actions';

import { CartItem } from '../../models/CartItem';
import { ShippingAddress } from '../../models/ShippingAddress';

interface CarAddItem {
	type: CartActionTypes.ADD_CART_ITEM;
	payload: CartItem;
}

interface CarRemoveItem {
	type: CartActionTypes.REMOVE_CART_ITEM;
	payload: string;
}

interface SaveShippingAddress {
	type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS;
	payload: ShippingAddress;
}

interface SavePaymentMethod {
	type: CartActionTypes.CART_SAVE_PAYMENT_METHOD;
	payload: string;
}

export type CartAction =
	| CarAddItem
	| CarRemoveItem
	| SaveShippingAddress
	| SavePaymentMethod;
