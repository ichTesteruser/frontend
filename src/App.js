import './App.css';
import 'react-toastify/dist/ReactToastify.css'; //* Notification box
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //* Icon of font awesome
import { faCartShopping , faLock , faRightFromBracket , faHistory ,faUser ,faChartLine, faCubes, faLayerGroup, faUsers, faHatWizard, faGlasses, faTShirt, faShoePrints, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios'; //* promise-based HTTP Client for node js 
import Camel from './image/Camel.png';

//* Hats , Glasses , Shirts , Shoes

//? Bootstrap Component

import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//! Custom component

//* Admin

import Dashboard from './components/admin/Dashboard';
import OrderList from './components/admin/OrderList';
import ProductList from './components/admin/ProductList';
import UserList from './components/admin/UserList';
import ProductEdit from './components/admin/Edit/ProductEdit';
import UserEdit from './components/admin/Edit/UserEdit';

//* Box

import SearchBox from './components/box/SearchBox';

//* Main

import Cart from './components/main/Cart';
import Home from './components/main/Home';
import Order from './components/main/Order';
import Product from './components/main/Product';
import Search from './components/main/Search';
import ShippingAddress from './components/main/Shipping';
import Signin from './components/main/Signin';
import Signup from './components/main/Signup';

//* Sub

import ForgetPassword from './components/sub/ForgetPassword';
import PaymentMethod from './components/sub/Payment';
import PlaceOrder from './components/sub/PlaceOrder';
import ResetPassword from './components/sub/ResetPassword';

//* User

import OrderHistory from './components/user/OrderHistory';
import Profile from './components/user/Profile';

//* utils

import AdminRoute from './components/utils/AdminRoute';
import { getError } from './components/utils/Error';
import UserRoute from './components/utils/UserRoute';
import { Store } from './Store';


function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand><img src={Camel} alt='Sedaruta Logo' className='nav-logo'/>Sedaruta</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                  <FontAwesomeIcon icon={faCartShopping} className="white-icon" ></FontAwesomeIcon>{' '}Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>{' '}
                        User Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>
                          <FontAwesomeIcon icon={faHistory} ></FontAwesomeIcon>{' '}
                          Order History
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} ></FontAwesomeIcon>{' '}Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      <FontAwesomeIcon icon={faLock} className="white-icon" ></FontAwesomeIcon>{' '}Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>
                        <FontAwesomeIcon icon={faChartLine} ></FontAwesomeIcon>{' '}
                          Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>
                        <FontAwesomeIcon icon={faCubes} ></FontAwesomeIcon>{' '}
                          Products
                          </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>
                        <FontAwesomeIcon icon={faLayerGroup} ></FontAwesomeIcon>{' '}
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>
                        <FontAwesomeIcon icon={faUsers} ></FontAwesomeIcon>{' '}
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <FontAwesomeIcon icon={
                      category === 'Hats' ? faHatWizard
                      : category === 'Glasses' ?  faGlasses 
                      : category === 'Shirts' ? faTShirt 
                      : category === 'Shoes' ? faShoePrints : faUserTie } />
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                  id='category-container'
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/forget-password"
                element={<ForgetPassword />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <Profile />
                  </UserRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route
                path="/order/:id"
                element={
                  <UserRoute>
                    <Order />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <UserRoute>
                    <OrderHistory />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddress />}
              ></Route>
              <Route path="/payment" element={<PaymentMethod />}></Route>
              {/* //*  Admin Routes  */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEdit />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEdit />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
