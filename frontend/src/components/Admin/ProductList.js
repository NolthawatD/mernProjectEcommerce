import React, { Fragment, useEffect } from 'react';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

import classes from './ProductList.module.css';
import './ProductListMui.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success('Product Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
    { field: 'name', headerName: 'Name', minWidth: 100, flex: 0.5 },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 100,
      flex: 0.2,
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
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCT - Admin`} />

      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.productListContainer}>
          <h1 id={classes.productListHeading}>ALL PRODUCTS</h1>

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

export default ProductList;
