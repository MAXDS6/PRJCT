import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photoUrl: { type: String, required: false }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
