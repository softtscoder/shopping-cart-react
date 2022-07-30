import { combineReducers } from 'redux';
import productListReducer from './productList.reducer';
import productDetailsReducer, {
	productDeleteReducer,
	productUpdateReducer,
} from './productDetails.reducer';
import userUpdateProfileReducer from './userUpdateProfile.reducer';
import userDetailsReducer from './userDetails.reducer';
import usersListReducer, {
	userDeleteReducer,
	userUpdateReducer,
} from './usersList.reducer';
import userAuthReducer from './user.reducer';
import cartReducer from './cart.reducer';
import orderReducer, {
	orderDetailReducer,
	orderPayReducer,
	userOrdersReducer,
} from './order.reducer';

const rootReducer = combineReducers({
	productDetail: productDetailsReducer,
	userUpdate: userUpdateProfileReducer,
	productList: productListReducer,
	productDelete: productDeleteReducer,
	productUpdate: productUpdateReducer,
	userDetails: userDetailsReducer,
	userAuth: userAuthReducer,
	order: orderReducer,
	cart: cartReducer,
	orderDetail: orderDetailReducer,
	orderPay: orderPayReducer,
	userOrders: userOrdersReducer,
	usersList: usersListReducer,
	userDelete: userDeleteReducer,
	userUpdateAdmin: userUpdateReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
