import React, { Fragment, useEffect } from 'react';
import classes from './Home.module.css';

import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';

import { CgMouse } from 'react-icons/cg';
import { useAlert } from 'react-alert';

import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Ecommerce' />
          <div className={classes.banner}>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>

            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className={classes.homeHeading}>Featured Products</h2>

          <div className={classes.container} id='container'>
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
