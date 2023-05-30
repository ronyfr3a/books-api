const mongoose = require("mongoose")

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

const officeStationariesSchema = new mongoose.Schema(
   {
      category: String,
      type: String,
      title: String,
      brand: String,
      price: Number,
      images: Array,
      description: String,
      brandDescription: String,
      brandSpecification: {
         name: {
            type: Array,
         },
         value: {
            type: Array,
         },
      },
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
      // countInStock will be controlled with admin click means admin will update this portion & we need a page(dispatched orders page) for admin to help him dispatch the order status
      countInStock: {
         type: Number,
         default: 0,
      },
      trending: { type: Boolean, default: false },
      todaysDeal: { type: Boolean, default: false },
      bookfair: { type: Boolean, default: false },
      soldQuantity: { type: Number, default: 0 },
      status: Boolean,
      pointofsale:String,
      onlinestore:String,
      orderType: String,
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

module.exports = mongoose.model("officeStationaries", officeStationariesSchema)
