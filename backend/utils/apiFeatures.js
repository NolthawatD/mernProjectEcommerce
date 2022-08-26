class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; // get method Product.find()
    this.queryStr = queryStr; // get req.query - keyword
  }

  search() {
    const keyword = this.queryStr.keyword // ถ้ามีค่า keyword
      ? { name: { $regex: this.queryStr.keyword, $options: 'i' } } // i = insensitive
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr }; // copy query ที่ส่งมาหลายๆตัว
    // console.log(queryCopy);

    const removeFields = ['keyword', 'page', 'limit'];
    // Remove some fied for category
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);

    // Filter for Price and Rating
    // รับ query params - &price[gt]=100 , &price[lt]=50
    // แปลงเป็น JSON , แทรก $ ไปที่ key แล้วแปลงกลับเป็น Object
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    // console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr)); //case sensitive

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = this.queryStr.page;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
