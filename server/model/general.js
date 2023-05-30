const mongoose = require( "mongoose" )

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    joined: {
      type: String,
    },
    avatar: {
      type: String,
    },
    varified: {
      type: Boolean,
      default: false
    },
    upVote: {
      type: Number, default: 0
    },
    likesUser: [],
    voteUsers: [],
    images: [],
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const BookSchema = new mongoose.Schema(
  {
    category: String,
    subCategory: String,
    type: String,
    title: String,
    author: {
      name: String,
      description: String,
    },
    authorImage: {
      type: String
    },
    subWriter: {
      type: String
    },
    subWriterImage: {
      type: String
    },
    subWriterDescription: {
      type: String
    },
    price: Number,
    images: Array,
    pdfs: [],
    pdfLink: String,
    ebookDiscount: {
      type: Number,
      default: 0,
    },
    ebookPrice: {
      type: Number
    },
    description: String,
    pdfbaseUrl: String,
    totalWishlist: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    publisher: String,
    published: String,
    isbn: String,
    edition: String,
    language: String,
    countInStock: {
      type: Number,
      default: 0,
    },
    newInStock: Boolean,
    trending: { type: Boolean, default: false },
    todaysDeal: { type: Boolean, default: false },
    soldQuantity: { type: Number, default: 0 },
    bookfair: { type: Boolean, default: false },
    status: Boolean,
    pointofsale:String,
    onlinestore:String,
    orderType: String,
    pageNumber: Number,
    barcode: String,
    costPerItem: Number,
     quantity:{
      type:Number,
      default: 1
   }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model( "Books", BookSchema )
