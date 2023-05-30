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
         default: false,
      },
      upVote: {
         type: Number,
         default: 0,
      },
      likesUser: [],
      voteUsers: [],
      images: [],
      rating: {
         type: Number,
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

const academicSchema = new mongoose.Schema(
   {
      category: String,
      schools: [],
      type: String,
      subCategory: String,
      title: String,
      description: String,
      author: {
         name: String,
         description: String,
      },
      authorImage: {
         type: String,
      },
      subWriter: {
         type: String,
      },
      subWriterImage: {
         type: String,
      },
      subWriterDescription: {
         type: String,
      },
      price: Number,

      images: [],
      pdfLink: String,
      pdfs: [],
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
      ebookDiscount: {
         type: Number,
         default: 0,
      },
      ebookPrice: {
         type: Number,
      },
      discountedPrice: {
         type: Number,
         default: 0,
      },
      countInStock: {
         type: Number,
         default: 0,
      },
      publisher: String,
      published: String,
      isbn: String,
      edition: String,
      language: String,
      trending: { type: Boolean, default: false },
      todaysDeal: { type: Boolean, default: false },
      bookfair: { type: Boolean, default: false },
      soldQuantity: { type: Number, default: 0 },
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

module.exports = mongoose.model( "academicBooks", academicSchema )