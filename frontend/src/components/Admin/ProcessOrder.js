import React, { Fragment, useEffect, useState } from 'react';

import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from '../../actions/orderAction';

import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CurrencyFormat from 'react-currency-format';

import Sidebar from './Sidebar';
import Loader from '../layout/Loader/Loader';

import classes from './ProcessOrder.module.css';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const ProcessOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('status', status);

    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Order Updated Successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title='Process Order' />
      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.newProductContainer}>
          {loading ? (
            <Loader />
          ) : (
            <div
              className={classes.confirmOrderPage}
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className={classes.confirmShippingArea}>
                  <Typography>Shipping Info</Typography>
                  <div className={classes.orderDetailsContainerBox}>
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className={classes.orderDetailsContainerBox}>
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className={classes.orderDetailsContainerBox}>
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === 'Delivered'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={classes.confirmCartItems}>
                  <Typography>Customer Cart Items: </Typography>
                  <div className={classes.confirmCartItemsContainer}>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt='Product' />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{' '}
                          <span>
                            <p>{item.quantity} x</p>
                            <CurrencyFormat
                              value={item.price}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'???'}
                              renderText={(value) => <p>{value} </p>}
                            />
                            <p>=</p>
                            <CurrencyFormat
                              value={item.price * item.quantity}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'???'}
                              renderText={(value) => <p>{value} </p>}
                            />
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className={classes.updateOrderForm}
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value=''>Choose Category</option>
                      {order.orderStatus === 'Processing' && (
                        <option value='Shipped'>Shipped</option>
                      )}
                      {order.orderStatus === 'Shipped' && (
                        <option value='Delivered'>Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id={classes.updateOrderBtn}
                    type='submit'
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    PROCESS
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
