import { CartItem } from './CartItem';

interface User {
	_id: string;
	name: string;
	email: number;
	userName: string;
}

export interface ShippingAddress {
	address: string;
	city: string;
	phone: string;
	country: string;
}

export interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

export interface Order {
	id: string;
	_id: string;
	user: User;
	orderItems: CartItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	paymentResult: PaymentResult;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	itemsPrice: number;
	isPaid: boolean;
	isDelivered: boolean;
	paidAt: Date;
	deliveredAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
