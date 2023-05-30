class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          $or: [
            {title: {$regex: this.queryString.keyword, $options: "i"}},
          ],
        }
      : {}
    this.query = this.query.find({...keyword})
    return this
  }

  filtering() {
    const queryobj = {...this.queryString}
    const removeFields = ["keyword", "page", "sort", "limit"]
    removeFields.forEach((key) => delete queryobj[key])
    let querystr = JSON.stringify(queryobj)
    querystr = querystr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    )
    this.query.find(JSON.parse(querystr))
    return this
  }
 
  sorting() {
    console.log(this.queryString.sort)
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(",").join(" ")
      this.query = this.query.sort(sortby)
    } else {
      this.query = this.query.sort("-createdAt")
    }
    return this
  }
  paginating(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1
    const skip = resultPerPage * (currentPage - 1)
    this.query = this.query.limit(resultPerPage).skip(skip)
    return this
  }
}
module.exports = APIfeatures
