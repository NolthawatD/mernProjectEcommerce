import React, { useEffect, useState } from 'react';
import './App.css';

import MainHeader from './components/layout/Header/MainHeader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import NotFound from './components/layout/Not Found/NotFound';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ProtectedRoute from './components/Routes/ProtectedRoute';

import store from './store';
import { loadUser } from './actions/userAction';

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WebFont from 'webfontloader';
import axios from 'axios';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Chilanka', 'Droid Sans'],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <div>
      <MainHeader />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/' element={<ProtectedRoute />}>
          <Route path='account' element={<Profile />} />
          <Route path='me/update' element={<UpdateProfile />} />
          <Route path='password/update' element={<UpdatePassword />} />
          <Route path='shipping' element={<Shipping />} />
          <Route path='order/confirm' element={<ConfirmOrder />} />

          {stripeApiKey && (
            <Route
              path='process/payment'
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}

          <Route path='success' element={<OrderSuccess />} />
          <Route path='orders' element={<MyOrders />} />
          <Route path='order/:id' element={<OrderDetails />} />

          <Route path='/' element={<ProtectedRoute isAdmin={true} />}>
            <Route path='admin/dashboard' element={<Dashboard />} />
            <Route path='admin/products' element={<ProductList />} />
            <Route path='admin/product' element={<NewProduct />} />
            <Route path='admin/product/:id' element={<UpdateProduct />} />
            <Route path='admin/orders' element={<OrderList />} />
            <Route path='admin/order/:id' element={<ProcessOrder />} />
            <Route path='admin/users' element={<UsersList />} />
            <Route path='admin/user/:id' element={<UpdateUser />} />
            <Route path='admin/reviews' element={<ProductReviews />} />
          </Route>
        </Route>
        <Route
          path='*'
          element={
            window.location.pathname === '/process/payment' ? null : (
              <NotFound />
            )
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
