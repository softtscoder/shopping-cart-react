interface Review {
	name: string;
	rating: number;
	comment: string;
}

export interface Product {
	id: string;
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	user: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
	reviews?: Review[];
	createdAt: string;
	updatedAt: string;
}
