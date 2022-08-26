import React from 'react';
// import playStore from '../../../images/playstore.png';
// import appStore from '../../../images/Appstore.png';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer id={classes.footer}>
      <div className={classes.leftFooter}>
        <h1>Introduce Myself</h1>
        <p>Hi! I am Nolthawat. Hope you enjoy my ecommerce practice. </p>
        {/* <img src={playStore} alt='playstore' />
        <img src={appStore} alt='Appstore' /> */}
      </div>

      <div className={classes.midFooter}>
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; AppPractice</p>
      </div>

      <div className={classes.rightFooter}>
        <h4>Follow Us</h4>
        <a href='http://instagram.com/nolthawat_d'>Instagram</a>
        <a href='https://web.facebook.com/doldow.megrand.3'>Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
