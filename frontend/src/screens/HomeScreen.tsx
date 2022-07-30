import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, productActions } from '../redux';
import Product from '../components/Product';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const HomeScreen: React.FC = () => {
	const { loading, products, error } = useSelector(
		(state: RootState) => state.productList
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getAllProducts());
	}, [dispatch]);

	if (loading) {
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
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => {
					return (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default HomeScreen;
