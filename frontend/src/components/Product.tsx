import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import { Product as ProductItem } from '../models/Product';

interface ProductProps {
	product: ProductItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded product__item">
			<Link to={`/product/${product._id}`}>
				<Card.Img variant="top" src={product.image} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<div className="my-3">
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
						/>
					</div>
				</Card.Text>

				<Card.Text as="h3" className="mb-0">
					$ {product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
