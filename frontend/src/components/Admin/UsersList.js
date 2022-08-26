import React, { Fragment, useEffect } from 'react';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DELETE_USER_RESET } from '../../constants/userConstants';

import classes from './ProductList.module.css';
import './ProductListMui.css';

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.6 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 0.8 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'role') === 'admin'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.productListContainer}>
          <h1 id={classes.productListHeading}>ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className={classes.productListTable}
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
