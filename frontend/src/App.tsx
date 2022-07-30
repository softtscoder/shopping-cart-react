import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AdminUsersListScreen from './screens/AdminUsersListScreen';
import AdminProductsList from './screens/AdminProductsList';
import EditUserScreen from './screens/EditUserScreen';

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/admin/users" component={AdminUsersListScreen} />
					<Route path="/admin/user/:id/edit" component={EditUserScreen} />
					<Route path="/admin/products" component={AdminProductsList} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/cart/:id" component={CartScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/" component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
