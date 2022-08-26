import React, { Fragment, useState } from 'react';

import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Backdrop from '@material-ui/core/Backdrop';

import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../actions/userAction';

import classes from './UserOptions.module.css';

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function account() {
    navigate('/account');
  }

  function cart() {
    navigate('/cart');
  }

  function logoutUser() {
    dispatch(logout());
    alert.success('Logout successfully');
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        className={classes.speedDial}
        style={{ zIndex: '11' }}
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        icon={
          <img
            className={classes.speedDialIcon}
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt='Profile'
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
