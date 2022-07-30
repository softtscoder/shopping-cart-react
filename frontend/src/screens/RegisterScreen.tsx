import { useState, useEffect } from 'react';
import { History } from 'history';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, userActions } from '../redux';
import FormContainer from '../components/FormContainer';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const RegisterScreen: React.FC = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		userName: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);

	const { search } = useLocation<History>();

	const history = useHistory();

	const redirect: string = search ? search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const { loading, userInfo, error } = useSelector(
		(state: RootState) => state.userAuth
	);

	const { email, userName, name, password } = user;

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const registerHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			return setMessage(
				'Passwords do not Match, Please check your password again!'
			);
		}
		dispatch(userActions.register(user));
	};

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	return (
		<FormContainer>
			<h1>Sign Up New Account</h1>
			{error && <Message variant="danger">{error}</Message>}
			{message && <Message variant="danger">{message}</Message>}
			<Form onSubmit={registerHandler} className="py-2">
				{loading ? (
					<Spinner />
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

						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								value={password}
								name="password"
								required
								onChange={changeHandler}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="confirmPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								required
								name="confirmPassword"
								onChange={e => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
					</>
				)}

				<Button
					type="submit"
					variant="primary"
					disabled={
						name === '' ||
						userName === '' ||
						email === '' ||
						password === '' ||
						confirmPassword === ''
					}
				>
					Register
				</Button>

				<Row className="py-3">
					<Col>
						Already Have An Account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default RegisterScreen;
