import mongoose from 'mongoose';

const PurchaseItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const PurchaseSchema = new mongoose.Schema({
  items: { type: [PurchaseItemSchema], required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema);
export default Purchase;
