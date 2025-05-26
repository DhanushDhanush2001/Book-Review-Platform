class APIFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const querystrcopy = { ...this.querystr };
    const removingFields = ['keyword', 'limit', 'page'];
    removingFields.forEach((field) => delete querystrcopy[field]);

    let querystr = JSON.stringify(querystrcopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  sort() {
    if (this.querystr.sort) {
      const sortBy = this.querystr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
}

module.exports = APIFeatures;
