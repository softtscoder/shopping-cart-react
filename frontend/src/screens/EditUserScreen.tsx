import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, userDetailsActions, usersListActions } from '../redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditUserScreen: React.FC = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		userName: '',
	});
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const { id: userId } = useParams<{ id: string }>();

	const history = useHistory();

	const dispatch = useDispatch();

	const { loading, user: userDetails, error } = useSelector(
		(state: RootState) => state.userDetails
	);

	const {
		message,
		error: adminUodateError,
		success: adminUpdateSuccess,
		loading: adminUpdateLoading,
	} = useSelector((state: RootState) => state.userUpdateAdmin);

	const { email, userName, name } = user;

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const registerHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(usersListActions.editUser(userId, { ...user, isAdmin }));
	};

	useEffect(() => {
		if (adminUpdateSuccess) {
			dispatch(usersListActions.resetUser());
			history.push('/admin/users');
		} else {
			if (!userDetails || userDetails._id !== userId) {
				dispatch(userDetailsActions.getUserProfile(userId));
			} else {
				setUser({
					name: userDetails.name,
					email: userDetails.email,
					userName: userDetails.userName,
				});
				setIsAdmin(userDetails.isAdmin);
			}
		}
	}, [userDetails, userId, adminUpdateSuccess, history, dispatch]);

	return (
		<>
			<Link to="/admin/users" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{error && <Message variant="danger">{error}</Message>}
				{message && <Message variant="success">{message}</Message>}
				{adminUodateError && (
					<Message variant="danger">{adminUodateError}</Message>
				)}
				<Form onSubmit={registerHandler} className="py-2">
					{loading ? (
						<Loader />
					) : (
						<>
							<Form.Group controlId="name">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Your Name"
									value={name}
									name="name"
									required
									onChange={changeHandler}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="userName">
								<Form.Label>User Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter User Name"
									value={userName}
									name="userName"
									required
									onChange={changeHandler}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="email">
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter Your Email"
									value={email}
									name="email"
									required
									onChange={changeHandler}
									inputMode="email"
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="isAdmin">
								<Form.Check
									type="checkbox"
									label="Is Admin"
									checked={isAdmin}
									onChange={e => setIsAdmin(e.target.checked)}
								/>
							</Form.Group>
						</>
					)}

					{adminUpdateLoading ? (
						<Spinner animation="border" />
					) : (
						<Button
							type="submit"
							variant="primary"
							disabled={name === '' || userName === '' || email === ''}
						>
							Update User
						</Button>
					)}
				</Form>
			</FormContainer>
		</>
	);
};

export default EditUserScreen;
