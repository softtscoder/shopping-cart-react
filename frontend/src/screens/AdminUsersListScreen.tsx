import { useEffect } from 'react';
// import { History } from 'history';
import { Link, useHistory } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, usersListActions } from '../redux';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const AdminUsersListScreen = () => {
	const { userInfo } = useSelector((state: RootState) => state.userAuth);
	const { success: successDelete, message: deleteMessage } = useSelector(
		(state: RootState) => state.userDelete
	);

	const { loading, users, error } = useSelector(
		(state: RootState) => state.usersList
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const deleteUserHandler = (userId: string) => {
		if (window.confirm('Are you sure you to delete this user?')) {
			dispatch(usersListActions.deleteUser(userId));
		}
	};

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(usersListActions.getAllUsers(userInfo.userId));
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
			<h1>Users</h1>
			{error && <Message variant="danger">{error}</Message>}
			{deleteMessage && <Message variant="success">{deleteMessage}</Message>}
			{users.length === 0 ? (
				<div className="text-center">
					<p>There is no users yet</p>
				</div>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>User Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th colSpan={2} className="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.userName}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td className="text-center">
									{user.isAdmin ? (
										<i className="fas fa-check text-success" />
									) : (
										<i className="fas fa-times text-danger" />
									)}
								</td>
								<td className="text-center">
									<Button
										size="sm"
										as={Link}
										variant="light"
										to={`/admin/user/${user.id}/edit`}
									>
										<i className="fas fa-edit" />
									</Button>
								</td>
								<td className="text-center">
									<Button
										size="sm"
										variant="danger"
										onClick={() => deleteUserHandler(user.id)}
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

export default AdminUsersListScreen;
