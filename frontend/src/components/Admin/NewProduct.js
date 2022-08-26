import React, { Fragment, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import classes from './NewProduct.module.css';

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Laptop',
    'Table',
    'Wired',
    'Mouse',
    'Attire',
    'Camera',
    'SmartPhones',
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product Created Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prevImg) => [...prevImg, reader.result]);
          setImages((prevImg) => [...prevImg, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title='Create Product' />
      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.newProductContainer}>
          <form
            className={classes.createProductForm}
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type='text'
                placeholder='Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type='number'
                placeholder='Price'
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                style={{ height: '12vh' }}
                placeholder='Product Description..'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type='number'
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id={classes.createProductFormFile}>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id={classes.createProductFormImage}>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt='Product Preview' />
              ))}
            </div>

            <Button
              id={classes.createProductBtn}
              type='submit'
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
