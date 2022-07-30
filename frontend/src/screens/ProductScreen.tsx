import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	Card,
	Button,
	ListGroup,
	Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, productActions } from '../redux';
import Rating from '../components/Rating';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
	const [qty, setQty] = useState<number>(1);

	const { id } = useParams<{ id: string }>();

	const history = useHistory();

	const { loading, product, error } = useSelector(
		(state: RootState) => state.productDetail
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getSingleProduct(id));
	}, [id, dispatch]);

	const addToCartHandler = () => history.push(`/cart/${id}?qty=${qty}`);

	if (loading || !product) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <Message variant="danger">{error}</Message>;
	}

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description: ${product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col className="d-flex align-items-center">Quanity</Col>
										<Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={e => setQty(+e.target.value)}
											>
												{[...Array(product.countInStock).keys()].map(qty => (
													<option key={qty + 1} value={qty + 1}>
														{qty + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									block
									variant="dark"
									onClick={addToCartHandler}
									disabled={product.countInStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
