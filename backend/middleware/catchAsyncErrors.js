// Catch asyn error (ส่ง req มาไม่ครบเป็นต้น)
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
