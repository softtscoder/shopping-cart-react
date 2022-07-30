import { useEffect } from 'react';
// import { History } from 'history';
import { Link, useHistory } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, productActions } from '../redux';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const AdminProductsListScreen = () => {
	const { userInfo } = useSelector((state: RootState) => state.userAuth);
	const { products, loading, error } = useSelector(
		(state: RootState) => state.productList
	);

	const {
		error: errorDelete,
		loading: loadingDelete,
		success: successDelete,
	} = useSelector((state: RootState) => state.productDelete);

	const dispatch = useDispatch();
	const history = useHistory();

	const deleteProductHandler = (productId: string) => {
		if (window.confirm('Are you sure you to delete this product ?')) {
			dispatch(productActions.deleteProductByAdmin(productId));
		}
	};
	const createProductHandler = () => {};

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(productActions.getAllProducts());
		} else {
			history.push('/login');
		}
	}, [userInfo, history, successDelete, dispatch]);

	if (loading) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus" /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Spinner />}
			{error && <Message variant="danger">{error}</Message>}
			{errorDelete && <Message variant="success">{errorDelete}</Message>}
			{products.length === 0 ? (
				<div className="text-center">
					<p>There is no products yet</p>
				</div>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th colSpan={2} className="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>{product.price} L.E</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td className="text-center">
									<Button
										size="sm"
										as={Link}
										variant="light"
										to={`/admin/product/${product.id}/edit`}
									>
										<i className="fas fa-edit" />
									</Button>
								</td>
								<td className="text-center">
									<Button
										size="sm"
										variant="danger"
										onClick={() => deleteProductHandler(product.id)}
									>
										<i className="fas fa-trash" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default AdminProductsListScreen;
