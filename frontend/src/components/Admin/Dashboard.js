import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar.js';

import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Doughnut, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import CurrencyFormat from 'react-currency-format';

import classes from './Dashboard.module.css';
import { getAdminProduct } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';

const Dashboard = () => {
  Chart.register(CategoryScale);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197,72,49)'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className={classes.dashboard}>
      <Sidebar />
      <div className={classes.dashboardContainer}>
        <Typography component='h1'>Dashboard</Typography>
        <div className={classes.dashboardSummary}>
          <div>
            <CurrencyFormat
              value={totalAmount}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'฿'}
              renderText={(value) => (
                <p>
                  Total Amount <br /> {value}
                </p>
              )}
            />
            {/* <p>
              Total Amount <br /> ฿{totalAmount}
            </p> */}
          </div>
          <div className={classes.dashboardSummaryBox2}>
            <Link to='/admin/products'>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to='/admin/orders'>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to='/admin/users'>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className={classes.lineChart}>
          <Line data={lineState} />
        </div>
        <div className={classes.doughnutChart}>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
