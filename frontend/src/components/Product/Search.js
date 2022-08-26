import React, { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

import classes from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();

  const keywordInputRef = useRef();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const enteredKeyword = keywordInputRef.current.value;

    if (enteredKeyword.trim()) {
      navigate(`/products/${enteredKeyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Fragment>
      <MetaData title='Search a product' />
      <form className={classes.searchBox} onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search product...'
          ref={keywordInputRef}
          //   onChange={(e) => setKeyword(e.target.value)}
        />

        <input type='submit' value='' id={classes.submit_btn} />
      </form>
    </Fragment>
  );
};

export default Search;
