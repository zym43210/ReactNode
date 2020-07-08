var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name :{
        type: String,
        unique : true,
        required : true
    },
    number : {
        type: Number,
        unique : false,
        required : true
    }
}, {
    timestamps: true

},
{
    collection: "Products"
  }
);

module.exports = mongoose.model("Products",productSchema);