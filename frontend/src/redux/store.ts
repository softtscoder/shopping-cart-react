import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// State Interfaces
import { ProductDetailState } from './reducers/productDetails.reducer';
import { ProductListState } from './reducers/productList.reducer';
import { CartState } from './reducers/cart.reducer';
import { UserAuthState } from './reducers/user.reducer';
import { UserDetailsProfileState } from './reducers/userDetails.reducer';
import { UserUpdateProfileState } from './reducers/userUpdateProfile.reducer';

interface State {
	productList: ProductListState;
	productDetail: ProductDetailState;
	userAuth: UserAuthState;
	cart: CartState;
	userDetails: UserDetailsProfileState;
	userUpdate: UserUpdateProfileState;
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems')!)
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo')!)
	: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress')!)
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod')!)
	: {};

const initialState: State = {
	productList: {
		products: [],
		loading: false,
		error: null,
	},
	productDetail: {
		product: null,
		loading: false,
		error: null,
	},
	cart: {
		cartItems: cartItemsFromStorage,
		paymentMethod: paymentMethodFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userAuth: {
		userInfo: userInfoFromStorage,
		loading: false,
		error: null,
	},
	userDetails: {
		user: null,
		loading: false,
		error: null,
	},
	userUpdate: {
		user: null,
		loading: false,
		success: false,
		error: null,
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
