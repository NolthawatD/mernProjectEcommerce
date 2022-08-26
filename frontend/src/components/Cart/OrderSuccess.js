import React from 'react';

import { Link } from 'react-router-dom';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Typography } from '@material-ui/core';

import classes from './OrderSucces.module.css';

const OrderSuccess = () => {
  return (
    <div className={classes.orderSuccess}>
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully</Typography>
      <Link to='/orders'>View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
