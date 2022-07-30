import { useState, useEffect } from 'react';
import { History } from 'history';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, userActions } from '../redux';
import FormContainer from '../components/FormContainer';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const LoginScreen: React.FC = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { search } = useLocation<History>();

	const history = useHistory();

	const redirect: string = search ? search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const { loading, userInfo, error } = useSelector(
		(state: RootState) => state.userAuth
	);

	const { email, password } = user;

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(userActions.login(user));
	};

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	return (
		<FormContainer>
			<div className="py-5 my-5">
				<h1>Sign In</h1>
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Spinner />}
				<Form onSubmit={loginHandler}>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Please Enter Your Email"
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
							placeholder="Please Enter Password"
							value={password}
							name="password"
							required
							onChange={changeHandler}
						></Form.Control>
					</Form.Group>

					<Button
						type="submit"
						variant="primary"
						disabled={email === '' || password === ''}
					>
						Sign In
					</Button>

					<Row className="py-3">
						<Col>
							New Customer?{' '}
							<Link
								to={redirect ? `/register?redirect=${redirect}` : '/register'}
							>
								Register
							</Link>
						</Col>
					</Row>
				</Form>
			</div>
		</FormContainer>
	);
};

export default LoginScreen;
