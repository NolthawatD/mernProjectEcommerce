import React, { Fragment, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import CurrencyFormat from 'react-currency-format';

import classes from './OrderDetails.module.css';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Order Details' />
          <div className={classes.orderDetailsPage}>
            <div className={classes.orderDetailsContainer}>
              <Typography component='h1'>
                Order #{order && order._id}
              </Typography>
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

                  <span>
                    {order.totalPrice && (
                      <CurrencyFormat
                        value={order.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'฿'}
                        renderText={(value) => <p>{value} </p>}
                      />
                    )}
                  </span>
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

            <div className={classes.orderDetailsCartItems}>
              <Typography>Order Items:</Typography>
              <div className={classes.orderDetailsCartItemsContainer}>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt='Product' />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{' '}
                      {/* <span>
                        {item.quantity} x ฿{item.price} ={' '}
                        <b>฿{item.price * item.quantity}</b>
                  </span>*/}
                      <span>
                        <p>{item.quantity} x</p>
                        <CurrencyFormat
                          value={item.price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'฿'}
                          renderText={(value) => <p>{value} </p>}
                        />
                        <p>=</p>
                        <CurrencyFormat
                          value={item.price * item.quantity}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'฿'}
                          renderText={(value) => <p>{value} </p>}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
