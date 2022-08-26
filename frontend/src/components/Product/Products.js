import React, { Fragment, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import MetaData from '../layout/MetaData';
import Search from './Search';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import classes from './Products.module.css';
import './ProductsPagination.css';

const categories = [
  'Laptop',
  'Table',
  'Wired',
  'Mouse',
  'Attire',
  'Camera',
  'SmartPhones',
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = params.keyword;

  console.log(products.length > 0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='All products' />
          <h2 className={classes.productsHeading}>Products</h2>

          <div className={classes.products}>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className={classes.filterBox}>
            <Search />
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={50000}
            />
            <Typography>Categories</Typography>
            <ul className={classes.categoryBox}>
              {categories.map((category) => (
                <li
                  className={classes['category-link']}
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component='legend'>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className={classes.paginationBox}>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
